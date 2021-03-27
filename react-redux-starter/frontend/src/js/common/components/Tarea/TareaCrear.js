import React, {Component} from 'react';
import asignacion from '../../../redux/modules/asignacion/asignacion';
import Formulario from './Formulario';

class Tarea extends Component{
    state={
        creacion: true,
        archivo: null,
    }

    componentWillMount = () => {
        const {leer, match} = this.props;
        // const id = match.params.idasignacion;
        // const path = match.path;
        // const isCrear=path.includes("crear")
        if(match.params.id) {
            this.setState({creacion: false});
            leer(match.params.id);
        }
        if(match.params.idasignacion){

            this.setState({creacion: true})
        }
        // if(!isCrear) {
        //     this.setState({creacion: false});
        //     leer(id);
        // }

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
        const { match, archivo, clearFile} = this.props;
        const idasignacion = match.params.idasignacion;
        const { creacion } = this.state;

        const funcionEnvio = creacion ? this.registro: this.actualizar;

        return(
            <React.Fragment>
                <Formulario
                    crear= {creacion}
                    onSubmit={funcionEnvio}
                    setArchivo={this.setArchivo}
                    initialValues={{asignacion: idasignacion}}
                    archivo={archivo}
                    clearFile={clearFile}
                    />
            </React.Fragment>

        );
    }
}
export default Tarea;
