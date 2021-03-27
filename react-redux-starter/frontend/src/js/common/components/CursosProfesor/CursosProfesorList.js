import React, { Component } from 'react';
import Grid from '../Utils/Grid'

class ListadoCursosProfesor extends Component{
    componentWillMount = () => {
        const { listar } = this.props;
        listar();
    }

    render(){
        const { data, loader, listar } = this.props;
        console.log("data ", data);


        return(
            <React.Fragment>
                <center><h3>Cursos asignados </h3></center>
            { data &&
                <Grid
                    hover
                    striped data={data}
                    loading={loader}
                    //onPageChange={listar}
                    //onSortChange={onSortChange}
                >
                <TableHeaderColumn
                    dataField="grado"
                    dataSort
                    dataFormat={(cell, row)=>{
                        if(row.grado){
                            return row.grado.nombre;
                        }
                    }}
                >
                    Grado
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataField="nivel"
                    dataSort
                    dataFormat={(cell, row)=>{
                        if(row.grado.nivel){
                            return row.grado.nivel.nombre_nivel;
                        }
                    }}
                >
                    Nivel
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataField="seccion"
                    dataSort
                    dataFormat={(cell, row)=>{
                        if(row.seccion){
                            return row.seccion.nombre;
                        }
                    }}
                >
                    Seccion
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataField="curso"
                    isKey
                    dataSort
                    dataFormat={(cell, row)=>{
                        if(row.curso){
                            return(
                                <a href={`/#/DetalleCurso/${row.id}`}>{row.curso.nombre}</a>
                            )
                        }
                    }}
                >
                    Curso
                </TableHeaderColumn>

            </Grid>
            }
        </React.Fragment>
        );
    }
}

export default ListadoCursosProfesor;
