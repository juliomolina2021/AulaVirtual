from django.db import models

from api.models.profile import Profile
from api.models.profesion import Profesion

class Profesor(models.Model):
    perfil_profesor = models.OneToOneField(Profile, on_delete=models.CASCADE , related_name="perfil_profesor")
    profesion = models.ForeignKey(Profesion, on_delete=models.CASCADE, related_name='profesion_profesor')

    def delete(self, *args):
        self.activo = False
        self.save()
        return True