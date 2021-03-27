import React, {Component} from 'react';
import asignacion from '../../../redux/modules/asignacion/asignacion';
import Formulario from './Formulario';

class Material extends Component{
    state={
        creacion: true,
        archivo: null,
    }

    componentWillMount = () => {
        const {leer, match} = this.props;
        console.log("match crear", match)
        if(match.params.id) {
            this.setState({creacion: false});
            leer(match.params.id);
        }
        if(match.params.idasignacion){
            this.setState({creacion: true})
        }
    }

    setArchivo=(archivo)=>{
        this.setState({archivo});
    }

    registro =(data)=>{
        const {registroMaterial, archivo}= this.props;
        registroMaterial({...data, archivo:null}, [{file: this.state.archivo, name:'archivo'}, ])
    }

    actualizar =(data)=>{
        const {actualizarMaterial, archivo}= this.props;
        actualizarMaterial({...data, archivo:null}, [{file: this.state.archivo, name:'archivo'}, ])
    }

    render(){
        const { match, archivo, clearFile} = this.props;
        const idasignacion = match.params.idasignacion;

        const asignacion = match.params.idasignacion || match.params.asignacion;

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
                    asignacion={asignacion}
                    />
            </React.Fragment>

        );
    }
}
export default Material;
