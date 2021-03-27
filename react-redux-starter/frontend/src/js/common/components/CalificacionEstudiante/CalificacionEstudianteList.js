import React, { Component } from 'react';
import Grid from '../Utils/Grid'
import moment from 'moment'

class ListadoNotasEstudiante extends Component{
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
                <center><h3>Tareas Enviadas</h3></center>
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
                    dataField="last_name"
                    dataSort
                    dataFormat={(cell, row)=>{
                        if(row.estado_calificacion){
                            return row.estado_calificacion
                        }
                    }}
                >
                    Estado Calificacion
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataField="last_name"
                    dataSort
                    dataFormat={(cell, row)=>{
                        if(row.estado_entrega){
                            return row.estado_entrega
                        }
                    }}
                >
                    Estado Entrega
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

            </Grid>
        </React.Fragment>
        );
    }
}

export default ListadoNotasEstudiante;
