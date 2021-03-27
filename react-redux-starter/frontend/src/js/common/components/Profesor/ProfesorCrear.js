import React, {Component} from 'react';
import { obtenerRolProfesor } from '../../../redux/modules/profesor/profesor';
import Formulario from './Formulario';

class Profesor extends Component{
    state={
        crear: true,
    }

    componentWillMount = () => {
        const {leer, match, obtenerRolProfesor} = this.props;
        obtenerRolProfesor();
        const id = match.params.id;

        if(id) {
            this.setState({crear: false});
            leer(id);
        }
    }
    render(){
        const { registroProfesor, actualizarProfesor, rol } = this.props;
        const { crear } = this.state;

        const funcionEnvio = crear ? registroProfesor : actualizarProfesor;
        return(
            <React.Fragment>
                <Formulario
                    crear= {crear}
                    onSubmit={funcionEnvio}
                    initialValues={{id_rol: rol,}}
                    />
            </React.Fragment>

        );
    }
}
export default Profesor;
