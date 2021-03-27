import json
from django.core.files import File

from rest_framework import status, filters, viewsets
from django.contrib.auth.models import User
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response 
from rest_framework.settings import api_settings
from django.db import transaction

from api.models import Material_Clase, Asignacion
from api.serializers import MaterialSerializer, MaterialRegistroSerializer, AsignacionSerializer

class MaterialViewset(viewsets.ModelViewSet):
    queryset = Material_Clase.objects.filter(activo=True)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("nombre_material",)
    search_fields = ("nombre_material", )
    ordering_fields = ("nombre_material", )

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return MaterialSerializer
        else:
            return MaterialRegistroSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def create(self, request):
        try:
            with transaction.atomic():
                data = request.data
                archivo = data.get('archivo')       
                data= json.loads(data['data'])
            
                serializer = MaterialRegistroSerializer(data=data)
                
                if serializer.is_valid():
                    id_asignacion= data.get('asignacion')
                    asignacion = Asignacion.objects.get(pk=id_asignacion)

                    material=Material_Clase.objects.create(
                        nombre_material=data.get('nombre_material'),
                        descripcion= data.get('descripcion'),
                        archivo=File(archivo),
                        asignacion=asignacion,
                        )
                    
                    return Response(serializer.data, status =  status.HTTP_200_OK)
                
                else:
                    return Response(serializer.errors , status =  status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'detail': str(e)}, status =  status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, pk):
        try:
            with transaction.atomic():
                data = request.data
                archivo = data.get('archivo')
                data= json.loads(data['data'])
                
                serializer = MaterialRegistroSerializer(data=data)
                
                if serializer.is_valid():
                    id_asignacion= data.get('asignacion')

                    asignacion = Asignacion.objects.get(pk=id_asignacion)

                    material = Material_Clase.objects.get(pk=pk)

                    if material.archivo is not None:
                        material.archivo.delete()

                    material.nombre_material=data.get('nombre_material')
                    material.descripcion= data.get('descripcion')
                    material.archivo=File(archivo)
                    material.asignacion=asignacion
                    material.save()

                    return Response(data, status =  status.HTTP_200_OK)
                
                else:
                    return Response(serializer.errors , status =  status.HTTP_400_BAD_REQUEST)
            #return Response(data, status = status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'detail': str(e)}, status =  status.HTTP_400_BAD_REQUEST)


    def destroy(self, request, pk):
        try:
            material = Material_Clase.objects.get(pk=pk)
            id_asignacion= material.asignacion
        
            if material.archivo is not None:
                material.archivo.delete()
            
            material.delete()
            serializer= AsignacionSerializer(id_asignacion)

            return Response(serializer.data,status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)


    @action(methods=["get"], detail=False)
    def listar_materiales_curso(self, request):
        try:
            id_asignacion=request.query_params.get("asignacion") 
            asignacion = Asignacion.objects.get(pk=id_asignacion)
            materiales = Material_Clase.objects.filter(asignacion=asignacion, activo=True)

            page = self.paginate_queryset(materiales)
            if page is not None:
                serializer = MaterialSerializer(page, many=True)
          
            return self.get_paginated_response(serializer.data)
            
        except Exception as e:
            return Response({'detail':str(e)}, status=status.HTTP_400_BAD_REQUEST)