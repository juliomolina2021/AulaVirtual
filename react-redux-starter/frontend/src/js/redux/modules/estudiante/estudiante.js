import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";

const GUARDAD_LISTADO_ESTUDIANTES = 'GUARDAR_LISTADO_ESTUDIANTES';
const GUARDAR_REGISTRO_ESTUDIANTE = 'GUARDAR_REGISTRO_ESTUDIANTES';
const GUARDAR_REGISTRO_ROL_ESTUDIANTE = 'GUARDAR_REGISTRO_ROL_ESTUDIANTE';

export const listar = () => (dispatch) => {
    api.get('/estudiante').then((response) => {
        dispatch({type:GUARDAD_LISTADO_ESTUDIANTES, data:response});
    }).catch((error)=>{
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrio un error al listar los estudiantes',
            'ERROR',
            0
        );
    });
}

export const leer = (id) => (dispatch) => {
    api.get(`/estudiante/${id}`).then((response)=>{
        response.address = response.profile.address;
        response.phone = response.profile.phone;
        response.first_name = response.profile.user.first_name;
        response.last_name = response.profile.user.last_name;
        response.email = response.profile.user.email;
        response.password = response.profile.user.password;
        dispatch({type: GUARDAR_REGISTRO_ESTUDIANTE, registro:response});
        dispatch(initializeForm('estudiante', response))
    }).catch((error)=>{
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrio un error al consultar el registro',
            'ERROR',
            0
        );
    });
}

export const registroEstudiante = () => (dispatch, getStore) => {
    const data = getStore().form.estudiante.values;
    const formData = {
        //estudiante: {
            carnet: data.carnet,
            encargado: data.encargado,
            telefono_encargado: data.telefono_encargado,
            profile: {
                address: data.address,
                phone: data.phone,
                rol:data.id_rol,
                user:{
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email,
                    password: data.password
                }
            }
        //}
    }
    api.post('/estudiante', formData).then((response)=>{
        NotificationManager.success(
            'Estudiante registrado correctamente',
            'Exito',
            3000
        );
        dispatch(push('/estudiantes'))
    }).catch((error)=>{
        console.log("Error: ", error);
        NotificationManager.error(
            `Ocurrio un error al registrar al estudiante, ${error.detail}`,
            'ERROR',
            0
        );
    })
}

export const actualizarEstudiante = () => (dispatch, getStore) => {
    const formData = getStore().form.estudiante.values;
    const id = formData.id;
    api.put(`/estudiante/${id}`, formData).then((response)=>{

        NotificationManager.success(
            'Estudiante actualizado correctamente',
            'Exito',
            3000
        );
        dispatch(push('/estudiantes'))
    }).catch((error)=>{
        console.log("Error: ", error);
        NotificationManager.error(
            'Ocurrio un error al actualizar al estudiante',
            'ERROR',
            0
        );
    })
}

export const eliminar = (id) => (dispatch)=>{
    api.eliminar(`/estudiante/${id}`).then((response)=>{
        NotificationManager.success(
            'Estudiante eliminado correctamente',
            'Exito',
            3000
        );
        dispatch(listar());
    }).catch((error)=>{
        console.log("Error: ", error);
        NotificationManager.error(
            'Ocurrio un error al eliminar al estudiante',
            'ERROR',
            0
        );
    })
}

export const obtenerRolEstudiante = () =>(dispatch)=>{
    return api.get("/rol").then(response=>{
        if(response){
            let rolEstudiante="";
            response.results.forEach(rol=>{
                const nombre= (rol.nombre_rol).toUpperCase();
                if((nombre=="ESTUDIANTE")||(nombre=="ALUMNO")){
                    rolEstudiante = rol.id
                    //rolProfesor.nombre_rol= rol.nombre_rol
                }
            })
            dispatch({type: GUARDAR_REGISTRO_ROL_ESTUDIANTE, rol:rolEstudiante});
        }
    }).catch(error=>{
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrio un error al obtner profesor',
            'ERROR',
            0
        );
    })
}

export const actions = {
    registroEstudiante,
    actualizarEstudiante,
    listar,
    leer,
    eliminar,
    obtenerRolEstudiante,
};
export const reducers = {
    [GUARDAD_LISTADO_ESTUDIANTES]: (state, { data } )=> {
        return {
            ...state,
            data,
        };
    },
    [GUARDAR_REGISTRO_ESTUDIANTE]: (state, { registro } )=> {
        return {
            ...state,
            registro,
        };
    },
    [GUARDAR_REGISTRO_ROL_ESTUDIANTE]: (state, { rol } )=> {
        return {
            ...state,
            rol,
        };
    },
};

export const initialState = {
    loader: false,
    data: null,
    registro: null,
    rol: null,
}

export default handleActions(reducers, initialState);
