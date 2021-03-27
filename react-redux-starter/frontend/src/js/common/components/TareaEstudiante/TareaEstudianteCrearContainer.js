import {connect} from 'react-redux';
import {actions} from '../../../redux/modules/tarea_estudiante/tarea_estudiante';
import TareaEstudianteCrear from './TareaEstudianteCrear'

const ms2p = (state)=>{
    return{
        ...state.tarea_estudiante
    };
}

const md2p = { ...actions };

export default connect(ms2p, md2p)(TareaEstudianteCrear);
