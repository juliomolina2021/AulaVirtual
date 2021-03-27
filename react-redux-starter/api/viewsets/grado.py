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
from api.models import Grado, Nivel
from api.serializers import GradoSerializer, GradoRegistroSerializer


class GradoViewset(viewsets.ModelViewSet):
    queryset = Grado.objects.filter(activo=True)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("nombre",)
    search_fields = ("nombre", )
    ordering_fields = ("nombre",)

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return GradoSerializer
        else:
            return GradoRegistroSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def create(self, request):
        try:
            data = request.data

            with transaction.atomic():
                serializer = GradoRegistroSerializer(data=data)
                if serializer.is_valid():
                    id_nivel = data.get("nivel")
                    nivel = Nivel.objects.get(pk=id_nivel)

                    Grado.objects.create(
                        nivel= nivel,
                        nombre= data.get("nombre")
                    )
                    return Response(data, status=status.HTTP_200_OK)
                else:
                    return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)
                #return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail':str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk):
        try:
            data = request.data

            with transaction.atomic():
                serializer = GradoRegistroSerializer(data=data)
                if serializer.is_valid():
                    grado = Grado.objects.get(pk=pk)

                    id_nivel = data.get("nivel")
                    print("id ", id_nivel)
                    nivel = Nivel.objects.get(pk=id_nivel)

                    grado.nivel = nivel
                    grado.nombre = data.get("nombre")
                    grado.descripcion = data.get("descripcion")
                    grado.save()
                    return Response(data, status=status.HTTP_200_OK)
                else:
                    return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)
                return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail':str(e)}, status=status.HTTP_400_BAD_REQUEST)