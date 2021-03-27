from rest_framework import serializers
from api.models import Ciclo_Escolar

class CicloEscolarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ciclo_Escolar
        fields = '__all__'

class CicloEscolarRegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ciclo_Escolar
        fields = (
            'anio',
            )
