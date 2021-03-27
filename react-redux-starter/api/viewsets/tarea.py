import json
from django.core.files import File
from django.db.models import Sum,F

from rest_framework import status, filters, viewsets
from django.contrib.auth.models import User
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response 
from rest_framework.settings import api_settings
from django.db import transaction

from api.models import Tarea, Asignacion
from api.serializers import TareaSerializer, TareaRegistroSerializer, AsignacionSerializer

class TareaViewset(viewsets.ModelViewSet):
    queryset = Tarea.objects.filter(activo=True)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("nombre_tarea",)
    search_fields = ("nombre_tarea", )
    ordering_fields = ("nombre_tarea", )

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return TareaSerializer
        else:
            return TareaRegistroSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def create(self, request):
        try:
            data = request.data
            archivo = data.get('archivo')
            data= json.loads(data['data'])
            
            serializer = TareaRegistroSerializer(data=data)
            
            if serializer.is_valid():
                id_asignacion= data.get('asignacion')
                asignacion = Asignacion.objects.get(pk=id_asignacion)

                nota= float(data.get('nota'))
                notas=Tarea.objects.values('nota').aggregate(suma_notas=Sum('nota'))
              
                suma_total=float(notas['suma_notas'])+nota
                
                if suma_total<100:
                    tarea=Tarea.objects.create(
                        nombre_tarea=data.get('nombre_tarea'),
                        descripcion= data.get('descripcion'),
                        fecha_entrega= data.get('fecha_entrega'),
                        hora_entrega=data.get('hora_entrega'),
                        archivo=File(archivo),
                        nota=data.get('nota'),
                        asignacion=asignacion,
                        )
                    return Response(serializer.data, status =  status.HTTP_200_OK)
                else:
                    return Response({'detail': 'El valor de la nota excede al valor permitido'}, status =  status.HTTP_400_BAD_REQUEST)
            
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
                
                serializer = TareaRegistroSerializer(data=data)
                
                if serializer.is_valid():
                    id_asignacion= data.get('asignacion')
                    asignacion = Asignacion.objects.get(pk=id_asignacion)

                    tarea = Tarea.objects.get(pk=pk)

                    if tarea.archivo is not None:
                        tarea.archivo.delete()
                    
                    nota= float(data.get('nota'))
                    notas=Tarea.objects.values('nota').aggregate(suma_notas=Sum('nota'))
              
                    suma_total=float(notas['suma_notas'])+nota

                    if suma_total<100:
                        tarea.nombre_tarea=data.get('nombre_tarea')
                        tarea.descripcion= data.get('descripcion')
                        tarea.fecha_entrega= data.get('fecha_entrega')
                        tarea.hora_entrega=data.get('hora_entrega')
                        tarea.nota=data.get('nota')
                        tarea.asignacion=asignacion
                        tarea.archivo=File(archivo)
                        tarea.save()
                        return Response(serializer.data, status =  status.HTTP_200_OK)
                    else:
                        return Response({'detail': 'El valor de la nota excede al valor permitido'}, status =  status.HTTP_400_BAD_REQUEST)

                    return Response(data, status =  status.HTTP_200_OK)
                
                else:
                    return Response(serializer.errors , status =  status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'detail': str(e)}, status =  status.HTTP_400_BAD_REQUEST)


    def destroy(self, request, pk):
        try:
            tarea = Tarea.objects.get(pk=pk)
            id_asignacion= tarea.asignacion
    
            if tarea.archivo is not None:
                tarea.archivo.delete()
            tarea.delete()
            serializer= AsignacionSerializer(id_asignacion)

            return Response(serializer.data,status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)


    @action(methods=["get"], detail=False)
    def listar_tareas_curso(self, request):
        try:
            id_asignacion=request.query_params.get("asignacion") 
            tareas=Tarea.objects.filter(asignacion=id_asignacion, activo=True)

            page = self.paginate_queryset(tareas)
            if page is not None:
                serializer = TareaSerializer(page, many=True)
          
            return self.get_paginated_response(serializer.data)
            
        except Exception as e:
            return Response({'detail':str(e)}, status=status.HTTP_400_BAD_REQUEST)


    @action(methods=["get"], detail=False)
    def listar_tareas_curso(self, request):
        try:
            id_asignacion=request.query_params.get("asignacion") 
            tareas_estudiante=Tarea.objects.filter(asignacion__id=id_asignacion, activo=True)

            page = self.paginate_queryset(tareas_estudiante)
            if page is not None:
                serializer = TareaSerializer(page, many=True)
          
            return self.get_paginated_response(serializer.data)
            
        except Exception as e:
            return Response({'detail':str(e)}, status=status.HTTP_400_BAD_REQUEST)