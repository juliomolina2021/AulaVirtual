import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";


// ------------------------------------
// Constants
// ------------------------------------

export const { reducers, initialState, actions } = createReducer(
    "cursos",//identificador dentro del estado
    "curso",//endpoint
    "cursoForm",//formulario
    "/cursos",//ruta a la que ira una vez ejecute las peticiones
);

export default handleActions(reducers, initialState);
