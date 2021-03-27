import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/nivel/nivel';
import NivelList from './NivelList'

const ms2p = (state)=>{
    return{
        ...state.niveles //estado registrado en el root reducers
    };
}

const md2p = { ...actions };

export default connect(ms2p, md2p)(NivelList);
