import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { NotificationManager } from "react-notifications";
import { api } from "api";
import moment from 'moment'

const GUARDAR_LISTADO_NIVELES = 'GUARDAR_LISTADO_NIVELES';
const GUARDAR_REGISTRO_ESTUDIANTES = 'GUARDAR_REGISTRO_ESTUDIANTES';
const GUARDAR_REGISTRO_PROFESORES = 'GUARDAR_REGISTRO_PROFESORES';
const GUARDAR_REGISTRO_GRADOS = 'GUARDAR_REGISTRO_GRADOS';
const GUARDAR_REGISTRO_SECCIONES = 'GUARDAR_REGISTRO_SECCIONES';
const GUARDAR_REGISTRO_USUARIOS= 'GUARDAR_REGISTRO_USUARIOS';
/****************************************************************** */
const GUARDAD_LISTADO_CURSOS_PROFESOR='GUARDAD_LISTADO_CURSOS_PROFESOR';
const GUARDAR_LISTADO_TAREAS_SINCALIFICAR='GUARDAR_LISTADO_TAREAS_SINCALIFICAR';
const GUARDAR_LISTADO_TAREAS_SINCALIFICAR_CURSO='GUARDAR_LISTADO_TAREAS_SINCALIFICAR_CURSO';
const GUARDAR_LISTADO_EVENTOS_PROXIMOS='GUARDAR_LISTADO_EVENTOS_PROXIMOS';
/******************************************************************* */
const GUARDAR_LISTADO_CURSOS_ESTUDIANTE='GUARDAD_LISTADO_CURSOS_ESTUDIANTE';
const GUARDAR_LISTADO_TAREAS_SIN_ENTREGAR='GUARDAR_LISTADO_TAREAS_SIN_ENTREGAR';
const GUARDAR_LISTADO_TAREAS_SIN_ENTREGAR_CURSO='GUARDAR_LISTADO_TAREAS_SIN_ENTREGAR_CURSO';



export const listarNiveles = () => (dispatch) => {
    api.get('/nivel').then((response) => {
        console.log("response Listar: ", response);
        dispatch({type:GUARDAR_LISTADO_NIVELES, niveles:response});
    }).catch((error)=>{
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrio un error al listar los grados',
            'ERROR',
            0
        );
    });
}

export const totalUsuarios = () => (dispatch) => {
    api.get(`/user`).then((response)=>{
        //console.log("Response leer: ", response);
        dispatch({type: GUARDAR_REGISTRO_USUARIOS, usuario:response});
    }).catch((error)=>{
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrio un error al consultar el registro',
            'ERROR',
            0
        );
    });
}

export const totalEstudiantes = () => (dispatch) => {
    api.get(`/estudiante`).then((response)=>{
        console.log("Response leer: ", response);
        dispatch({type: GUARDAR_REGISTRO_ESTUDIANTES, estudiante:response});
    }).catch((error)=>{
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrio un error al consultar el registro',
            'ERROR',
            0
        );
    });
}

export const totalProfesores = () => (dispatch) => {
    api.get(`/profesor`).then((response)=>{
        console.log("Response leer: ", response);
        dispatch({type: GUARDAR_REGISTRO_PROFESORES, profesor:response});
    }).catch((error)=>{
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrio un error al consultar el registro',
            'ERROR',
            0
        );
    });
}
export const totalGrados = () => (dispatch) => {
    api.get(`/grado`).then((response)=>{
        console.log("Response leer: ", response);
        dispatch({type: GUARDAR_REGISTRO_GRADOS, grado:response});
    }).catch((error)=>{
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrio un error al consultar el registro',
            'ERROR',
            0
        );
    });
}
export const totalSecciones = () => (dispatch) => {
    api.get(`/seccion`).then((response)=>{
        console.log("Response leer: ", response);
        dispatch({type: GUARDAR_REGISTRO_SECCIONES, seccion:response});
    }).catch((error)=>{
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrio un error al consultar el registro',
            'ERROR',
            0
        );
    });
}
/************************************************* */
export const listarCursosProfesor = () => (dispatch) => {
    api.get('/asignacion/listar_miscursos/').then((response) => {
        //console.log("cursos profesor", response)
        dispatch({type:GUARDAD_LISTADO_CURSOS_PROFESOR, cursos:response});
    }).catch((error)=>{
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrio un error al listar los cursos del profesor',
            'ERROR',
            0
        );
    });
}
export const tareasPendientesCalificar = () => (dispatch) => {
    api.get('/tarea_estudiante/tareas_pendientes_calificar').then((response) => {
        console.log("response sin calificar",response)
        dispatch({type:GUARDAR_LISTADO_TAREAS_SINCALIFICAR, tareas_sincalificar:response});
    }).catch((error)=>{
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrio un error al listar los tareas sin calificar del profesor',
            'ERROR',
            0
        );
    });
}
export const tareasPendientesCalificarCurso = () => (dispatch) => {
    api.get('/tarea_estudiante/tareas_pendientes_calificar_curso').then((response) => {
        console.log("response sin calificar por curso",response)
        dispatch({type:GUARDAR_LISTADO_TAREAS_SINCALIFICAR_CURSO, tareas_sincalificar_curso:response});
    }).catch((error)=>{
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrio un error al listar los tareas sin calificar del profesor',
            'ERROR',
            0
        );
    });
}
export const eventosProximos = () => (dispatch) => {
    api.get('/evento/eventos_proximos').then((response) => {
        console.log("response eventos proximos",response)
        dispatch({type:GUARDAR_LISTADO_EVENTOS_PROXIMOS, eventos_proximos:response});
    }).catch((error)=>{
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrio un error al listar los tareas sin calificar del profesor',
            'ERROR',
            0
        );
    });
}

