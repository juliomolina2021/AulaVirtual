import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/tarea_calificacion/tarea_calificacion';
import TareaCalificacionCrear from './TareaCalificacionCrear'

const ms2p = (state)=>{
    return{
        ...state.tarea_calificacion //estado registrado en el root reducers
    };
}

const md2p = { ...actions };

export default connect(ms2p, md2p)(TareaCalificacionCrear);
