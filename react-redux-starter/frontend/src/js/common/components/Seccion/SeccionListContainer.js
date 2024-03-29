import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/seccion/seccion';
import SeccionList from './SeccionList'

const ms2p = (state)=>{
    return{
        ...state.secciones //estado registrado en el root reducers
    };
}

const md2p = { ...actions };

export default connect(ms2p, md2p)(SeccionList);
