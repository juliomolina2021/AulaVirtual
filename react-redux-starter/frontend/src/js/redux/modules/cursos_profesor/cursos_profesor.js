import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";

const GUARDAR_PAGINA_CURSOS_PROFESOR='GUARDAD_PAGINA_CURSOS_PROFESOR';
const GUARDAD_LISTADO_CURSOS_PROFESOR = 'GUARDAR_LISTADO_CURSOS_PROFESOR';
const GUARDAR_REGISTRO_ASIGNACION_CURSO = 'GUARDAR_REGISTRO_ASIGNACION_CURSO';
const GUARDAR_PORTADA = 'GUARDAR_PORTADA';

export const listarEstudiante = (id) => (dispatch) => {
    api.get('/asignacion/listar_estudiantes_curso', {asignacion:id}).then((response) => {
        console.log("response estudiantes asignados por curso: ", response);
        // const estudiante= response.results[0].estudiantes;
        // response.results= estudiante;
        dispatch({type:GUARDAD_LISTADO_CURSOS_PROFESOR, data:response});
        //dispatch(initializeForm('cursos_profesor', response));
    }).catch((error)=>{
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrio un error al listar los cursos del profesor',
            'ERROR',
            0
        );
    });
}
export const listar = (page=1) => (dispatch, getStore) => {
    const estado = getStore().cursos_profesor;
    const params = {page}
    api.get('/asignacion/listar_miscursos/', params).then((response) => {
        console.log("response Listar Cursos profesor: ", response);

        //console.log("Cursos",{...response});

        dispatch({type:GUARDAD_LISTADO_CURSOS_PROFESOR, data:response});
        dispatch({type:GUARDAR_PAGINA_CURSOS_PROFESOR, page:page});
    }).catch((error)=>{
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrio un error al listar los cursos del profesor',
            'ERROR',
            0
        );
    });
}

export const leer = (id) => (dispatch) => {
    api.get(`/asignacion/${id}`).then((response)=>{
        console.log("Response leer asignacion response : ", response);
        dispatch({type: GUARDAR_REGISTRO_ASIGNACION_CURSO, registro:response});
        dispatch({type: GUARDAR_PORTADA, portada: response.portada});
        //dispatch(initializeForm('cursos_profesor', response))
    }).catch((error)=>{
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrio un error al consultar el registro',
            'ERROR',
            0
        );
    });
}

export const registroAsignacionCurso = (data) => (dispatch) => {
    //console.log("DATA Registro asignacion curso",data)
    api.post('/asignacion', data)
    .then(()=>{
        NotificationManager.success(
            'Asigacion registrada correctamente',
            'Exito',
            3000
        );
        dispatch(push('/cursosprofesor'))
    }).catch((error)=>{
        console.log("Error: ", error);
        NotificationManager.error(
            'Ocurrio un error al registrar al grado',
            'ERROR',
            0
        );
    })
}

export const asignacionCursosEstudiante = () => (dispatch, getStore) => {
    const data = getStore().form.cursos_profesor.values;
    console.log("Data asignacion", data)
    api.post(`/asignacion/asignacion_curso_estudiante/`, data).then((response)=>{
        NotificationManager.success(
            'Grado actualizado correctamente',
            'Exito',
            3000
        );
        dispatch(listarEstudiante(response.idasigacion));
        //dispatch(push(`/cursosprofesor/${response.id}/editar`));

    }).catch((error)=>{
        console.log("Error: ", error);
        NotificationManager.error(
            'Ocurrio un error al actualizar el grado',
            'ERROR',
            0
        );
    })
}

export const eliminar_asignacion_estudiante = (idestudiante, idasigacion) => (dispatch)=>{

    const formData={
        estudiante:idestudiante,
        asignacion:idasigacion,
    }
    api.post('/asignacion/eliminar_asignacion_estudiante',formData).then((response)=>{
        console.log("Response eliminar", response)
        NotificationManager.success(
            'Asignacion eliminada correctamente',
            'Exito',
            3000
        );
        dispatch(listarEstudiante(idasigacion));
    }).catch((error)=>{
        console.log("Error: ", error);
        NotificationManager.error(
            'Ocurrio un error al eliminar la asignacion',
            'ERROR',
            0
        );
    })
}

export const agregarPortada = (data={}, attachments=[]) => () => {
    console.log("DATA ", data)
    console.log("attachements  ", attachments)
    api.putAttachments(`/asignacion/agregar_portada`, data,attachments).then((response)=>{
        NotificationManager.success(
            'Grado actualizado correctamente',
            'Exito',
            3000
        );
    }).catch((error)=>{
        console.log("Error: ", error);
        NotificationManager.error(
            'Ocurrio un error al actualizar el grado',
            'ERROR',
            0
        );
    })
}
export const clearFile=()=>(dispatch)=>{
    dispatch({type:GUARDAR_PORTADA, portada: null})
}

export const actions = {
    registroAsignacionCurso,
    asignacionCursosEstudiante,
    listarEstudiante,
    listar,
    leer,
    eliminar_asignacion_estudiante,
    agregarPortada,
    clearFile,
};
export const reducers = {
    [GUARDAD_LISTADO_CURSOS_PROFESOR]: (state, { data } )=> {
        return {
            ...state,
            data,
        };
    },
    [GUARDAR_REGISTRO_ASIGNACION_CURSO]: (state, { registro } )=> {
        return {
            ...state,
            registro,
        };
    },
    [GUARDAR_PAGINA_CURSOS_PROFESOR]: (state, { page } )=> {
        return {
            ...state,
            page,
        };
    },
    [GUARDAR_PORTADA]: (state, { portada } )=> {
        return {
            ...state,
            portada,
        };
    },
};

export const initialState = {
    loader: false,
    data: null,
    registro: null,
    page:1,
    portada:null,
}

export default handleActions(reducers, initialState);
