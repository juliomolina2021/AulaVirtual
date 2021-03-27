from rest_framework import status, filters, viewsets
from django.contrib.auth.models import User
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response 
from rest_framework.settings import api_settings
from django.db import transaction

from api.models import Estudiante, Profile, Rol
from api.serializers import EstudianteSerializer, EstudianteRegistroSerializer

class EstudianteViewset(viewsets.ModelViewSet):
    queryset = Estudiante.objects.filter(activo=True)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("carnet",)
    search_fields = ("carnet", )
    ordering_fields = ("carnet", )

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return EstudianteSerializer
        else:
            return EstudianteRegistroSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def create(self, request):
        try:
            with transaction.atomic():
                user = request.user
                data = request.data

                #validacion a traves del serializer
                verify = EstudianteRegistroSerializer(data=data)
                
                if verify.is_valid():

                    usuario = User.objects.create(
                        first_name=request.data["profile"]["user"]["first_name"],
                        last_name=request.data["profile"]["user"]["last_name"],
                        email=request.data["profile"]["user"]["email"], 
                        username=request.data["profile"]["user"]["email"], 
                    )
                    usuario.set_password(request.data["profile"]["user"]["password"])
                    usuario.save()

                    id_rol=data.get("profile").get("rol")
                    rol = Rol.objects.get(pk=id_rol)

                    profile = Profile.objects.create(
                        address=data.get("profile").get("address"),
                        phone = data.get("profile").get("phone"),
                        user= usuario,
                        rol=rol,
                    )
                    profile.save()

                    estudiante = Estudiante.objects.create(
                        carnet = data.get("carnet"),
                        encargado = data.get("encargado"),
                        telefono_encargado= data.get("telefono_encargado"),
                        profile = profile,
                    )
                    estudiante.save()
                    
                    serializer = EstudianteSerializer(estudiante)
                    return Response(serializer.data, status =  status.HTTP_200_OK)
                
                else:
                    return Response(verify.errors , status =  status.HTTP_400_BAD_REQUEST)

            return Response(data, status = status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'detail': str(e)}, status =  status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, pk):
        try:
            with transaction.atomic():
                user = request.user
                data = request.data

                #validacion a traves del serializer
                verify = EstudianteRegistroSerializer(data=data)
                
                if verify.is_valid():
                    id_usuario = data.get("profile").get("user").get("id")
                
                    usuario = User.objects.get(pk=id_usuario)
                    usuario.first_name = data.get("first_name")
                    usuario.last_name = data.get("last_name")
                    usuario.email = data.get("email")
                    usuario.username = data.get("email")
                    usuario.save()

                    id_perfil = data.get("profile").get("id")
                    print("Perfil", id_perfil)
                    profile = Profile.objects.get(pk=id_perfil)
                    #profile.address = data.get("profile").get("address")
                    profile.address = data.get("address")
                    #profile.phone = data.get("profile").get("phone")
                    profile.phone = data.get("phone")
                    profile.user = usuario
                    profile.save()

                    estudiante = Estudiante.objects.get(pk=pk)
                    estudiante.carnet = data.get("carnet")
                    estudiante.encargado = data.get("encargado")
                    estudiante.telefono_encargado= data.get("telefono_encargado")
                    estudiante.profile = profile
                    estudiante.save()

                    #serializer = EstudianteRegistroSerializer(estudiante)

                    return Response(data, status =  status.HTTP_200_OK)
                
                else:
                    return Response(verify.errors , status =  status.HTTP_400_BAD_REQUEST)

            #return Response(data, status = status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'detail': str(e)}, status =  status.HTTP_400_BAD_REQUEST)


    @action(methods=["get"], detail=False)
    def getStudent(self, request, *args, **kwargs):
        try:
            user = request.user
            estudiante = Estudiante.objects.get(profile__user=user)
            
            serializer = EstudianteSerializer(estudiante)
            print("Despues de serializer")

            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail':str(e)}, status=status.HTTP_400_BAD_REQUEST)
            