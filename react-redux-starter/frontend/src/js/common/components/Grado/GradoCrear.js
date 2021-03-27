import React, {Component} from 'react';
import Formulario from './Formulario';

class Grado extends Component{
    state={
        creacion: true,
    }

    componentWillMount = () => {
        const {leer, match} = this.props;
        const id = match.params.id;
        if(id) {
            this.setState({creacion: false});
            leer(id);
        }
    }

    render(){
        const { registroGrado, actualizarGrado } = this.props;
        const { creacion } = this.state;

        const funcionEnvio = creacion ? registroGrado : actualizarGrado;

        return(
            <React.Fragment>
                <Formulario
                    crear= {creacion}
                    onSubmit={funcionEnvio}
                    />
            </React.Fragment>

        );
    }
}
export default Grado;
