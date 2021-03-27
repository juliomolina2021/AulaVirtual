import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/material/material';
import MaterialList from './MaterialList'

const ms2p = (state)=>{
    return{
        ...state.material //estado registrado en el root reducers
    };
}

const md2p = { ...actions };

export default connect(ms2p, md2p)(MaterialList);
