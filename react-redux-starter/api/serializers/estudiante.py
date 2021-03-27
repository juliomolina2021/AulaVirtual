from rest_framework import serializers
from api.models import Estudiante
from api.serializers import ProfileRegistroSerializer

class EstudianteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estudiante
        fields = '__all__'
        depth = 2
        

class EstudianteRegistroSerializer(serializers.ModelSerializer):
    profile = ProfileRegistroSerializer()
    class Meta:
        model = Estudiante
        fields = (
            'carnet',
            'encargado',
            'telefono_encargado',
            'profile',
            )


#verifica los datos que tenga el frontend y que tenga los datos que se necesitan