from django.db import models

from api.models.asignacion import Asignacion

class Material_Clase(models.Model):
    
    nombre_material= models.CharField('evento', max_length=150)
    descripcion = models.CharField('descripcion material', max_length=200, null=True, blank=True)
    archivo =  models.FileField(upload_to='archivos_material', null=True, blank=True)
    
    fecha_creado = models.DateTimeField(auto_now_add=True)
    fecha_modificado = models.DateTimeField(auto_now=True)
    activo = models.BooleanField('estado activo', default=True)

    asignacion = models.ForeignKey(Asignacion, on_delete=models.CASCADE, related_name='asignacion_material')

    def delete(self, *args):
            self.activo = False
            self.save()
            return True