import {connect} from 'react-redux';
import {actions} from '../../../redux/modules/material/material';
import MaterialCrear from './MaterialCrear'

const ms2p = (state)=>{
    return{
        ...state.material
    };
}

const md2p = { ...actions };

export default connect(ms2p, md2p)(MaterialCrear);
