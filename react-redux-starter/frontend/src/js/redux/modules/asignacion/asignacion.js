import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";


const GUARDAD_LISTADO_ASIGNACION = 'GUARDAR_LISTADO_ASIGNACION';
const GUARDAR_REGISTRO_ASIGNACION = 'GUARDAR_REGISTRO_ASIGNACION';

export const listar = () => (dispatch) => {
    api.get('/asignacion').then((response) => {
        dispatch({type:GUARDAD_LISTADO_ASIGNACION, data:response});
    }).catch((error)=>{
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrio un error al listar los asignacion',
            'ERROR',
            0
        );
    });
}

export const leer = (id) => (dispatch) => {
    api.get(`/asignacion/${id}`).then((response)=>{
        response.grado = {value: response.grado.id, label: response.grado.nombre};
        response.seccion = {value: response.seccion.id, label: response.seccion.nombre};
        response.curso = {value: response.curso.id, label: response.curso.nombre};
        response.profesor = {value: response.profesor.id, label: response.profesor.perfil_profesor.user.first_name};

        dispatch({type: GUARDAR_REGISTRO_ASIGNACION, registro:response});
        dispatch(initializeForm('asignacion', response))
    }).catch((error)=>{
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrio un error al consultar el registro',
            'ERROR',
            0
        );
    });
}

export const registroAsignacion = (data) => (dispatch) => {
    const formData = {
        curso: data.curso.value,
        descripcion: data.descripcion,
        profesor: data.profesor.value,
        seccion: data.seccion.value,
        grado: data.grado.value,
    }
    api.post('/asignacion', formData)
    .then(()=>{
        NotificationManager.success(
            'Asigacion registrada correctamente',
            'Exito',
            3000
        );
        dispatch(push('/asignaciones'))
    }).catch((error)=>{
        console.log("Error: ", error);
        NotificationManager.error(
            'Ocurrio un error al registrar al grado',
            'ERROR',
            0
        );
    })
}

export const actualizarAsignacion = () => (dispatch, getStore) => {
    const data = getStore().form.asignacion.values;
    const id = data.id;

    const formData = {
        curso: data.curso.value,
        descripcion: data.descripcion,
        profesor: data.profesor.value,
        seccion: data.seccion.value,
        grado: data.grado.value,
    }
    api.put(`/asignacion/${id}`, formData).then((response)=>{
        NotificationManager.success(
            'Grado actualizado correctamente',
            'Exito',
            3000
        );
        dispatch(push('/asignaciones'))
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
    api.eliminar(`/asignacion/${id}`).then((response)=>{
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
    registroAsignacion,
    actualizarAsignacion,
    listar,
    leer,
    eliminar,
};
export const reducers = {
    [GUARDAD_LISTADO_ASIGNACION]: (state, { data } )=> {
        return {
            ...state,
            data,
        };
    },
    [GUARDAR_REGISTRO_ASIGNACION]: (state, { registro } )=> {
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
