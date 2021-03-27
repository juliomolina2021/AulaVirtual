import React from 'react';
import {
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

import {Login, Profile, Registro} from './common/components/LoginRegister';
import DemoContainer from './common/components/Demo/DemoContainer';
import ProtectedRoute from './ProtectedRoute';
import Examples from './common/components/Examples/Basic';
import NotFound from './common/components/layout/NotFound/NotFound';

import '../assets/fonts/fonts.css';

require('../../node_modules/font-awesome/css/font-awesome.css');
require('../../node_modules/bootstrap/dist/css/bootstrap.css');
import 'bootstrap/dist/css/bootstrap.min.css';
import Grids from "./common/components/Examples/Grids";
import Notificaciones from './common/components/Examples/Notificaciones';
import ExampleTabs from './common/components/Examples/Tabs/Tabs';
require('../style/index.css');

import EstudianteListContainer from './common/components/Estudiante/EstudianteListContainer';
import EstudianteCrearContainer from './common/components/Estudiante/EstudianteCrearContainer';

import ProfesorListContainer from './common/components/Profesor/ProfesorListContainer';
import ProfesorCrearContainer from './common/components/Profesor/ProfesorCrearContainer';

import ProfesionListContainer from './common/components/Profesion/ProfesionListContainer';
import ProfesionCrearContainer from './common/components/Profesion/ProfesionCrearContainer';

import RolListContainer from './common/components/Rol/RolListContainer';
import RolCrearContainer from './common/components/Rol/RolCrearContainer';

import CicloListContainer from './common/components/Ciclo/CicloListContainer';
import CicloCrearContainer from './common/components/Ciclo/CicloCrearContainer';

import NivelListContainer from './common/components/Nivel/NivelListContainer';
import NivelCrearContainer from './common/components/Nivel/NivelCrearContainer';

import EventoListContainer from './common/components/Evento/EventoListContainer';
import EventoCrearContainer from './common/components/Evento/EventoCrearContainer';

import GradoListContainer from './common/components/Grado/GradoListContainer';
import GradoCrearContainer from './common/components/Grado/GradoCrearContainer';

import SeccionListContainer from './common/components/Seccion/SeccionListContainer';
import SeccionCrearContainer from './common/components/Seccion/SeccionCrearContainer';

import CursoListContainer from './common/components/Curso/CursoListContainer';
import CursoCrearContainer from './common/components/Curso/CursoCrearContainer';

import AsignacionListContainer from './common/components/Asignacion/AsignacionListContainer';
import AsignacionCrearContainer from './common/components/Asignacion/AsignacionCrearContainer';

import CursosProfesorListContainer from './common/components/CursosProfesor/CursosProfesorListContainer';
import CursosProfesorCrearContainer from './common/components/CursosProfesor/CursosProfesorCrearContainer';

import TareaListContainer from './common/components/Tarea/TareaListContainer';
import TareaCrearContainer from './common/components/Tarea/TareaCrearContainer';

import MaterialListContainer from './common/components/Material/MaterialListContainer';
import MaterialCrearContainer from './common/components/Material/MaterialCrearContainer';

import CursosEstudianteListContainer from './common/components/CursosEstudiante/CursosEstudianteListContainer';

import TareaEstudianteListContainer from './common/components/TareaEstudiante/TareaEstudianteListContainer';
import InformacionTareaContainer from './common/components/TareaEstudiante/InformacionTareaContainer';
import TareaEstudianteCrearContainer from './common/components/TareaEstudiante/TareaEstudianteCrearContainer';

import MaterialEstudianteListContainer from './common/components/TareaEstudiante/MaterialEstudianteListContainer';

import TareasCalificacionListContainer from './common/components/CalificacionProfesor/TareasCalificacionListContainer';
import TareasCalificacionCrearContainer from './common/components/CalificacionProfesor/TareaCalificacionCrearContainer';
import TareaCalificacionCrearContainer from './common/components/CalificacionProfesor/TareaCalificacionCrearContainer';

import CalificacionEstudianteListContainer from './common/components/CalificacionEstudiante/CalificacionEstudianteListContainer';
import DetalleCursoContainer from './common/components/CursosProfesor/DetalleCursoContainer';
import DetalleCursoEstudiante from './common/components/CursosEstudiante/DetalleCurso';

module.exports = (
    <div>
        <div className="container__content">
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/registro" component={Registro} />
                <ProtectedRoute exact path="/" component={DemoContainer} />
                <ProtectedRoute exact path="/page2" component={Examples} />
                <ProtectedRoute exact path="/user-profile" component={Profile} />
                <ProtectedRoute exact path="/grids" component={Grids} />
                <ProtectedRoute exact path="/notifications" component={Notificaciones} />
                <ProtectedRoute exact path="/tabs" component={ExampleTabs} />

                <ProtectedRoute exact path="/estudiantes/crear" component={EstudianteCrearContainer}/>
                <ProtectedRoute exact path="/estudiantes/:id" component={EstudianteCrearContainer} />
                <ProtectedRoute exact path="/estudiantes/:id/editar" component={EstudianteCrearContainer} />
                <ProtectedRoute exact path="/estudiantes" component={EstudianteListContainer}/>

                <ProtectedRoute exact path="/profesores/crear" component={ProfesorCrearContainer}/>
                <ProtectedRoute exact path="/profesores/:id" component={ProfesorCrearContainer} />
                <ProtectedRoute exact path="/profesores/:id/editar" component={ProfesorCrearContainer} />
                <ProtectedRoute exact path="/profesores" component={ProfesorListContainer}/>

                <ProtectedRoute exact path="/profesiones/crear" component={ProfesionCrearContainer}/>
                <ProtectedRoute exact path="/profesiones/:id" component={ProfesionCrearContainer} />
                <ProtectedRoute exact path="/profesiones/:id/editar" component={ProfesionCrearContainer} />
                <ProtectedRoute exact path="/profesiones" component={ProfesionListContainer}/>

                <ProtectedRoute exact path="/roles/crear" component={RolCrearContainer}/>
                <ProtectedRoute exact path="/roles/:id" component={RolCrearContainer} />
                <ProtectedRoute exact path="/roles/:id/editar" component={RolCrearContainer} />
                <ProtectedRoute exact path="/roles" component={RolListContainer}/>

                <ProtectedRoute exact path="/ciclos/crear" component={CicloCrearContainer}/>
                <ProtectedRoute exact path="/ciclos/:id" component={CicloCrearContainer} />
                <ProtectedRoute exact path="/ciclos/:id/editar" component={CicloCrearContainer} />
                <ProtectedRoute exact path="/ciclos" component={CicloListContainer}/>

                <ProtectedRoute exact path="/niveles/crear" component={NivelCrearContainer}/>
                <ProtectedRoute exact path="/niveles/:id" component={NivelCrearContainer} />
                <ProtectedRoute exact path="/niveles/:id/editar" component={NivelCrearContainer} />
                <ProtectedRoute exact path="/niveles" component={NivelListContainer}/>

                <ProtectedRoute exact path="/eventos/crear" component={EventoCrearContainer}/>
                <ProtectedRoute exact path="/eventos/:id" component={EventoCrearContainer} />
                <ProtectedRoute exact path="/eventos/:id/editar" component={EventoCrearContainer} />
                <ProtectedRoute exact path="/eventos" component={EventoListContainer}/>

                <ProtectedRoute exact path="/grados/crear" component={GradoCrearContainer}/>
                <ProtectedRoute exact path="/grados/:id" component={GradoCrearContainer} />
                <ProtectedRoute exact path="/grados/:id/editar" component={GradoCrearContainer} />
                <ProtectedRoute exact path="/grados" component={GradoListContainer}/>

                <ProtectedRoute exact path="/secciones/crear" component={SeccionCrearContainer}/>
                <ProtectedRoute exact path="/secciones/:id" component={SeccionCrearContainer} />
                <ProtectedRoute exact path="/secciones/:id/editar" component={SeccionCrearContainer} />
                <ProtectedRoute exact path="/secciones" component={SeccionListContainer}/>

                <ProtectedRoute exact path="/cursos/crear" component={CursoCrearContainer}/>
                <ProtectedRoute exact path="/cursos/:id" component={CursoCrearContainer} />
                <ProtectedRoute exact path="/cursos/:id/editar" component={CursoCrearContainer} />
                <ProtectedRoute exact path="/cursos" component={CursoListContainer}/>

                <ProtectedRoute exact path="/asignaciones/crear" component={AsignacionCrearContainer}/>
                <ProtectedRoute exact path="/asignaciones/:id" component={AsignacionCrearContainer} />
                <ProtectedRoute exact path="/asignaciones/:id/editar" component={AsignacionCrearContainer} />
                <ProtectedRoute exact path="/asignaciones" component={AsignacionListContainer}/>

                <ProtectedRoute exact path="/cursosprofesor/crear" component={CursosProfesorCrearContainer}/>
                <ProtectedRoute exact path="/cursosprofesor/:id" component={CursosProfesorCrearContainer} />
                <ProtectedRoute exact path="/cursosprofesor/:id/editar" component={CursosProfesorCrearContainer} />
                <ProtectedRoute exact path="/cursosprofesor" component={CursosProfesorListContainer}/>

                <ProtectedRoute exact path="/DetalleCurso/:idasignacion" component={DetalleCursoContainer}/>
                <ProtectedRoute exact path="/DetalleCursoEstudiante/:idasignacion/:nombreCurso" component={DetalleCursoEstudiante}/>

                <ProtectedRoute exact path="/tareas/crear/:idasignacion" component={TareaCrearContainer}/>
                <ProtectedRoute exact path="/tareasasignacion/tareas/:id" component={TareaCrearContainer} />
                <ProtectedRoute exact path="/tareasasignacion/tareas/:id/editar" component={TareaCrearContainer} />
                <ProtectedRoute exact path="/tareasasignacion/:idasignacion/" component={TareaListContainer}/>

                <ProtectedRoute exact path="/materiales/crear/:idasignacion" component={MaterialCrearContainer}/>
                <ProtectedRoute exact path="/materialesasignacion/:asignacion/materiales/:id" component={MaterialCrearContainer} />
                <ProtectedRoute exact path="/materialesasignacion/:asignacion/materiales/:id/editar" component={MaterialCrearContainer} />
                <ProtectedRoute exact path="/materialesasignacion/:asignacion/" component={MaterialListContainer}/>


                <ProtectedRoute exact path="/cursosestudiantes" component={CursosEstudianteListContainer}/>

                <ProtectedRoute exact path="/tareasestudiante/crear/:idtarea" component={TareaEstudianteCrearContainer}/>
                <ProtectedRoute exact path="/tareasestudiante/:idasignacion" component={TareaEstudianteListContainer}/>
                <ProtectedRoute exact path="/materialestudiante/:idasignacion" component={MaterialEstudianteListContainer}/>
                <ProtectedRoute exact path="/infotarea/:idtarea" component={InformacionTareaContainer}/>

                <ProtectedRoute exact path="/calificaciones/crear/:idtareaestudiante" component={TareaCalificacionCrearContainer}/>
                <ProtectedRoute exact path="/calificaciones/:idasignacion" component={TareasCalificacionListContainer}/>
                <ProtectedRoute exact path="/Calificacionestudiante/:idasignacion" component={CalificacionEstudianteListContainer}/>

                <Route component={NotFound} />
            </Switch>
        </div>
        <NotificationContainer />
    </div>
);
