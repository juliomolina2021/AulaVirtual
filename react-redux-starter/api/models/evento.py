from django.db import models

from api.models.ciclo_escolar import Ciclo_Escolar

class Evento(models.Model):

    nombre_evento = models.CharField('evento', max_length=50)
    descripcion = models.CharField('descripcion evento', max_length=300, null=True, blank=True)
    fecha_evento = models.DateField()
    hora_evento = models.TimeField()
    fecha_creado = models.DateTimeField(auto_now_add=True)
    fecha_modificado = models.DateTimeField(auto_now=True)
    activo = models.BooleanField('estado activo', default=True)

    ciclo_escolar = models.ForeignKey(Ciclo_Escolar, on_delete=models.CASCADE, related_name='cicloEscolar_evento')

    def delete(self, *args):
        self.activo = False
        self.save()
        return True