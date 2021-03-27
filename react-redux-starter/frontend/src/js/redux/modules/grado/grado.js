import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";


const GUARDAD_LISTADO_GRADO = 'GUARDAR_LISTADO_GRADO';
const GUARDAR_REGISTRO_GRADO = 'GUARDAR_REGISTRO_GRADO';

export const listar = () => (dispatch) => {
    api.get('/grado').then((response) => {
        dispatch({type:GUARDAD_LISTADO_GRADO, data:response});
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
    api.get(`/grado/${id}`).then((response)=>{
        response.nivel = {value: response.nivel.id, label: response.nivel.nombre_nivel};

        dispatch({type: GUARDAR_REGISTRO_GRADO, registro:response});
        dispatch(initializeForm('grado', response))
    }).catch((error)=>{
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrio un error al consultar el registro',
            'ERROR',
            0
        );
    });
}

export const registroGrado = (data) => (dispatch) => {

    const formData = {
        nivel: data.nivel.value,
        nombre: data.nombre
    }
    api.post('/grado', formData)
    .then(()=>{
        NotificationManager.success(
            'Grado registrado correctamente',
            'Exito',
            3000
        );
        dispatch(push('/grados'))
    }).catch((error)=>{
        console.log("Error: ", error);
        NotificationManager.error(
            'Ocurrio un error al registrar al grado',
            'ERROR',
            0
        );
    })
}

export const actualizarGrado = () => (dispatch, getStore) => {
    const data = getStore().form.grado.values;
    const id = data.id;
    const formData = {
        nivel: data.nivel.value,
        nombre: data.nombre,
        descripcion: data.descripcion
    }
    api.put(`/grado/${id}`, formData).then((response)=>{
        NotificationManager.success(
            'Grado actualizado correctamente',
            'Exito',
            3000
        );
        dispatch(push('/grados'))
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
    api.eliminar(`/grado/${id}`).then((response)=>{
        NotificationManager.success(
            'Grado eliminado correctamente',
            'Exito',
            3000
        );
        dispatch(listar());
    }).catch((error)=>{
        console.log("Error: ", error);
        NotificationManager.error(
            'Ocurrio un error al eliminar el grado',
            'ERROR',
            0
        );
    })
}
export const actions = {
    registroGrado,
    actualizarGrado,
    listar,
    leer,
    eliminar,
};
export const reducers = {
    [GUARDAD_LISTADO_GRADO]: (state, { data } )=> {
        return {
            ...state,
            data,
        };
    },
    [GUARDAR_REGISTRO_GRADO]: (state, { registro } )=> {
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
