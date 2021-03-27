import React, {Component} from 'react';
import Formulario from './Formulario';

class TareaCalificacion extends Component{
    state={
        crear: true,
        archivo:null,
        archivo_tarea:null,
    }

    componentWillMount = () => {
        const {leerTarea, match} = this.props;
        const id = match.params.idtareaestudiante;
        if(id) {
            //this.setState({crear: false});
            leerTarea(id);
        }
    }
    setArchivo=(archivo)=>{
        this.setState({archivo});
    }
    setArchivoTarea=(archivo_tarea)=>{
        this.setState({archivo_tarea});
    }
    render(){

        const {archivo,clearFile, enviarCalificacion, archivo_tarea } = this.props;
        const { crear } = this.state;
        const funcionEnvio = enviarCalificacion;//? registroEstudiante : actualizarEstudiante;
        return(
            <React.Fragment>
                <Formulario
                    crear= {crear}
                    onSubmit={funcionEnvio}
                    setArchivo={this.setArchivo}
                    archivo={archivo}
                    clearFile={clearFile}
                    setArchivoTarea={this.setArchivoTarea}
                    archivo_tarea={archivo_tarea}
                    />
            </React.Fragment>

        );
    }
}
export default TareaCalificacion;
