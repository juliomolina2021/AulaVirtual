from rest_framework import status, filters, viewsets
from django.contrib.auth.models import User
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response 
from rest_framework.settings import api_settings
from django.db import transaction

from api.models import Profesor, Profile, Profesion, Rol
from api.serializers import ProfesorSerializer, ProfesorRegistroSerializer

class ProfesorViewset(viewsets.ModelViewSet):
    queryset = Profesor.objects.filter()

    # filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    # filter_fields = ("profile__nombre",)
    # search_fields = ("profile__nombre", )
    # ordering_fields = ("profile__nombre", )

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return ProfesorSerializer
        else:
            return ProfesorRegistroSerializer

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
                verify = ProfesorRegistroSerializer(data=data)
                
                if verify.is_valid():
                    print("Adentro de is valid")
                    usuario = User.objects.create(
                        first_name=request.data["perfil_profesor"]["user"]["first_name"],
                        last_name=request.data["perfil_profesor"]["user"]["last_name"],
                        email=request.data["perfil_profesor"]["user"]["email"], 
                        username=request.data["perfil_profesor"]["user"]["email"], 
                    )
                    usuario.set_password(request.data["perfil_profesor"]["user"]["password"])
                    usuario.save()
                    
                    id_rol=data.get("perfil_profesor").get("rol")
                    rol = Rol.objects.get(pk=id_rol)

                    profile = Profile.objects.create(
                        address=data.get("perfil_profesor").get("address"),
                        phone = data.get("perfil_profesor").get("phone"),
                        user= usuario,
                        rol=rol,

                    )
                    profile.save()

                    id_profesion= data.get("profesion")
                    profesion = Profesion.objects.get(pk=id_profesion)

                    profesor = Profesor.objects.create(
                    perfil_profesor = profile,
                    profesion = profesion
                    )
                    profesor.save()
                    
                    serializer = ProfesorSerializer(profesor)
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
                verify = ProfesorRegistroSerializer(data=data)
                
                if verify.is_valid():
                    id_usuario = data.get("perfil_profesor").get("user").get("id")
                    
                    usuario = User.objects.get(pk=id_usuario)
                    usuario.first_name = data.get("first_name")
                    usuario.last_name = data.get("last_name")
                    usuario.email = data.get("email")
                    usuario.username = data.get("email")
                    usuario.save()

                    id_perfil = data.get("perfil_profesor").get("id")
                    print("perfil_profesor", id_perfil)
                    profile = Profile.objects.get(pk=id_perfil)
                    #profile.address = data.get("profile").get("address")
                    profile.address = data.get("address")
                    #profile.phone = data.get("profile").get("phone")
                    profile.phone = data.get("phone")
                    profile.user = usuario
                    profile.save()

                    id_profesion= data.get("profesion")
                    profesion= Profesion.objects.get(pk=id_profesion)
                    #profesion.save()

                    profesor = Profesor.objects.get(pk=pk)
                    profesor.perfil_profesor = profile
                    profesor.profesion= profesion
                    profesor.save()

                    #serializer = EstudianteRegistroSerializer(estudiante)

                    return Response(data, status =  status.HTTP_200_OK)
                
                else:
                    return Response(verify.errors , status =  status.HTTP_400_BAD_REQUEST)

            #return Response(data, status = status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'detail': str(e)}, status =  status.HTTP_400_BAD_REQUEST)


    
            