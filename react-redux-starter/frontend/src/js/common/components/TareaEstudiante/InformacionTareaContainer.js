import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/tarea_estudiante/tarea_estudiante';
import InformacionTarea from './InformaciontTarea'

const ms2p = (state)=>{
    return{
        ...state.tarea_estudiante //estado registrado en el root reducers
    };
}

const md2p = { ...actions };

export default connect(ms2p, md2p)(InformacionTarea);
