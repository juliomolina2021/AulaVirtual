import React, {Component} from 'react';
import Formulario from './Formulario';

class Estudiante extends Component{
    state={
        crear: true,
    }

    componentWillMount = () => {
        const {leer, match, obtenerRolEstudiante} = this.props;
        const id = match.params.id;
        obtenerRolEstudiante();
        if(id) {
            this.setState({crear: false});
            leer(id);
        }
    }
    render(){

        const { registroEstudiante, actualizarEstudiante, rol } = this.props;
        const { crear } = this.state;
        const funcionEnvio = crear ? registroEstudiante : actualizarEstudiante;
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
export default Estudiante;
