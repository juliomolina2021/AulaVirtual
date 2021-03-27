import React, { Component } from 'react';
import Grid from '../Utils/Grid'
import moment from 'moment'

class ListadoTareasEstudiante extends Component{
    componentWillMount = () => {
        console.log(this.props)
        const { listarTareasRecibidas, match } = this.props;
        const idAsignacion = match.params.idasignacion
        listarTareasRecibidas(idAsignacion);
    }


    render(){
        const { tareas, loader, eliminar, match } = this.props;
        console.log("Tareassss", tareas)
        return(
            <React.Fragment>
                <center><h3>Tareas Recibidas</h3></center>
                <Grid
                    hover
                    striped data={tareas}
                    loading={loader}
                    //onPageChange={onPageChange}
                    //onSortChange={onSortChange}
                >
                <TableHeaderColumn
                    dataField="nombre_tarea"
                    dataSort
                    isKey
                    dataFormat={(cell, row)=>{
                        if(row.tarea){
                            return row.tarea.nombre_tarea
                        }
                    }}
                >
                    Tareas
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataField="first_name"
                    dataSort
                    dataFormat={(cell, row)=>{
                        if(row.estudiante){
                            return (`${row.estudiante.profile.user.first_name} ${row.estudiante.profile.user.last_name}`)
                        }
                    }}
                >
                    Nombres
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataField="last_name"
                    dataSort
                    dataFormat={(cell, row)=>{
                        if(row.estado_calificacion){
                            return row.estado_calificacion
                        }
                    }}
                >
                    Estado
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataField="calificacion"
                    dataSort
                    dataFormat={(cell, row)=>{
                        if(row.calificacion){
                            return row.calificacion
                        }
                    }}
                >
                    Calificacion
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataField="id"
                    dataAlign="center"
                    dataSort
                    dataFormat={(cell, row)=>{
                        if(row.id){
                            return(<a href={`/#/calificaciones/crear/${row.id}`}><i class="material-icons">spellcheck</i></a>);
                        }
                    }}
                >
                    Calificar
                </TableHeaderColumn>

            </Grid>
        </React.Fragment>
        );
    }
}

export default ListadoTareasEstudiante;
