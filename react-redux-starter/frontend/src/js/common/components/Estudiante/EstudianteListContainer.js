import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/estudiante/estudiante';
import EstudianteList from './EstudianteList'

const ms2p = (state)=>{
    return{
        ...state.estudiante //estado registrado en el root reducers
    };
}

const md2p = { ...actions };

export default connect(ms2p, md2p)(EstudianteList);
