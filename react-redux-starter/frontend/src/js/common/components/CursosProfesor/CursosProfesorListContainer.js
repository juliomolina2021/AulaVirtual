import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/cursos_profesor/cursos_profesor';
import CursosProfesorList from './CursosProfesorList'

const ms2p = (state)=>{
    return{
        ...state.cursos_profesor //estado registrado en el root reducers
    };
}

const md2p = { ...actions };

export default connect(ms2p, md2p)(CursosProfesorList);
