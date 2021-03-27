import React, { Component } from 'react';
import Grid from '../Utils/Grid'

class ListadoTareasEstudiante extends Component{
    componentWillMount = () => {

        const { listarTareasCurso, match } = this.props;
        const idAsignacion = match.params.idasignacion
        listarTareasCurso(idAsignacion);
    }


    render(){
        const { data, loader, eliminar, match } = this.props;
        console.log("data", data);
        return(
            <React.Fragment>
                <center><h3>Tareas Registradas</h3></center>
                <Grid
                    hover
                    striped data={data}
                    loading={loader}
                    //onPageChange={onPageChange}
                    //onSortChange={onSortChange}
                >
                <TableHeaderColumn
                    dataField="nombre_tarea"
                    dataSort
                    isKey
                    dataFormat={(cell, row)=>{
                        if(row.nombre_tarea){
                            return (<a href={`/#/infotarea/${row.id}`}>{row.nombre_tarea}</a>)
                        }
                    }}
                >
                    Tareas
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataField="fecha_entrega"
                    dataSort
                    dataFormat={(cell, row)=>{
                        if(row.fecha_entrega){
                            return row.fecha_entrega
                        }
                    }}
                >
                    Fecha entrega
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataField="hora_entrega"
                    dataSort
                    dataFormat={(cell, row)=>{
                        if(row.hora_entrega){
                            return row.hora_entrega
                        }
                    }}
                >
                    Hora entrega
                </TableHeaderColumn>

                {/* <TableHeaderColumn
                    dataField="nombre_tarea"
                    dataSort
                    dataAlign="center"
                    dataFormat={(cell, row)=>{
                        if(row.nombre_tarea){
                            return (
                                <a href={`/#/tareasestudiante/crear/${row.id}`}><i className="material-icons">upload_file</i></a>
                                );
                        }
                    }}
                >
                    Entrega Tarea
                </TableHeaderColumn> */}
            </Grid>
        </React.Fragment>
        );
    }
}

export default ListadoTareasEstudiante;
