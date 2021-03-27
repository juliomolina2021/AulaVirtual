import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/cursos_estudiante/cursos_estudiante';
import CursosEstudianteList from './CursosEstudianteList'

const ms2p = (state)=>{
    return{
        ...state.cursos_estudiante //estado registrado en el root reducers
    };
}

const md2p = { ...actions };

export default connect(ms2p, md2p)(CursosEstudianteList);
