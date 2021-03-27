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

from api.models import Curso
from api.serializers import CursoSerializer, CursoRegistroSerializer


class CursoViewset(viewsets.ModelViewSet):
    queryset = Curso.objects.filter(activo=True)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("nombre",)
    search_fields = ("nombre", )
    ordering_fields = ("nombre",)

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return CursoSerializer
        else:
            return CursoRegistroSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    # def create(self, request):
    #     try:
    #         data = request.data
    #         portada = data.get('portada')
    #         data= json.loads(data['data'])
            
    #         serializer = CursoRegistroSerializer(data=data)
            
    #         if serializer.is_valid():
    #             Curso.objects.create(
    #                 nombre=data.get('nombre'),
    #                 descripcion= data.get('descripcion'),
    #                 portada=File(portada)
    #                 )
    #             return Response(serializer.data, status =  status.HTTP_200_OK)
    #         else:
    #             return Response(serializer.errors , status =  status.HTTP_400_BAD_REQUEST)
    #     except Exception as e:
    #         return Response({'detail': str(e)}, status =  status.HTTP_400_BAD_REQUEST)
    

    # def update(self, request, pk):
    #     try:
    #         with transaction.atomic():
    #             data = request.data
                
    #             portada = data.get('portada')
    #             data= json.loads(data['data'])
                
    #             serializer = CursoRegistroSerializer(data=data)
                
    #             if serializer.is_valid():

    #                 curso = Curso.objects.get(pk=pk)

    #                 if curso.portada is not None:
    #                     if curso.portada != portada:
    #                         curso.portada.delete()

    #                 curso.nombre=data.get('nombre')
    #                 curso.descripcion= data.get('descripcion')
    #                 curso.portada=File(portada)
    #                 curso.save()

    #                 return Response(data, status =  status.HTTP_200_OK)
    #             else:
    #                 return Response(serializer.errors , status =  status.HTTP_400_BAD_REQUEST)
    #     except Exception as e:
    #         return Response({'detail': str(e)}, status =  status.HTTP_400_BAD_REQUEST)


    # def destroy(self, request, pk):
    #     try:
    #         curso = Curso.objects.get(pk=pk)
    
    #         if curso.portada is not None:
    #             curso.portada.delete()
    #         curso.delete()

    #         return Response(status=status.HTTP_200_OK)
    #     except Exception as e:
    #         return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)