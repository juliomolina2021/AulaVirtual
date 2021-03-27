import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";
import moment from 'moment'

const GUARDAR_LISTADO_TAREA = 'GUARDAR_LISTADO_TAREA';
const GUARDAR_REGISTRO_TAREA = 'GUARDAR_REGISTRO_TAREA';
const GUARDAR_ARCHIVO='GUARDAR_ARCHIVO';

export const listarTareasCurso = (idAsignacion) => (dispatch) => {
    api.get('/tarea/listar_tareas_curso', {asignacion:idAsignacion}).then((response) => {
        console.log("response Listar: ", response);
        dispatch({type:GUARDAR_LISTADO_TAREA, data:response});
    }).catch((error)=>{
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrio un error al listar los grados',
            'ERROR',
            0
        );
    });
}

export const leer = (id) => (dispatch) => {
    console.log("id leer", id)
    api.get(`/tarea/${id}`).then((response)=>{
        console.log("Response leer: ", response);
        //response.nivel = {value: response.nivel.id, label: response.nivel.nombre_nivel};
        dispatch({type: GUARDAR_ARCHIVO, archivo: response.archivo});
        dispatch({type: GUARDAR_REGISTRO_TAREA, registro:response});
        dispatch(initializeForm('tarea', response))
    }).catch((error)=>{
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrio un error al consultar el registro',
            'ERROR',
            0
        );
    });
}

export const registroTarea = (data={}, attachments=[]) => (dispatch, getStore) => {

    console.log("data: ", data)
    console.log("attachments", attachments)
    let fecha= data.fecha_entrega
    data.fecha_entrega = moment(fecha).format('YYYY-MM-DD')

    api.postAttachments("/tarea", data, attachments)
    .then((response)=>{
        NotificationManager.success(
            'Tarea registrada correctamente',
            'Exito',
            3000
        );
        dispatch(push(`/tareasasignacion/${response.asignacion}`))
    }).catch((error)=>{
        console.log("Error: ", error);
        NotificationManager.error(
            `Ocurrio un error al registrar la tarea, ${error.detail}`,
            'ERROR',
            0
        );
    })
}

export const actualizarTarea = (data={}, attachments=[]) => (dispatch, getStore) => {
    console.log("DATA ", data)
    console.log("attachements  ", attachments)
    const id_asignacion=data.asignacion.id;
    data.asignacion= data.asignacion.id;
    api.putAttachments(`/tarea/${data.id}`, data, attachments).then((response)=>{
        NotificationManager.success(
            'Grado actualizado correctamente',
            'Exito',
            3000
        );
        dispatch(push('/cursosprofesor'))
        //dispatch(push(`/tareasasignacion/${id_asignacion}`))
    }).catch((error)=>{
        console.log("Error: ", error);
        NotificationManager.error(
            'Ocurrio un error al actualizar el grado',
            'ERROR',
            0
        );
    })
}

export const eliminar = (id) => (dispatch)=>{
    console.log("id", id)
    api.eliminar(`/tarea/${id}`).then((response)=>{
        console.log("response eliminar tarea", response)
        NotificationManager.success(
            'tarea eliminada correctamente',
            'Exito',
            3000
        );
        dispatch(listarTareasCurso(response.id));
    }).catch((error)=>{
        console.log("Error: ", error);
        NotificationManager.error(
            'Ocurrio un error al eliminar el grado',
            'ERROR',
            0
        );
    })
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
};
export const reducers = {
    [GUARDAR_LISTADO_TAREA]: (state, { data } )=> {
        return {
            ...state,
            data,
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
};

export const initialState = {
    loader: false,
    data: null,
    registro: null,
    archivo: null,
}

export default handleActions(reducers, initialState);
