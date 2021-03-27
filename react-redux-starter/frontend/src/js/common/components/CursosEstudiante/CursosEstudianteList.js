import React, { Component } from 'react';
import Imagen from './ImagenCursosEstudiante'
import Grid from '../Utils/Grid'

class ListadoCursosEstudiante extends Component{
    componentWillMount = () => {
        const { listar } = this.props;
        listar();
    }
    mostrarImagenes=()=>{
        const colores=["dark-blue","blue","dark-gray","purple", "gray ", "light-gray","orange","red", "yellow","fusia","mostaza", "verde","green"];
        const {data}=this.props
        let i=0;
        const obtenerColor=()=>{
            let color = colores[i]
            i+=1;
            return color;
        }
        return(
            <React.Fragment>
                <div className="col-12 p-5 row ">
                    {data &&
                        data.results.map(curso => (
                            <Imagen
                                key={curso.id}
                                portada={curso.portada}
                                curso={curso.curso.nombre}
                                nombre_profesor={curso.profesor.perfil_profesor.user.first_name}
                                apellido_profesor={curso.profesor.perfil_profesor.user.last_name}
                                color={obtenerColor()}
                                asignacion={curso.id}
                            />

                        ))
                    }
                </div>
            </React.Fragment>
        )
    }
    render(){
        const { data, loader, listar } = this.props;
        return(
            <React.Fragment>
                <center><h3>Cursos asignados  </h3></center>
                {this.mostrarImagenes() }

        </React.Fragment>
        );
    }
}

export default ListadoCursosEstudiante;
