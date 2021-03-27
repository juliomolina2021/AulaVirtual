import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";
import moment from 'moment'

const GUARDAR_LISTADO_TAREA_RECIBIDAS = 'GUARDAR_LISTADO_TAREA_RECIBIDAS';
const GUARDAR_ARCHIVO='GUARDAR_ARCHIVO';
const GUARDAR_REGISTRO_TAREA_RECIBIDA = 'GUARDAR_REGISTRO_TAREA_RECIBIDA';
const GUARDAR_TAREA_PROFESOR = 'GUARDAR_TAREA_PROFESOR';

export const listarTareasRecibidas = (idAsignacion) => (dispatch) => {
    api.get('/tarea_estudiante/listar_tareas_recibidas', {asignacion:idAsignacion})
    .then((response) => {
        console.log("Response en listar tareas recibidassss", response)
        dispatch({type:GUARDAR_LISTADO_TAREA_RECIBIDAS, tareas:response});
    })
    .catch((error)=>{
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrio un error al listar las tareas recibidas',
            'ERROR',
            0
        );
    });
}

export const leerTarea = (id) => (dispatch) => {
    api.get(`/tarea_estudiante/${id}`).then((response)=>{
        response.fecha_entrega= moment(response.fecha_entrega).format('DD-MM-YYYY, hh:mm a')
        dispatch({type: GUARDAR_ARCHIVO, archivo: response.archivo});
        dispatch({type: GUARDAR_TAREA_PROFESOR, archivo_tarea: response.tarea.archivo});
        dispatch({type: GUARDAR_REGISTRO_TAREA_RECIBIDA, registro:response});
        dispatch(initializeForm('tarea_calificacion', response))
    }).catch((error)=>{
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrio un error al consultar el registro',
            'ERROR',
            0
        );
    });
}

export const enviarCalificacion = (/*data={}, attachments=[]*/) => (dispatch, getStore) => {
    const data = getStore().form.tarea_calificacion.values;
    const formData={
        tarea_estudiante: data.id,
        calificacion: data.calificacion
    }
    api.post(`/tarea_estudiante/set_calificacion`,formData).then((response)=>{
        NotificationManager.success(
            'Calificacion ingresada correctamente',
            'Exito',
            3000
        );
        dispatch(push(`/calificaciones/${data.tarea.asignacion.id}`))
        //dispatch(push(`/tareasasignacion/${id_asignacion}`))
    }).catch((error)=>{
        console.log("Error: ", error);
        NotificationManager.error(
            `Ocurrio un error al ingresar la calificacion: ${error.detail}`,
            'ERROR',
            0
        );
    })

}

export const clearFile=()=>(dispatch)=>{
    dispatch({type:GUARDAR_ARCHIVO, archivo: null})
}

export const actions = {
    listarTareasRecibidas,
    leerTarea,
    clearFile,
    enviarCalificacion,
};

export const reducers = {
    [GUARDAR_LISTADO_TAREA_RECIBIDAS]: (state, { tareas } )=> {
        return {
            ...state,
            tareas,
        };
    },
    [GUARDAR_ARCHIVO]: (state, { archivo } )=> {
        return {
            ...state,
            archivo,
        };
    },
    [GUARDAR_TAREA_PROFESOR]: (state, { archivo_tarea } )=> {
        return {
            ...state,
            archivo_tarea,
        };
    },
    [GUARDAR_REGISTRO_TAREA_RECIBIDA]: (state, { registro } )=> {
        return {
            ...state,
            registro,
        };
    },
};

export const initialState = {
    loader: false,
    data: null,
    tareas:null,
    archivo: null,
    registro: null,
    archivo_tarea:null,
}

export default handleActions(reducers, initialState);
