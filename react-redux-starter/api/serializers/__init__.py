from .user import UserSerializer, UserReadSerializer, ProfileSerializer, ProfileRegistroSerializer, UserRegistroSerializer, UserLeerSerializer
from .estudiante import EstudianteSerializer, EstudianteRegistroSerializer
from .profesion import ProfesionSerializer, ProfesionRegistroSerializer
from .rol import RolSerializer, RolRegistroSerializer
from .ciclo_escolar import CicloEscolarSerializer, CicloEscolarRegistroSerializer
from .nivel import NivelSerializer, NivelRegistroSerializer
from .seccion import SeccionSerializer, SeccionRegistroSerializer
from .curso import CursoSerializer, CursoRegistroSerializer
from .grado import GradoSerializer, GradoRegistroSerializer
from .profesor import ProfesorSerializer, ProfesorRegistroSerializer
from .asignacion import AsignacionSerializer, AsignacionRegistroSerializer
from .tarea import TareaSerializer, TareaRegistroSerializer, TareaCountSerializer
from .material import MaterialSerializer, MaterialRegistroSerializer
from .tarea_estudiante import TareaEstudianteSerializer, TareaEstudianteRegistroSerializer, TareaEstudianteCountSerializer
from .evento import EventoSerializer, EventoRegistroSerializer