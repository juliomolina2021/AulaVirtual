import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";

const GUARDAR_LISTADO_PROFESORES = 'GUARDAR_LISTADO_PROFESORES';
const GUARDAR_REGISTRO_PROFESOR = 'GUARDAR_REGISTRO_PROFESOR';
const GUARDAR_REGISTRO_ROL_PROFESOR='GUARDAR_REGISTRO_ROL_PROFESOR'

export const listar = () => (dispatch) => {
    api.get('/profesor').then((response) => {
        dispatch({type:GUARDAR_LISTADO_PROFESORES, data:response});
    }).catch((error)=>{
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrio un error al listar los profesores',
            'ERROR',
            0
        );
    });
}

export const leer = (id) => (dispatch) => {
    api.get(`/profesor/${id}`).then((response)=>{
        response.address = response.perfil_profesor.address;
        response.phone = response.perfil_profesor.phone;
        response.first_name = response.perfil_profesor.user.first_name;
        response.last_name = response.perfil_profesor.user.last_name;
        response.email = response.perfil_profesor.user.email;
        response.password = response.perfil_profesor.user.password;
        response.profesion = {value: response.profesion.id, label: response.profesion.nombre_profesion};
        dispatch({type: GUARDAR_REGISTRO_PROFESOR, registro:response});
        dispatch(initializeForm('profesor', response))
    }).catch((error)=>{
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrio un error al consultar el registro',
            'ERROR',
            0
        );
    });
}

export const registroProfesor = () => (dispatch, getStore) => {
    const data = getStore().form.profesor.values;
    const formData = {
        profesion: data.profesion.value,
        perfil_profesor: {
            address: data.address,
            phone: data.phone,
            rol:data.id_rol,
            user:{
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                password: data.password
            },
        }
    }
    api.post('/profesor', formData).then((response)=>{
        NotificationManager.success(
            'Profesor registrado correctamente',
            'Exito',
            3000
        );
        dispatch(push('/profesores'))
    }).catch((error)=>{
        console.log("Error: ", error);
        NotificationManager.error(
            'Ocurrio un error al registrar al profesor',
            'ERROR',
            0
        );
    })
}

export const actualizarProfesor = () => (dispatch, getStore) => {
    const data = getStore().form.profesor.values;
    const id = data.id;
    data.profesion= data.profesion.value
    api.put(`/profesor/${id}`, data).then((response)=>{
        NotificationManager.success(
            'Profesor actualizado correctamente',
            'Exito',
            3000
        );
        dispatch(push('/profesores'))
    }).catch((error)=>{
        console.log("Error: ", error);
        NotificationManager.error(
            'Ocurrio un error al actualizar al profesor',
            'ERROR',
            0
        );
    })
}

export const eliminar = (id) => (dispatch)=>{
    api.eliminar(`/profesor/${id}`).then((response)=>{
        NotificationManager.success(
            'Profesor eliminado correctamente',
            'Exito',
            3000
        );
        dispatch(listar());
    }).catch((error)=>{
        console.log("Error: ", error);
        NotificationManager.error(
            'Ocurrio un error al eliminar al profesor',
            'ERROR',
            0
        );
    })
}
export const obtenerRolProfesor = () =>(dispatch)=>{
    return api.get("/rol").then(response=>{
        if(response){
            let rolProfesor="";
            response.results.forEach(rol=>{
                const nombre= (rol.nombre_rol).toUpperCase();
                if((nombre=="CATEDRATICO")||(nombre=="PROFESOR")){
                    rolProfesor = rol.id
                }
            })
            dispatch({type: GUARDAR_REGISTRO_ROL_PROFESOR, rol:rolProfesor});
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
    registroProfesor,
    actualizarProfesor,
    listar,
    leer,
    eliminar,
    obtenerRolProfesor,
};
export const reducers = {
    [GUARDAR_LISTADO_PROFESORES]: (state, { data } )=> {
        return {
            ...state,
            data,
        };
    },
    [GUARDAR_REGISTRO_PROFESOR]: (state, { registro } )=> {
        return {
            ...state,
            registro,
        };
    },
    [GUARDAR_REGISTRO_ROL_PROFESOR]: (state, { rol } )=> {
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
    rol:null,
}

export default handleActions(reducers, initialState);
