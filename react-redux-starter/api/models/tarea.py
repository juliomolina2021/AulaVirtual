from django.db import models
from api.models.asignacion import Asignacion

class Tarea(models.Model):
    
    nombre_tarea = models.CharField('tarea', max_length=50)
    descripcion = models.CharField('descripcion tarea', max_length=300, null=True, blank=True)
    archivo =  models.FileField(upload_to='archivos_tarea', null=True, blank=True)
    fecha_entrega = models.DateField("%Y-%M-%D")
    hora_entrega = models.TimeField()
    nota = models.DecimalField(max_digits=5, decimal_places=2)
    
    fecha_creado = models.DateTimeField(auto_now_add=True)
    fecha_modificado = models.DateTimeField(auto_now=True)
    activo = models.BooleanField('estado activo', default=True)

    asignacion = models.ForeignKey(Asignacion, on_delete=models.CASCADE, related_name='asignacion_tarea')

    def delete(self, *args):
        self.activo = False
        self.save()
        return True