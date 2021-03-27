from django.db import models

class Nivel(models.Model):
    nombre_nivel = models.CharField('nivel', max_length=50)
    descripcion = models.CharField('descripcion nivel', max_length=200, null=True, blank=True)
    
    fecha_creado = models.DateTimeField(auto_now_add=True)
    fecha_modificado = models.DateTimeField(auto_now=True)
    activo = models.BooleanField('estado activo', default=True)

    def delete(self, *args):
            self.activo = False
            self.save()
            return True