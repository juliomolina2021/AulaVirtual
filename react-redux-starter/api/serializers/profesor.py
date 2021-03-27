from rest_framework import serializers
from api.models import Profesor
from api.serializers import ProfileRegistroSerializer, ProfesionRegistroSerializer

class ProfesorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profesor
        fields = '__all__'
        depth = 2
        

class ProfesorRegistroSerializer(serializers.ModelSerializer):
    perfil_profesor = ProfileRegistroSerializer()
    #profesion= ProfesionRegistroSerializer()
    class Meta:
        model = Profesor
        fields = (
            'perfil_profesor',
            'profesion',
            )


#verifica los datos que tenga el frontend y que tenga los datos que se necesitan