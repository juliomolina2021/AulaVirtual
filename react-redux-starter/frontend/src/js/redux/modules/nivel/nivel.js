import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";


// ------------------------------------
// Constants
// ------------------------------------

export const { reducers, initialState, actions } = createReducer(
    "niveles",//identificador dentro del estado
    "nivel",//endpoint
    "nivelForm",//formulario
    "/niveles",//ruta a la que ira una vez ejecute las peticiones
);

export default handleActions(reducers, initialState);
