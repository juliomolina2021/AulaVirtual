from django.db import models

from api.models.nivel import Nivel

class Grado(models.Model):

    nombre = models.CharField('grado', max_length=50)
    descripcion = models.CharField('descripcion grado', max_length=200, null=True, blank=True)
    fecha_creado = models.DateTimeField(auto_now_add=True)
    fecha_modificado = models.DateTimeField(auto_now=True)
    activo = models.BooleanField('estado activo', default=True)

    nivel =models.ForeignKey(Nivel, on_delete=models.CASCADE, related_name='nivel_grado')

    def delete(self, *args):
        self.activo = False
        self.save()
        return True