import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/rol/rol';
import RolList from './RolList'

const ms2p = (state)=>{
    return{
        ...state.roles //estado registrado en el root reducers
    };
}

const md2p = { ...actions };

export default connect(ms2p, md2p)(RolList);
