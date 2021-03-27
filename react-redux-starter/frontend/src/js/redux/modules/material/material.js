import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";


const GUARDAR_LISTADO_MATERIAL = 'GUARDAR_LISTADO_MATERIAL';
const GUARDAR_REGISTRO_MATERIAL = 'GUARDAR_REGISTRO_MATERIAL';
const GUARDAR_ARCHIVO='GUARDAR_ARCHIVO';

export const listarMaterialesCurso = (idAsignacion) => (dispatch) => {
    api.get('/material/listar_materiales_curso', {asignacion:idAsignacion}).then((response) => {
        console.log("response Listar: ", response);
        dispatch({type:GUARDAR_LISTADO_MATERIAL, data:response});
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
    api.get(`/material/${id}`).then((response)=>{
        console.log("Response leer: ", response);
        //response.nivel = {value: response.nivel.id, label: response.nivel.nombre_nivel};
        dispatch({type: GUARDAR_ARCHIVO, archivo: response.archivo});
        dispatch({type: GUARDAR_REGISTRO_MATERIAL, registro:response});
        dispatch(initializeForm('material', response))
    }).catch((error)=>{
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrio un error al consultar el registro',
            'ERROR',
            0
        );
    });
}

export const registroMaterial = (data={}, attachments=[]) => (dispatch, getStore) => {

    console.log("data: ", data)
    console.log("attachments", attachments)

    api.postAttachments("/material", data, attachments)
    .then((response)=>{
        NotificationManager.success(
            'Material registrado correctamente',
            'Exito',
            3000
        );
        dispatch(push(`/materialesasignacion/${response.asignacion}`))
    }).catch((error)=>{
        console.log("Error: ", error);
        NotificationManager.error(
            'Ocurrio un error al registrar al grado',
            'ERROR',
            0
        );
    })
}

export const actualizarMaterial = (data={}, attachments=[]) => (dispatch, getStore) => {
    console.log("DATA ", data)
    console.log("attachements  ", attachments)
    data.asignacion= data.asignacion.id;
    api.putAttachments(`/material/${data.id}`, data, attachments).then((response)=>{
        NotificationManager.success(
            'Material actualizado correctamente',
            'Exito',
            3000
        );
        dispatch(push(`/materialesasignacion/${response.asignacion}`))
        //dispatch(push(`/materialesasignacion/${id_asignacion}`))
    }).catch((error)=>{
        console.log("Error: ", error);
        NotificationManager.error(
            'Ocurrio un error al actualizar el material',
            'ERROR',
            0
        );
    })
}

export const eliminar = (id) => (dispatch)=>{
    console.log("id", id)
    api.eliminar(`/material/${id}`).then((response)=>{
        console.log("response eliminar material", response)
        NotificationManager.success(
            'Material eliminado correctamente',
            'Exito',
            3000
        );
        dispatch(listarMaterialesCurso(response.id));
    }).catch((error)=>{
        console.log("Error: ", error);
        NotificationManager.error(
            'Ocurrio un error al eliminar el material',
            'ERROR',
            0
        );
    })
}

export const clearFile=()=>(dispatch)=>{
    dispatch({type:GUARDAR_ARCHIVO, archivo: null})
}

export const actions = {
    registroMaterial,
    actualizarMaterial,
    listarMaterialesCurso,
    leer,
    eliminar,
    clearFile,
};
export const reducers = {
    [GUARDAR_LISTADO_MATERIAL]: (state, { data } )=> {
        return {
            ...state,
            data,
        };
    },
    [GUARDAR_REGISTRO_MATERIAL]: (state, { registro } )=> {
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
