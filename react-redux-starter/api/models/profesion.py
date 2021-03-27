from django.db import models

class Profesion(models.Model):
    nombre_profesion = models.CharField('profesion', max_length=75)
    descripcion = models.CharField('descripcion profesion',max_length=200, null=True, blank=True)
    
    fecha_creado = models.DateTimeField(auto_now_add=True)
    fecha_modificado = models.DateTimeField(auto_now=True)
    activo = models.BooleanField('estado activo', default=True)

    def delete(self, *args):
        self.activo = False
        self.save()
        return True