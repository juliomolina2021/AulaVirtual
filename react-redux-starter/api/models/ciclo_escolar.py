from django.db import models

class Ciclo_Escolar(models.Model):
    anio= models.IntegerField()
    
    fecha_creado = models.DateTimeField(auto_now_add=True)
    fecha_modificado = models.DateTimeField(auto_now=True)
    activo = models.BooleanField('estado activo', default=True)

    def delete(self, *args):
        self.activo = False
        self.save()
        return True