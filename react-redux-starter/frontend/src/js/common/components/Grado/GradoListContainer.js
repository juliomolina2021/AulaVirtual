import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/grado/grado';
import GradoList from './GradoList'

const ms2p = (state)=>{
    return{
        ...state.grado //estado registrado en el root reducers
    };
}

const md2p = { ...actions };

export default connect(ms2p, md2p)(GradoList);
