import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'
import login from './modules/cuenta/login';
import register from './modules/cuenta/register';
import profile from './modules/cuenta/profile';
import usuarios from './modules/usuarios/usuarios';
import notificaciones from './modules/notificaciones/notificaciones';
import estudiante from './modules/estudiante/estudiante';
import profesiones from './modules/profesion/profesion';
import roles from './modules/rol/rol';
import ciclos from './modules/ciclo/ciclo';
import niveles from './modules/nivel/nivel';
import secciones from './modules/seccion/seccion';
import cursos from './modules/curso/curso';
import grado from './modules/grado/grado';
import profesor from './modules/profesor/profesor';
import asignacion from './modules/asignacion/asignacion';
import cursos_profesor from './modules/cursos_profesor/cursos_profesor';
import tarea from './modules/tarea/tarea';
import material from './modules/material/material';
import cursos_estudiante from './modules/cursos_estudiante/cursos_estudiante';
import tarea_estudiante from './modules/tarea_estudiante/tarea_estudiante';
import tarea_calificacion from './modules/tarea_calificacion/tarea_calificacion';
import dashboard from './modules/dashboard/dashboard';
import dashboard_admin from './modules/dashboard_admin/dashboard_admin';
import evento from './modules/evento/evento';


export default combineReducers({
    form: formReducer,
    login,
    register,
    profile,
    usuarios,
    routing,
    notificaciones,
    estudiante,
    profesiones,
    roles,
    ciclos,
    niveles,
    secciones,
    cursos,
    grado,
    evento,
    profesor,
    asignacion,
    cursos_profesor,
    tarea,
    material,
    cursos_estudiante,
    tarea_estudiante,
    tarea_calificacion,
    dashboard,
    dashboard_admin,
});
