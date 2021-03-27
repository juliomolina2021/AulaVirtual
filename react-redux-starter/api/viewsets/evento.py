import json
from django.core.files import File
from datetime import date

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings

from django.db import transaction
from api.models import Evento, Ciclo_Escolar
from api.serializers import EventoSerializer, EventoRegistroSerializer


class EventoViewset(viewsets.ModelViewSet):
    queryset = Evento.objects.filter(activo=True)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("nombre_evento",)
    search_fields = ("nombre_evento", )
    ordering_fields = ("nombre_evento",)

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return EventoSerializer
        else:
            return EventoRegistroSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def create(self, request):
        try:
            data = request.data

            with transaction.atomic():
                serializer = EventoRegistroSerializer(data=data)
                if serializer.is_valid():
                    
                    ciclos = Ciclo_Escolar.objects.all().order_by('-anio')[:1]
                    ciclo= Ciclo_Escolar.objects.get(pk=ciclos)

                    Evento.objects.create(
                        ciclo_escolar=ciclo,
                        nombre_evento= data.get("nombre_evento"),
                        descripcion=data.get("descripcion"),
                        fecha_evento=data.get("fecha_evento"),
                        hora_evento= data.get("hora_evento")
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
                serializer = EventoRegistroSerializer(data=data)
                if serializer.is_valid():
                    evento = Evento.objects.get(pk=pk)

                    ciclos = Ciclo_Escolar.objects.all().order_by('-anio')[:1]
                    ciclo= Ciclo_Escolar.objects.get(pk=ciclos)

                    evento.ciclo_escolar = ciclo
                    evento.nombre_evento = data.get("nombre_evento")
                    evento.descripcion = data.get("descripcion")
                    evento.fecha_evento=data.get("fecha_evento")
                    evento.hora_evento=data.get("hora_evento")
                    grado.save()
                    return Response(data, status=status.HTTP_200_OK)
                else:
                    return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)
                return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail':str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    @action(methods=["get"], detail=False)
    def eventos_proximos(self, request, *args, **kwargs):
        try:
            today=date.today()

            eventos = Evento.objects.filter(fecha_evento__gte=today).order_by('fecha_evento')[:10]
           
            page = self.paginate_queryset(eventos)
            if page is not None:
                serializer = EventoSerializer(page, many=True)
            #return Response(serializer.data, status=status.HTTP_200_OK)
            return self.get_paginated_response(serializer.data)
        except Exception as e:
            return Response({'detail':str(e)}, status=status.HTTP_400_BAD_REQUEST)