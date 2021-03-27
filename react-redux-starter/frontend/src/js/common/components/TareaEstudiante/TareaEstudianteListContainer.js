import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/tarea_estudiante/tarea_estudiante';
import TareaEstudianteList from './TareaEstudianteList'

const ms2p = (state)=>{
    return{
        ...state.tarea_estudiante //estado registrado en el root reducers
    };
}

const md2p = { ...actions };

export default connect(ms2p, md2p)(TareaEstudianteList);
