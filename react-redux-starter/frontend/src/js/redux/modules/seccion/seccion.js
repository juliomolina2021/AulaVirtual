import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";


// ------------------------------------
// Constants
// ------------------------------------

export const { reducers, initialState, actions } = createReducer(
    "secciones",//identificador dentro del estado
    "seccion",//endpoint
    "seccionForm",//formulario
    "/secciones",//ruta a la que ira una vez ejecute las peticiones
);

export default handleActions(reducers, initialState);
