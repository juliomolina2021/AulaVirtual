import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";

const GUARDAR_PAGINA_CURSOS_PROFESOR='GUARDAD_PAGINA_CURSOS_PROFESOR';
const GUARDAD_LISTADO_CURSOS_ESTUDIANTE = 'GUARDAR_LISTADO_CURSOS_ESTUDIANTE';
const GUARDAR_REGISTRO_ASIGNACION_CURSO = 'GUARDAR_REGISTRO_ASIGNACION_CURSO';

export const listarEstudiante = (id) => (dispatch) => {
    api.get('/asignacion/listar_estudiantes_curso', {asignacion:id}).then((response) => {
        console.log("response estudiantes asignados por curso: ", response);
        // const estudiante= response.results[0].estudiantes;
        // response.results= estudiante;
        dispatch({type:GUARDAD_LISTADO_CURSOS_ESTUDIANTE, data:response});
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
    api.get('/asignacion/listar_cursos_estudiantes/', params).then((response) => {
        console.log("response Listar Cursos profesor o estudiante: ", response);

        //console.log("Cursos",{...response});

        dispatch({type:GUARDAD_LISTADO_CURSOS_ESTUDIANTE, data:response});
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
        //console.log("Response leer asignacion response : ", response);
        dispatch({type: GUARDAR_REGISTRO_ASIGNACION_CURSO, registro:response});
        dispatch(initializeForm('cursos_profesor', response))
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
        dispatch(push(`/cursosprofesor/${response.id}/editar`))
    }).catch((error)=>{
        console.log("Error: ", error);
        NotificationManager.error(
            'Ocurrio un error al actualizar el grado',
            'ERROR',
            0
        );
    })
}

export const eliminar_asignacion_estudiante = (id, idasigacion) => (dispatch)=>{
    console.log("id eliminar", id)
    console.log("id asigacion", idasigacion)
    // api.post(`/grado/${id}`).then((response)=>{
    //     NotificationManager.success(
    //         'Asignacion eliminada correctamente',
    //         'Exito',
    //         3000
    //     );
    //     dispatch(listar());
    // }).catch((error)=>{
    //     console.log("Error: ", error);
    //     NotificationManager.error(
    //         'Ocurrio un error al eliminar la asignacion',
    //         'ERROR',
    //         0
    //     );
    // })
}
export const actions = {
    registroAsignacionCurso,
    asignacionCursosEstudiante,
    listarEstudiante,
    listar,
    leer,
    eliminar_asignacion_estudiante,
};
export const reducers = {
    [GUARDAD_LISTADO_CURSOS_ESTUDIANTE]: (state, { data } )=> {
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
};

export const initialState = {
    loader: false,
    data: null,
    registro: null,
    page:1,
}

export default handleActions(reducers, initialState);
