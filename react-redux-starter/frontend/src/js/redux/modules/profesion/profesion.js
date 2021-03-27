import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";


// ------------------------------------
// Constants
// ------------------------------------

export const { reducers, initialState, actions } = createReducer(
    "profesiones",//identificador dentro del estado
    "profesion",//endpoint
    "profesionForm",//formulario
    "/profesiones",//ruta a la que ira una vez ejecute las peticiones
);

export default handleActions(reducers, initialState);
