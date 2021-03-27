import React, {Component} from 'react';
import EstudiantesCursosList from './EstudiantesCursosList';
import Formulario from './Formulario';

class CursosProfesor extends Component{
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
        //console.log("Props Asignacion Crear en el render",this.props);
        const {
            registroAsignacionCurso,
            asignacionCursosEstudiante,
            data,
            loader,
            match,
            listarEstudiante,
            eliminar_asignacion_estudiante} = this.props;

        const idregistro = match.params.id;
        const { creacion } = this.state;

        const funcionEnvio = creacion ? registroAsignacionCurso : asignacionCursosEstudiante;

        return(
            <React.Fragment>
                <Formulario
                    crear= {creacion}
                    onSubmit={funcionEnvio}
                    idregistro={idregistro}
                    initialValues={{idasigacion: idregistro}}
                />
                <EstudiantesCursosList
                listar={listarEstudiante}
                data={data}
                loader={loader}
                idregistro={idregistro}
                eliminar={eliminar_asignacion_estudiante}
                />
            </React.Fragment>

        );
    }
}
export default CursosProfesor;
