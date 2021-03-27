import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/tarea/tarea';
import TareaList from './TareaList'

const ms2p = (state)=>{
    return{
        ...state.tarea //estado registrado en el root reducers
    };
}

const md2p = { ...actions };

export default connect(ms2p, md2p)(TareaList);
