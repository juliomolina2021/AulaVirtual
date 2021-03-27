from django.db import models

from api.models.tarea import Tarea
from api.models.estudiante import Estudiante

class Tarea_Estudiante(models.Model):

    fecha_entrega = models.DateTimeField(auto_now_add=True)
    archivo =  models.CharField(max_length=50)
    comentario = models.CharField(max_length=250, blank=True, null=True)
    calificacion =models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    estado_calificacion=models.CharField(max_length=50, blank=True, null=True, default="Sin calificar")
    estado_entrega=models.CharField(max_length=50, blank=True, null=True, default="No entregado")

    fecha_creado = models.DateTimeField(auto_now_add=True)
    fecha_modificado = models.DateTimeField(auto_now=True)
    activo = models.BooleanField('estado activo', default=True)

    tarea = models.ForeignKey(Tarea, on_delete=models.CASCADE, related_name='tarea_tareaestudiante')
    estudiante = models.ForeignKey(Estudiante, on_delete=models.CASCADE, related_name='tarea_estudiante')

    def delete(self, *args):
        self.activo = False
        self.save()
        return True