import React, { Component } from 'react';
import DashboardAdmin from './DashboardAdmin'
import DashboardEstudiante from './DashboardEstudiante'
import DashboardProfesor from './DashboardProfesor'
import Demo2 from './Demo2'

class Demo extends Component {

    componentWillMount = () => {
        const {getMe} = this.props;
        getMe();
        /********************************* */
        const {listarNiveles,totalEstudiantes,totalProfesores,totalGrados,totalSecciones,totalUsuarios} = this.props;
        listarNiveles();
        totalEstudiantes();
        totalProfesores();
        totalGrados();
        totalSecciones();
        totalUsuarios();
        /********************************* */
        const {listarCursosProfesor, tareasPendientesCalificar, tareasPendientesCalificarCurso, eventosProximos} = this.props;
        listarCursosProfesor();
        tareasPendientesCalificar();
        tareasPendientesCalificarCurso();
        eventosProximos();
        /********************************** */
        const {listar_cursos_estudiantes, tareasPendientesEntregar,tareasPendientesEntregarCurso} = this.props;
        listar_cursos_estudiantes();
        tareasPendientesEntregar();
        tareasPendientesEntregarCurso();

    }
    render() {
        const {rol_usuario}=this.props
        const {estudiante,profesor,grado,seccion,niveles,loader,usuario}= this.props;
        const {tareas_sincalificar, tareas_sincalificar_curso, eventos_proximos, cursos}= this.props;
        const {tareas_sin_entregar, tareas_sin_entregar_curso, cursos_estudiante}= this.props;
        let rolUsuario="";
        let Admin=false;
        if(rol_usuario){
            Admin=rol_usuario.is_superuser;

            if(!rol_usuario.is_superuser){

                if(rol_usuario.user_profile && rol_usuario.user_profile.rol){
                    rolUsuario=(rol_usuario.user_profile.rol.nombre_rol).toUpperCase();
                }

            }
        }
        return (
            <React.Fragment>
                {
                Admin == true &&
                <DashboardAdmin
                    estudiante={estudiante}
                    profesor={profesor}
                    grado={grado}
                    seccion={seccion}
                    niveles={niveles}
                    loader={loader}
                    usuario={usuario}
                />
    }
                {
                rolUsuario == "PROFESOR" &&
                <DashboardProfesor
                    tareas_sincalificar={tareas_sincalificar}
                    tareas_sincalificar_curso={tareas_sincalificar_curso}
                    eventos_proximos={eventos_proximos}
                    cursos={cursos}
                />
    }
                {
                rolUsuario == "ESTUDIANTE" &&
                <DashboardEstudiante
                    tareas_sin_entregar={tareas_sin_entregar}
                    tareas_sin_entregar_curso={tareas_sin_entregar_curso}
                    eventos_proximos={eventos_proximos}
                    cursos_estudiante={cursos_estudiante}
                />
                }
            </React.Fragment>
        );
    }
}

export default Demo;
