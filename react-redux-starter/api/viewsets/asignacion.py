import json

from django.core.files import File
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings

from django.db import transaction
from api.models import Asignacion, Curso, Grado, Profesor, Seccion, Estudiante, Ciclo_Escolar
from api.serializers import AsignacionSerializer, AsignacionRegistroSerializer, CursoSerializer, EstudianteSerializer


class AsignacionViewset(viewsets.ModelViewSet):
    queryset = Asignacion.objects.filter(activo=True)

    # filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    # filter_fields = ("nombre",)
    # search_fields = ("nombre", )
    # ordering_fields = ("nombre",)

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return AsignacionSerializer
        else:
            return AsignacionRegistroSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def create(self, request):
        try:
            data = request.data

            with transaction.atomic():
                serializer = AsignacionRegistroSerializer(data=data)
                
                if serializer.is_valid():
                    id_curso = data.get("curso")
                    curso = Curso.objects.get(pk=id_curso)

                    id_grado= data.get("grado")
                    grado = Grado.objects.get(pk=id_grado)
                    
                    id_profersor= data.get("profesor")
                    profesor = Profesor.objects.get(pk=id_profersor)
                    
                    id_seccion= data.get("seccion")
                    seccion = Seccion.objects.get(pk=id_seccion)
                    
                    ciclos = Ciclo_Escolar.objects.all().order_by('-anio')[:1]
                    ciclo= Ciclo_Escolar.objects.get(pk=ciclos)
                    
                    Asignacion.objects.create(
                        curso= curso,
                        grado=grado,
                        profesor=profesor,
                        seccion=seccion,
                        descripcion= data.get("descripcion"),
                        ciclo_escolar=ciclo,
                    )
                    
                    return Response(data, status=status.HTTP_200_OK)
                else:
                    return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'detail':str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk):
        try:
            data = request.data

            with transaction.atomic():
                serializer = AsignacionRegistroSerializer(data=data)
                if serializer.is_valid():
                    asignacion = Asignacion.objects.get(pk=pk)
                    
                    id_curso = data.get("curso")
                    curso = Curso.objects.get(pk=id_curso)

                    id_grado= data.get("grado")
                    grado = Grado.objects.get(pk=id_grado)
                    
                    id_profersor= data.get("profesor")
                    profesor = Profesor.objects.get(pk=id_profersor)
                    
                    id_seccion= data.get("seccion")
                    seccion = Seccion.objects.get(pk=id_seccion)
                    
                    ciclo = Ciclo_Escolar.objects.get(pk=1)

                    asignacion.curso=curso
                    asignacion.grado = grado
                    asignacion.profesor=profesor
                    asignacion.seccion=seccion
                    asignacion.ciclo_escolar=ciclo
                    asignacion.descripcion=data.get("descripcion")
                    asignacion.save()
                    return Response(data, status=status.HTTP_200_OK)
                else:
                    return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)
                return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail':str(e)}, status=status.HTTP_400_BAD_REQUEST)


    @action(methods=["get"], detail=False)
    def listar_miscursos(self, request, *args, **kwargs):
        try:
            #page =  request.query_params.get("page")
            user = request.user
            asignacion_profesor = Asignacion.objects.filter(profesor__perfil_profesor__user=user)
            page = self.paginate_queryset(asignacion_profesor)
            if page is not None:
                serializer = AsignacionSerializer(page, many=True)
            #return Response(serializer.data, status=status.HTTP_200_OK)
            return self.get_paginated_response(serializer.data)
        except Exception as e:
            return Response({'detail':str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["post"], detail=False)
    def asignacion_curso_estudiante(self, request):
        try:
            
            data = request.data
            id_estudiante = data.get("estudiante").get("value")
            estudiante = Estudiante.objects.get(pk=id_estudiante)
            
            id_asignacion= data.get("idasigacion")
            asignacion = Asignacion.objects.get(pk= id_asignacion)
            asignacion.estudiante.add(estudiante)
            #asignacion.save()
            print("DATA ", data)
            return Response(data, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response({'detail':str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["get"], detail=False)
    def listar_estudiantes_curso(self, request):
        try:
            id_asignacion=request.query_params.get("asignacion") 
            asignacion = Asignacion.objects.get(pk=id_asignacion)
            estudiantes=asignacion.estudiante.all()

            page = self.paginate_queryset(estudiantes)
            if page is not None:
                serializer = EstudianteSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
            
        except Exception as e:
            return Response({'detail':str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["post"], detail=False)
    def eliminar_asignacion_estudiante(self, request):
        try:
            data = request.data
            print("DATA", data)
            id_estudiante = data.get("estudiante")
            estudiante = Estudiante.objects.get(pk=id_estudiante)
            print("estudiante", estudiante)
            id_asignacion= data.get("asignacion")
            asignacion = Asignacion.objects.get(pk= id_asignacion)
            asignacion.estudiante.remove(estudiante)
            #asignacion.save()
            
            return Response(data, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response({'detail':str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["get"], detail=False)
    def listar_cursos_estudiantes(self, request, *args, **kwargs):
        try:
            #page =  request.query_params.get("page")
            user = request.user
            asignacion_estudiante = Asignacion.objects.filter(estudiante__profile__user=user)
            page = self.paginate_queryset(asignacion_estudiante)
            if page is not None:
                serializer = AsignacionSerializer(page, many=True)
            #return Response(serializer.data, status=status.HTTP_200_OK)
            return self.get_paginated_response(serializer.data)
        except Exception as e:
            return Response({'detail':str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["put"], detail=False)
    def agregar_portada(self, request, *args, **kwargs):
        try:
            print("En el metodo")
            data = request.data
            print("data", data)
            portada = data.get("portada")
            data = json.loads(data["data"])
            
            id_asignacion= data.get("asignacion")
            asignacion = Asignacion.objects.get(pk=id_asignacion)                

            if asignacion.portada is not None:
                asignacion.portada.delete()

            asignacion.portada = File(portada)                
            asignacion.save()

            return Response(data, status=status.HTTP_200_OK)            
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    

    def destroy(self, request, pk):
        try:
            asignacion = Asignacion.objects.get(pk=pk)
    
            if asignacion.portada is not None:
                asignacion.portada.delete()
            asignacion.delete()

            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

