import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/ciclo/ciclo';
import CicloList from './CicloList'

const ms2p = (state)=>{
    return{
        ...state.ciclos //estado registrado en el root reducers
    };
}

const md2p = { ...actions };

export default connect(ms2p, md2p)(CicloList);
