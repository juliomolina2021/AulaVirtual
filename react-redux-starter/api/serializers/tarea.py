from rest_framework import serializers
from api.models import Tarea
from api.serializers import AsignacionSerializer

class TareaSerializer(serializers.ModelSerializer):
    #asignacion = AsignacionSerializer()
    pendientesCurso= serializers.IntegerField(default=0)
    nombreCurso=serializers.CharField(default=" ")
    class Meta:
        model = Tarea
        fields = (
            'id',
            'nombre_tarea',
            'descripcion',
            'archivo',
            'fecha_entrega',
            'hora_entrega',
            'nota',
            'asignacion',
            'pendientesCurso',
            'nombreCurso',
            )
        depth= 2

class TareaCountSerializer(serializers.Serializer):
    #asignacion = AsignacionSerializer()
    pendientesCurso= serializers.IntegerField(default=0)
    nombreCurso=serializers.CharField(default=" ")
    class Meta:
        #model = Tarea
        fields = (
            
            'pendientesCurso',
            'nombreCurso',
            )


class TareaRegistroSerializer(serializers.ModelSerializer):
    #asignacion = AsignacionSerializer()
    class Meta:
        model = Tarea
        fields = (
            'nombre_tarea',
            'descripcion',
            'archivo',
            'fecha_entrega',
            'hora_entrega',
            'nota',
            'asignacion',
            )
