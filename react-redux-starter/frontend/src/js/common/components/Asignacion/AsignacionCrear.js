import React, {Component} from 'react';
import Formulario from './Formulario';

class Asignacion extends Component{
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
        const { registroAsignacion, actualizarAsignacion } = this.props;

        const { creacion } = this.state;

        const funcionEnvio = creacion ? registroAsignacion : actualizarAsignacion;

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
export default Asignacion;
