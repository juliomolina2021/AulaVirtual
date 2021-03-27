from rest_framework import serializers
from api.models import Asignacion
from api.serializers import EstudianteSerializer

class AsignacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asignacion
        fields = '__all__'
        depth = 3
        
class AsignacionRegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asignacion
        fields = (
            'grado',
            'seccion',
            'curso',
            'profesor',
            'descripcion',
            'portada',
            )