/******************************************* */
export const listar_cursos_estudiantes = () => (dispatch) => {
    api.get('/asignacion/listar_cursos_estudiantes/').then((response) => {
        console.log("response Listar Cursos estudiante: ", response);

        dispatch({type:GUARDAR_LISTADO_CURSOS_ESTUDIANTE, cursos_estudiante:response});
    }).catch((error)=>{
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrio un error al listar los cursos del profesor',
            'ERROR',
            0
        );
    });
}
export const tareasPendientesEntregar = () => (dispatch) => {
    api.get('/tarea_estudiante/tareas_pendientes_entregar').then((response) => {
        console.log("response sin entregar",response)
        dispatch({type:GUARDAR_LISTADO_TAREAS_SIN_ENTREGAR, tareas_sin_entregar:response});
    }).catch((error)=>{
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrio un error al listar los tareas sin entregar del estudiante',
            'ERROR',
            0
        );
    });
}
export const tareasPendientesEntregarCurso = () => (dispatch) => {
    api.get('/tarea_estudiante/tareas_pendientes_entrega_curso').then((response) => {
        console.log("response sin entregar por curso",response)
        dispatch({type:GUARDAR_LISTADO_TAREAS_SIN_ENTREGAR_CURSO, tareas_sin_entregar_curso:response});
    }).catch((error)=>{
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrio un error al listar los tareas sin entregar del estudiante',
            'ERROR',
            0
        );
    });
}


export const actions = {
    listarNiveles,
    totalEstudiantes,
    totalProfesores,
    totalGrados,
    totalSecciones,
    totalUsuarios,
    /*********************************** */
    listarCursosProfesor,
    tareasPendientesCalificar,
    tareasPendientesCalificarCurso,
    eventosProximos,
    /************************************** */
    listar_cursos_estudiantes,
    tareasPendientesEntregar,
    tareasPendientesEntregarCurso,
};
export const reducers = {
    [GUARDAR_LISTADO_NIVELES]: (state, { niveles } )=> {
        return {
            ...state,
            niveles,
        };
    },
    [GUARDAR_REGISTRO_ESTUDIANTES]: (state, { estudiante } )=> {
        return {
            ...state,
            estudiante,
        };
    },
    [GUARDAR_REGISTRO_PROFESORES]: (state, { profesor } )=> {
        return {
            ...state,
            profesor,
        };
    },
    [GUARDAR_REGISTRO_GRADOS]: (state, { grado } )=> {
        return {
            ...state,
            grado,
        };
    },
    [GUARDAR_REGISTRO_SECCIONES]: (state, { seccion } )=> {
        return {
            ...state,
            seccion,
        };
    },
    [GUARDAR_REGISTRO_USUARIOS]: (state, { usuario } )=> {
        return {
            ...state,
            usuario,
        };
    },
    /*********************************************************** */
    [GUARDAD_LISTADO_CURSOS_PROFESOR]: (state, { cursos } )=> {
        return {
            ...state,
            cursos,
        };
    },
    [GUARDAR_LISTADO_TAREAS_SINCALIFICAR]: (state, { tareas_sincalificar } )=> {
        return {
            ...state,
            tareas_sincalificar,
        };
    },
    [GUARDAR_LISTADO_TAREAS_SINCALIFICAR_CURSO]: (state, { tareas_sincalificar_curso } )=> {
        return {
            ...state,
            tareas_sincalificar_curso,
        };
    },
    [GUARDAR_LISTADO_EVENTOS_PROXIMOS]: (state, { eventos_proximos } )=> {
        return {
            ...state,
            eventos_proximos,
        };
    },
    /******************************************************* */
    [GUARDAR_LISTADO_CURSOS_ESTUDIANTE]: (state, { cursos_estudiante } )=> {
        return {
            ...state,
            cursos_estudiante,
        };
    },
    [GUARDAR_LISTADO_TAREAS_SIN_ENTREGAR]: (state, { tareas_sin_entregar } )=> {
        return {
            ...state,
            tareas_sin_entregar,
        };
    },
    [GUARDAR_LISTADO_TAREAS_SIN_ENTREGAR_CURSO]: (state, { tareas_sin_entregar_curso } )=> {
        return {
            ...state,
            tareas_sin_entregar_curso,
        };
    },
};

export const initialState = {
    loader: false,
    niveles: null,
    registro: null,
    estudiante: null,
    profesor: null,
    grado: null,
    seccion: null,
    usuario: null,
    /*************************************************** */
    cursos:null,
    tareas_sincalificar:null,
    tareas_sincalificar_curso:null,
    eventos_proximos:null,
    /******************************************************* */
    cursos_estudiante:null,
    tareas_sin_entregar:null,
    tareas_sin_entregar_curso:null,
}

export default handleActions(reducers, initialState);
