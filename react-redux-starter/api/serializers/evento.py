from rest_framework import serializers
from api.models import Evento

class EventoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evento
        fields = (
            'id',
            'nombre_evento',
            'descripcion',
            'fecha_evento',
            'hora_evento',
            'ciclo_escolar',
            )
        depth = 1
        
class EventoRegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evento
        fields = (
            'nombre_evento',
            'descripcion',
            'fecha_evento',
            'hora_evento',
            )
