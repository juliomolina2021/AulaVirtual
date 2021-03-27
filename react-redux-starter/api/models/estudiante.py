from django.db import models

from api.models.profile import Profile

class Estudiante(models.Model):

    carnet = models.CharField(max_length=30, null=True, blank=True )
    encargado = models.CharField('encargado', max_length=100, null=True,blank=True)
    telefono_encargado = models.CharField(max_length=15, null=True, blank=True)
    direccion_encargado = models.CharField(max_length=250, null=True, blank=True)

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    profile = models.OneToOneField(Profile, on_delete=models.CASCADE , related_name="perfil_estudiante", null=True, blank=True)

    def delete(self, *args):
        self.activo = False
        self.save()
        return True    