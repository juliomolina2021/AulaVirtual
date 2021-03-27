import React, {Component} from 'react';
import DetalleCursoForm from './DetalleCursoForm';

class DetalleCurso extends Component{
    state={
        crear: true,
        portada:null,
    }

    componentWillMount = () => {
        const {leer, match} = this.props;
        const idasignacion= match.params.idasignacion;
        leer(idasignacion)
    }
    setPortada=(portada)=>{
        this.setState({portada});
    }

    actualizar =(data)=>{
        const {agregarPortada, portada}= this.props;
        agregarPortada({...data, portada:null}, [{file: this.state.portada, name:'portada'}, ])
    }
    render(){
        const {portada,clearFile, match, registro} = this.props;
        const idasignacion= match.params.idasignacion;
        const curso=registro.curso.nombre;
        const { crear } = this.state;

        return(
            <React.Fragment>
                <DetalleCursoForm
                    crear= {crear}
                    onSubmit={this.actualizar}
                    initialValues={{asignacion: idasignacion}}
                    asignacion={idasignacion}
                    curso={curso}
                    setPortada={this.setPortada}
                    portada={portada}
                    clearFile={clearFile}
                    />
            </React.Fragment>

        );
    }
}
export default DetalleCurso;
