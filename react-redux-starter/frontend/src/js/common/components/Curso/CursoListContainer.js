import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/curso/curso';
import CursoList from './CursoList'

const ms2p = (state)=>{
    return{
        ...state.cursos //estado registrado en el root reducers
    };
}

const md2p = { ...actions };

export default connect(ms2p, md2p)(CursoList);
