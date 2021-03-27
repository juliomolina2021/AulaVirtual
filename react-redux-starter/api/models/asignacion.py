from django.db import models

from api.models.estudiante import Estudiante
from api.models.ciclo_escolar import Ciclo_Escolar
from api.models.grado import Grado
from api.models.seccion import Seccion
from api.models.curso import Curso
from api.models.profesor import Profesor 

class Asignacion(models.Model):

    portada = models.ImageField(upload_to='imagenes_curso', null=True, blank=True)
    descripcion = models.CharField('descripcion asignacion', max_length=200, null=True, blank=True)
    fecha_creado = models.DateTimeField(auto_now_add=True)
    fecha_modificado = models.DateTimeField(auto_now=True)
    activo = models.BooleanField('estado activo', default=True)

    estudiante = models.ManyToManyField(Estudiante)
    
    ciclo_escolar =models.ForeignKey(Ciclo_Escolar, on_delete=models.CASCADE, related_name='asignacion_Ciclo_Escolar')
    grado = models.ForeignKey(Grado, on_delete=models.CASCADE, related_name='asignacion_grado')
    seccion = models.ForeignKey(Seccion, on_delete=models.CASCADE, related_name='asignacion_seccion')
    curso = models.ForeignKey(Curso, on_delete=models.CASCADE, related_name='asignacion_curso')
    profesor = models.ForeignKey(Profesor, on_delete=models.CASCADE, related_name='asignacion_Profesor')

    def delete(self, *args):
        self.activo = False
        self.save()
        return True

    def __str__(self):
        return '%s %s'% (self.profesor, self.curso)
