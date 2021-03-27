import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/profesor/profesor';
import ProfesorList from './ProfesorList'

const ms2p = (state)=>{
    return{
        ...state.profesor //estado registrado en el root reducers
    };
}

const md2p = { ...actions };

export default connect(ms2p, md2p)(ProfesorList);
