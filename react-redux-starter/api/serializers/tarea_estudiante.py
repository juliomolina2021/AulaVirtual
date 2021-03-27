from rest_framework import serializers
from api.models import Tarea_Estudiante
from api.serializers import TareaSerializer

class TareaEstudianteSerializer(serializers.ModelSerializer):
    #asignacion = AsignacionSerializer()
    pendientesCurso= serializers.IntegerField(default=0)
    class Meta:
        model = Tarea_Estudiante
        fields = (
            'id',
            'tarea',
            'estudiante',
            'archivo',
            'fecha_entrega',
            'comentario',
            'estado_calificacion',
            'estado_entrega',
            'calificacion',
            'pendientesCurso'
            )

        depth= 3


class TareaEstudianteCountSerializer(serializers.ModelSerializer):
    #asignacion = AsignacionSerializer()
    pendientesCurso= serializers.IntegerField(default=0)
    nombreCurso=serializers.CharField(default=" ")
    #tarea=TareaSerializer()
    class Meta:
        model = Tarea_Estudiante
        fields = (
            'id',
            'tarea',
            'estudiante',
            'nombreCurso',
            'estado_calificacion',
            'estado_entrega',
            'pendientesCurso'
            )
        depth= 1

class TareaEstudianteRegistroSerializer(serializers.ModelSerializer):
    #asignacion = AsignacionSerializer()
    class Meta:
        model = Tarea_Estudiante
        fields = (
            'tarea',
            'estudiante',
            'fecha_entrega',
            'comentario',
            'estado_calificacion',
            'estado_entrega',
            )
