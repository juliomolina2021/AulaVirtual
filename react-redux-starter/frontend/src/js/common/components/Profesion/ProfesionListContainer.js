import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/profesion/profesion';
import ProfesionList from './ProfesionList'

const ms2p = (state)=>{
    return{
        ...state.profesiones //estado registrado en el root reducers
    };
}

const md2p = { ...actions };

export default connect(ms2p, md2p)(ProfesionList);
