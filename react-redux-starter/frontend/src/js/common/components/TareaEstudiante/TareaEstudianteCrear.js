import React, {Component} from 'react';
import { matchPath } from 'react-router';
import asignacion from '../../../redux/modules/asignacion/asignacion';
import Formulario from './Formulario';


class Tarea extends Component{
    state={
        creacion: true,
        archivo: null,
    }

    componentWillMount = () => {
        console.log("props en tarea estudiante crear", this.props);
        const{obtenerEstudiante}=this.props;

        obtenerEstudiante();
        this.setState({creacion: true});
    }

    setArchivo=(archivo)=>{
        this.setState({archivo});
    }

    registro =(data)=>{
        const {registroTarea, archivo}= this.props;
        registroTarea({...data, archivo:null}, [{file: this.state.archivo, name:'archivo'}, ])
    }

    actualizar =(data)=>{
        const {actualizarTarea, archivo}= this.props;
        actualizarTarea({...data, archivo:null}, [{file: this.state.archivo, name:'archivo'}, ])
    }

    render(){
        const { match, archivo, clearFile, estudiante, data } = this.props;
        console.log("props tarea estudiante crear", this.props)
        const idtarea=match.params.idtarea;

        const idestudiante = estudiante.id;
        //const idtarea = match.params.idtareaestudiante;
        const { creacion } = this.state;

        const funcionEnvio = creacion ? this.registro: this.actualizar;

        return(
            <React.Fragment>
                <Formulario
                    crear= {creacion}
                    onSubmit={funcionEnvio}
                    setArchivo={this.setArchivo}
                    archivo={archivo}
                    clearFile={clearFile}
                    initialValues={{estudiante: idestudiante, tarea:idtarea}}
                    />

            </React.Fragment>

        );
    }
}
export default Tarea;
