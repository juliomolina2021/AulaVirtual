import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/cursos_profesor/cursos_profesor';
import CursosProfesorCrear from './CursosProfesorCrear'

const ms2p = (state)=>{
    return{
        ...state.cursos_profesor //estado registrado en el root reducers
    };
}

const md2p = { ...actions };

export default connect(ms2p, md2p)(CursosProfesorCrear);
