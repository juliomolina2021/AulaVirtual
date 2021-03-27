import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";
import moment from 'moment'

const GUARDAR_LISTADO_EVENTOS = 'GUARDAR_LISTADO_EVENTOS';
const GUARDAR_REGISTRO_EVENTO = 'GUARDAR_REGISTRO_EVENTO';

export const listar = () => (dispatch) => {
    api.get('/evento').then((response) => {
        dispatch({type:GUARDAR_LISTADO_EVENTOS, data:response});
    }).catch((error)=>{
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrio un error al listar los Eventos',
            'ERROR',
            0
        );
    });
}

export const leer = (id) => (dispatch) => {
    api.get(`/evento/${id}`).then((response)=>{
        dispatch({type: GUARDAR_REGISTRO_EVENTO, registro:response});
        dispatch(initializeForm('evento', response))
    }).catch((error)=>{
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrio un error al consultar el registro',
            'ERROR',
            0
        );
    });
}

export const registroEvento = (data) => (dispatch) => {
    const formData = {
        nombre_evento: data.nombre_evento,
        descripcion: data.descripcion,
        fecha_evento: moment(data.fecha_evento).format('YYYY-MM-DD'),
        hora_evento: data.hora_evento,
    }
    api.post('/evento', formData)
    .then(()=>{
        NotificationManager.success(
            'Evento registrado correctamente',
            'Exito',
            3000
        );
        dispatch(push('/eventos'))
    }).catch((error)=>{
        console.log("Error: ", error);
        NotificationManager.error(
            'Ocurrio un error al registrar el evento',
            'ERROR',
            0
        );
    })
}

export const actualizarEvento = () => (dispatch, getStore) => {
    const data = getStore().form.grado.values;
    const id = data.id;

    const formData = {
        nombre_evento: data.nombre,
        descripcion: data.descripcion,
        fecha_evento: data.fecha_evento,
        hora_evento: data.hora_evento,
    }
    api.put(`/evento/${id}`, formData).then((response)=>{
        NotificationManager.success(
            'Evento actualizado correctamente',
            'Exito',
            3000
        );
        dispatch(push('/eventos'))
    }).catch((error)=>{
        console.log("Error: ", error);
        NotificationManager.error(
            'Ocurrio un error al actualizar el evento',
            'ERROR',
            0
        );
    })
}

export const eliminar = (id) => (dispatch)=>{
    api.eliminar(`/evento/${id}`).then((response)=>{
        NotificationManager.success(
            'Evento eliminado correctamente',
            'Exito',
            3000
        );
        dispatch(listar());
    }).catch((error)=>{
        console.log("Error: ", error);
        NotificationManager.error(
            'Ocurrio un error al eliminar el evento',
            'ERROR',
            0
        );
    })
}
export const actions = {
    registroEvento,
    actualizarEvento,
    listar,
    leer,
    eliminar,
};
export const reducers = {
    [GUARDAR_LISTADO_EVENTOS]: (state, { data } )=> {
        return {
            ...state,
            data,
        };
    },
    [GUARDAR_REGISTRO_EVENTO]: (state, { registro } )=> {
        return {
            ...state,
            registro,
        };
    },
};

export const initialState = {
    loader: false,
    data: null,
    registro: null,
}

export default handleActions(reducers, initialState);
