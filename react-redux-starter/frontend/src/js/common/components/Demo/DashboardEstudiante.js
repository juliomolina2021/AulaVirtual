import React, { Component } from 'react';
import Grid from "../../components/Utils/Grid";
import Imagen from './ImagenCursosEstudiante'


class DashboardEstudiante extends Component {

    mostrarImagenes=()=>{
        const colores=["dark-blue","blue","dark-gray","purple", "gray ", "light-gray","orange","red", "yellow","fusia","mostaza", "verde","green"];
        const {cursos_estudiante}=this.props
        let i=0;
        const obtenerColor=()=>{
            let color = colores[i]
            i+=1;
            return color;
        }
        return(
            <React.Fragment>
                <div className="col-12 p-5 row ">
                    {cursos_estudiante &&
                        cursos_estudiante.results.map(curso => (
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

    render() {
        const {loader,tareas_sin_entregar, tareas_sin_entregar_curso, eventos_proximos}= this.props;
        return (
            <React.Fragment>
                <br/>
                <div className="card mb3 col-12">
                    <div className="row">
                        <div className="col-md-12 mt-lg-4 mt-4">
                            <div className="d-sm-flex align-items-center justify-content-center mb-4">
                                <h1 className="h3 mb-0">Cursos Asignados</h1>
                            </div>
                            <hr width="100%"/>
                            {this.mostrarImagenes() }
                        </div>
                        <hr width="100%"/>
                    </div>
                    <div className="row">
                        <div className="col-md-12 mt-lg-4 mt-4">
                                <div className="d-sm-flex align-items-center justify-content-center ">
                                    <h1 className="h4 mb-0">Tareas pendientes de Entregar</h1>
                                </div>
                            </div>
                        <div className="col-md-6 mt-lg-4 mt-4">
                            <div className="col-md-12 mt-lg-4 mt-4">
                                <div className="d-sm-flex align-items-center justify-content-center mb-4">
                                    <h1 className="h4 mb-0">Listado general de tareas pendientes </h1>
                                </div>
                            </div>
                            { tareas_sin_entregar &&
                                <Grid
                                    hover
                                    striped
                                    data={tareas_sin_entregar}
                                    loading={loader}
                                    //onPageChange={onPageChange}
                                    //onSortChange={onSortChange}
                                >
                                    <TableHeaderColumn
                                        isKey
                                        dataField="nombre_tarea"
                                        dataSort

                                    >
                                        Tarea
                                    </TableHeaderColumn>
                                    <TableHeaderColumn
                                        dataField="fecha_entrega"
                                        dataSort
                                    >
                                        Fecha entrega
                                    </TableHeaderColumn>
                                    <TableHeaderColumn
                                        dataField="hora_entrega"
                                        dataSort
                                    >
                                        Hora Entrega
                                    </TableHeaderColumn>
                                </Grid>
                            }
                        </div>
                        <div className="col-md-6 mt-lg-4 mt-4">
                            <div className="col-md-12 mt-lg-4 mt-4">
                                <div className="d-sm-flex align-items-center justify-content-center mb-4">
                                    <h1 className="h4 mb-0">Total de tareas pendientes por curso</h1>
                                </div>
                            </div>
                            { tareas_sin_entregar_curso &&
                                <Grid
                                    hover
                                    striped
                                    data={tareas_sin_entregar_curso}
                                    loading={loader}
                                    //onPageChange={onPageChange}
                                    //onSortChange={onSortChange}
                                >
                                    <TableHeaderColumn
                                        isKey
                                        dataField="nombre_tarea"
                                        dataSort
                                        dataFormat={(cell, row)=>{
                                            if(row.nombreCurso){
                                                return row.nombreCurso;
                                            }
                                        }}
                                    >
                                        Curso
                                    </TableHeaderColumn>
                                    <TableHeaderColumn
                                        dataField="pendientesCurso"
                                        dataAlign="center"
                                        dataSort
                                    >
                                        Cantidad de pendientes
                                    </TableHeaderColumn>
                                </Grid>
                            }
                        </div>
                        <hr width="100%"/>
                    </div>
                    <div className="row">
                        <div className="col-md-12 mt-lg-4 mt-4">
                                <div className="d-sm-flex align-items-center justify-content-center ">
                                    <h1 className="h4 mb-0">Eventos proximos a asistir</h1>
                                </div>
                        </div>
                        <div className="col-md-12 mt-lg-4 mt-4">
                            { eventos_proximos &&
                                <Grid
                                    hover
                                    striped
                                    data={eventos_proximos}
                                    loading={loader}
                                    //onPageChange={onPageChange}
                                    //onSortChange={onSortChange}
                                >
                                    <TableHeaderColumn
                                        isKey
                                        dataField="nombre_evento"
                                        dataSort
                                    >
                                        Evento
                                    </TableHeaderColumn>
                                    <TableHeaderColumn
                                        dataField="descripcion"
                                        dataSort
                                    >
                                        Descripcion
                                    </TableHeaderColumn>
                                    <TableHeaderColumn
                                        dataField="fecha_evento"
                                        dataSort
                                    >
                                        Fecha
                                    </TableHeaderColumn>
                                    <TableHeaderColumn
                                        dataField="hora_evento"
                                        dataSort
                                    >
                                        Hora
                                    </TableHeaderColumn>
                                </Grid>
                            }
                        </div>
                        <hr width="100%"/>
                    </div>
                </div>
                <br/>
            </React.Fragment>
        );
    }
}

export default DashboardEstudiante;
