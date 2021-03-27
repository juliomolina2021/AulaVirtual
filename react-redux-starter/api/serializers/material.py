from rest_framework import serializers
from api.models import Material_Clase
from api.serializers import AsignacionSerializer

class MaterialSerializer(serializers.ModelSerializer):
    #asignacion = AsignacionSerializer()
    class Meta:
        model = Material_Clase
        fields = (
            'id',
            'nombre_material',
            'descripcion',
            'archivo',
            'asignacion',
            )
        depth= 2


class MaterialRegistroSerializer(serializers.ModelSerializer):
    #asignacion = AsignacionSerializer()
    class Meta:
        model = Material_Clase
        fields = (
            'nombre_material',
            'descripcion',
            'archivo',
            'asignacion',
            )
