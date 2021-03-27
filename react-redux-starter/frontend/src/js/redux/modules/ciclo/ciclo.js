import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";


// ------------------------------------
// Constants
// ------------------------------------

export const { reducers, initialState, actions } = createReducer(
    "ciclos",//identificador dentro del estado
    "ciclo",//endpoint
    "cicloForm",//formulario
    "/ciclos",//ruta a la que ira una vez ejecute las peticiones
);

export default handleActions(reducers, initialState);
