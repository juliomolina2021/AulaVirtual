import React, {Component} from 'react';
import Formulario from './Formulario';

class Evento extends Component{
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
        const { registroEvento, actualizarEvento } = this.props;
        const { creacion } = this.state;

        const funcionEnvio = creacion ? registroEvento : actualizarEvento;

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
export default Evento;
