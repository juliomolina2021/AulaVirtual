from django.db import models

class Rol(models.Model):
    nombre_rol = models.CharField('rol', max_length=50)
    descripcion = models.CharField('descripcion rol',max_length=200, null=True, blank=True)
    
    fecha_creado = models.DateTimeField(auto_now_add=True)
    fecha_modificado = models.DateTimeField(auto_now=True)
    activo = models.BooleanField('estado activo', default=True)

    def delete(self, *args):
        self.activo = False
        self.save()
        return True