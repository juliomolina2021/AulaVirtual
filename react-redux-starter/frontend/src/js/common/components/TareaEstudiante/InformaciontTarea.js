import React, {Component} from 'react';
import InformacionTareaForm from './InformacionTareaForm';

class InformacionTarea extends Component{
    state={
        crear: true,
        archivo:null,
    }

    componentWillMount = () => {
        const {leer, match} = this.props;
        const id = match.params.idtarea;
        if(id) {
            leer(id);
        }
    }
    setArchivo=(archivo)=>{
        this.setState({archivo});
    }
    render(){
        const {archivo,clearFile, trasladoForm} = this.props;
        const { crear } = this.state;
        const funcionEnvio = trasladoForm;//? registroEstudiante : actualizarEstudiante;
        return(
            <React.Fragment>
                <InformacionTareaForm
                    crear= {crear}
                    onSubmit={funcionEnvio}
                    setArchivo={this.setArchivo}
                    archivo={archivo}
                    clearFile={clearFile}
                    />
            </React.Fragment>

        );
    }
}
export default InformacionTarea;
