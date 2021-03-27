import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";


// ------------------------------------
// Constants
// ------------------------------------

export const { reducers, initialState, actions } = createReducer(
    "roles",//identificador dentro del estado
    "rol",//endpoint
    "rolForm",//formulario
    "/roles",//ruta a la que ira una vez ejecute las peticiones
);

export default handleActions(reducers, initialState);
