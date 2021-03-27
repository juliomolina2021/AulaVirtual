import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";

const GUARDAR_LISTADO_TAREA = 'GUARDAR_LISTADO_TAREA';
const GUARDAR_REGISTRO_TAREA = 'GUARDAR_REGISTRO_TAREA';
const GUARDAR_ARCHIVO='GUARDAR_ARCHIVO';
const GUARDAR_REGISTRO_ESTUDIANTE = 'GUARDAR_REGISTRO_ESTUDIANTE';
const GUARDAR_LISTADO_MATERIAL='GUARDAR_LISTADO_MATERIAL'

export const listarTareasCurso = (idAsignacion) => (dispatch) => {

    api.get('/tarea/listar_tareas_curso', {asignacion:idAsignacion}).then((response) => {
        console.log("Response litar tarea curso", response)
        dispatch({type:GUARDAR_LISTADO_TAREA, data:response});
    }).catch((error)=>{
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrio un error al listar las tareas',
            'ERROR',
            0
        );
    });
}

export const leer = (id) => (dispatch) => {
    api.get(`/tarea/${id}`).then((response)=>{
        console.log("Ressponse leer tarea", response)
        dispatch({type: GUARDAR_ARCHIVO, archivo: response.archivo});
        dispatch({type: GUARDAR_REGISTRO_TAREA, registro:response});
        dispatch(initializeForm('informacion_tarea', response))
    }).catch((error)=>{
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrio un error al consultar el registro',
            'ERROR',
            0
        );
    });
}

export const trasladoForm = () => (dispatch, getStore) => {
    console.log("traslado form")
    const data = getStore().form.informacion_tarea.values;
    dispatch(push(`/tareasestudiante/crear/${data.id}`));
}

export const registroTarea = (data={}, attachments=[]) => (dispatch, getStore) => {
    console.log("data: ", data)
    console.log("attachments", attachments)
    const asignacion =data.asignacion
    api.postAttachments("/tarea_estudiante", data, attachments)
    .then((response)=>{
        NotificationManager.success(
            'Tarea recibida correctamente',
            'Exito',
            3000
        );
        dispatch(push(`/tareasestudiante/${asignacion}`))
    }).catch((error)=>{
        console.log("Error: ", error);
        NotificationManager.error(
            'Ocurrio un error al registrar al grado',
            'ERROR',
            0
        );
    })
}



export const actualizarTarea = (data={}, attachments=[]) => (dispatch, getStore) => {
    // console.log("DATA ", data)
    // console.log("attachements  ", attachments)
    // const id_asignacion=data.asignacion.id;
    // data.asignacion= data.asignacion.id;
    // api.putAttachments(`/tarea/${data.id}`, data, attachments).then((response)=>{
    //     NotificationManager.success(
    //         'Grado actualizado correctamente',
    //         'Exito',
    //         3000
    //     );
    //     dispatch(push('/cursosprofesor'))
    //     //dispatch(push(`/tareasasignacion/${id_asignacion}`))
    // }).catch((error)=>{
    //     console.log("Error: ", error);
    //     NotificationManager.error(
    //         'Ocurrio un error al actualizar el grado',
    //         'ERROR',
    //         0
    //     );
    // })
}

export const eliminar = (id) => (dispatch)=>{
    // console.log("id", id)
    // api.eliminar(`/tarea/${id}`).then((response)=>{
    //     console.log("response eliminar tarea", response)
    //     NotificationManager.success(
    //         'tarea eliminada correctamente',
    //         'Exito',
    //         3000
    //     );
    //     dispatch(listarTareasCurso(response.id));
    // }).catch((error)=>{
    //     console.log("Error: ", error);
    //     NotificationManager.error(
    //         'Ocurrio un error al eliminar el grado',
    //         'ERROR',
    //         0
    //     );
    // })
}

export const obtenerEstudiante = () => (dispatch) => {
    console.log("adentro de getme")
    api.get('/estudiante/getStudent')
        .then((response) => {
            console.log("adentro de getme", response)
            dispatch({type:GUARDAR_REGISTRO_ESTUDIANTE, estudiante:response});
        })
        .catch(() => {})
        .finally(() => {});
};

export const listarMateriales = (idAsignacion) => (dispatch) => {
    console.log("adentro funcion listar materiales", idAsignacion)
    api.get('/material/listar_materiales_curso', {asignacion:idAsignacion}).then((response) => {
        console.log("response materiales", response)
        dispatch({type:GUARDAR_LISTADO_MATERIAL, materiales:response});

    }).catch((error)=>{
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrio un error al listar las tareas',
            'ERROR',
            0
        );
    });
}

export const clearFile=()=>(dispatch)=>{
    dispatch({type:GUARDAR_ARCHIVO, archivo: null})
}

export const actions = {
    registroTarea,
    actualizarTarea,
    listarTareasCurso,
    leer,
    eliminar,
    clearFile,
    obtenerEstudiante,
    listarMateriales,
    trasladoForm,
};

export const reducers = {
    [GUARDAR_LISTADO_TAREA]: (state, { data } )=> {
        return {
            ...state,
            data,
        };
    },
    [GUARDAR_LISTADO_MATERIAL]: (state, { materiales } )=> {
        return {
            ...state,
            materiales,
        };
    },
    [GUARDAR_REGISTRO_TAREA]: (state, { registro } )=> {
        return {
            ...state,
            registro,
        };
    },
    [GUARDAR_ARCHIVO]: (state, { archivo } )=> {
        return {
            ...state,
            archivo,
        };
    },
    [GUARDAR_REGISTRO_ESTUDIANTE]: (state, { estudiante }) => {
        return {
            ...state,
            estudiante,
        };
    },
};

export const initialState = {
    loader: false,
    data: null,
    registro: null,
    archivo: null,
}

export default handleActions(reducers, initialState);
