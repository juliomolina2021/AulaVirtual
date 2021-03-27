import json
from django.core.files import File
from django.db.models import Count, Q, F

from rest_framework import status, filters, viewsets
from django.contrib.auth.models import User
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response 
from rest_framework.settings import api_settings
from django.db import transaction

from api.models import Tarea_Estudiante, Tarea, Asignacion, Estudiante
from api.serializers import TareaSerializer,TareaCountSerializer, TareaRegistroSerializer, TareaEstudianteSerializer, TareaEstudianteRegistroSerializer, TareaEstudianteCountSerializer,AsignacionSerializer

class TareaEstudianteViewset(viewsets.ModelViewSet):
    queryset = Tarea_Estudiante.objects.filter(activo=True)

    # filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    # filter_fields = ("nombre_tarea",)
    # search_fields = ("nombre_tarea", )
    # ordering_fields = ("nombre_tarea", )

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return TareaEstudianteSerializer
        else:
            return TareaEstudianteRegistroSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def create(self, request):
        try:
            data = request.data

            archivo = data.get('archivo')
            data= json.loads(data['data'])

            serializer = TareaEstudianteRegistroSerializer(data=data)
            
            if serializer.is_valid():
                id_tarea = data.get('tarea')
                tarea = Tarea.objects.get(pk=id_tarea)
                id_estudiante=data.get('estudiante')
                estudiante= Estudiante.objects.get(pk=id_estudiante)

                tarea_estudiante = Tarea_Estudiante.objects.create(
                    fecha_entrega= data.get('fecha_entrega'),
                    comentario=data.get('comentario'),
                    archivo=File(archivo),
                    tarea=tarea,
                    estudiante=estudiante,
                    estado_entrega="Enviado para Calificar"
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
                
                serializer = TareaRegistroSerializer(data=data)
                
                #validacion a traves del serializer
                verify = TareaRegistroSerializer(data=data)
                
                if verify.is_valid():
                    id_asignacion= data.get('asignacion')
                   
                    asignacion = Asignacion.objects.get(pk=id_asignacion)

                    tarea = Tarea.objects.get(pk=pk)

                    if tarea.archivo is not None:
                        tarea.archivo.delete()

                    tarea.nombre_tarea=data.get('nombre_tarea')
                    tarea.descripcion= data.get('descripcion')
                    tarea.fecha_entrega= data.get('fecha_entrega')
                    tarea.hora_entrega=data.get('hora_entrega')
                    tarea.archivo=File(archivo)
                    tarea.nota=data.get('nota')
                    tarea.asignacion=asignacion
                    tarea.save()

                    return Response(data, status =  status.HTTP_200_OK)
                
                else:
                    return Response(verify.errors , status =  status.HTTP_400_BAD_REQUEST)

            #return Response(data, status = status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'detail': str(e)}, status =  status.HTTP_400_BAD_REQUEST)


    def destroy(self, request, pk):
        try:
            tarea = Tarea.objects.get(pk=pk)
            id_asignacion= tarea.asignacion
            print("id asignacion", id_asignacion)
            #asignacion= Asignacion.objects.get(pk= id_asignacion)          
            if tarea.archivo is not None:
                tarea.archivo.delete()
            tarea.delete()
            print("id asignacion", id_asignacion)
            #page = self.paginate_queryset(id_asignacion)
            serializer= AsignacionSerializer(id_asignacion)

            return Response(serializer.data,status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    
    @action(methods=["get"], detail=False)
    def listar_tareas_recibidas(self, request):
        try:
            id_asignacion=request.query_params.get("asignacion") 
            tareas=Tarea_Estudiante.objects.filter(tarea__asignacion= id_asignacion, activo=True)

            page = self.paginate_queryset(tareas)
            if page is not None:
                serializer = TareaEstudianteSerializer(page, many=True)

            return self.get_paginated_response(serializer.data)
        except Exception as e:
            return Response({'detail':str(e)}, status=status.HTTP_400_BAD_REQUEST)


    @action(methods=["post"], detail=False)
    def set_calificacion(self, request):
        try:
            data=request.data
            id_tarea_estudiante=data.get("tarea_estudiante") 
            calificacion=request.data.get("calificacion")
            
            tarea_estudiante=Tarea_Estudiante.objects.get(pk= id_tarea_estudiante)
            nota= tarea_estudiante.tarea.nota

            if float(calificacion) <= float(nota):
                tarea_estudiante.calificacion=calificacion
                tarea_estudiante.estado_calificacion="Calificado"
                tarea_estudiante.estado_entrega="Entregado"
                tarea_estudiante.save()
                return Response(data, status =  status.HTTP_200_OK)
            else:
                return Response({'detail': 'El valor de la nota excede al valor permitido'}, status =  status.HTTP_400_BAD_REQUEST)
            
            
        except Exception as e:
            return Response({'detail':str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["get"], detail=False)
    def tareas_pendientes_calificar(self, request):
        try:
            print('en el metodo')
            user = request.user
            tareas=Tarea_Estudiante.objects.filter(tarea__asignacion__profesor__perfil_profesor__user=user, estado_calificacion="Sin calificar")

            page = self.paginate_queryset(tareas)
            if page is not None:
                serializer = TareaEstudianteSerializer(page, many=True)

            return self.get_paginated_response(serializer.data)
        except Exception as e:
            return Response({'detail':str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["get"], detail=False)
    def tareas_pendientes_calificar_curso(self, request):
        try:
            user = request.user
            queryset=Tarea_Estudiante.objects.values('tarea__asignacion__curso__nombre').annotate(
                    pendientesCurso=Count('tarea__asignacion__curso', filter=Q(tarea__asignacion__profesor__perfil_profesor__user=user,estado_calificacion="Sin calificar"))
                ).annotate(
                    nombreCurso=F('tarea__asignacion__curso__nombre')
                )
            page = self.paginate_queryset(queryset)
            if page is not None:
                serializer = TareaEstudianteCountSerializer(page, many=True)

            return self.get_paginated_response(serializer.data)
        except Exception as e:
            return Response({'detail':str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["get"], detail=False)
    def tareas_pendientes_entregar(self, request):
        try:
            user = request.user
            tareas=Tarea.objects.filter(asignacion__estudiante__profile__user=user, tarea_tareaestudiante__isnull=True )
            page = self.paginate_queryset(tareas)
            if page is not None:
                serializer = TareaSerializer(page, many=True)

            return self.get_paginated_response(serializer.data)
        except Exception as e:
            return Response({'detail':str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["get"], detail=False)
    def tareas_pendientes_entrega_curso(self, request):
        try:
            user = request.user
            queryset=Tarea.objects.values('asignacion__curso__nombre').annotate(
                    pendientesCurso=Count('asignacion__curso', filter=Q(asignacion__estudiante__profile__user=user, tarea_tareaestudiante__isnull=True))
                ).annotate(
                    nombreCurso=F('asignacion__curso__nombre')
                )
            print("tareas por curso ", queryset)
            page = self.paginate_queryset(queryset)
            if page is not None:
                serializer = TareaCountSerializer(page, many=True)

            return self.get_paginated_response(serializer.data)
        except Exception as e:
            return Response({'detail':str(e)}, status=status.HTTP_400_BAD_REQUEST)