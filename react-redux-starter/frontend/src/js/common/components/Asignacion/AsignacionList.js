import React, { Component } from 'react';
import Grid from '../Utils/Grid'
import { standardActions } from '../Utils/Grid/StandardActions';

class ListadoAsignaciones extends Component{
    componentWillMount = () => {
        const { listar } = this.props;
        listar();
    }


    render(){
        const { data, loader, eliminar } = this.props;
        return(
            <React.Fragment>
                <center><h3>Asignaciones Registradas</h3></center>
                <div className='d-flex flex-row justify-contente-start mb-2'>
                    <a
                        href='/#/asignaciones/crear'
                        className='btn btn-primary'
                    >
                        Crear Asignacion
                    </a>
                </div>
                {data&&
                <Grid
                    hover
                    striped data={data}
                    loading={loader}
                    //onPageChange={onPageChange}
                    //onSortChange={onSortChange}
                >
                <TableHeaderColumn
                    dataField="profesor"
                    dataSort
                    dataFormat={(cell, row)=>{
                        if(row.profesor){
                            return (`${row.profesor.perfil_profesor.user.first_name} ${row.profesor.perfil_profesor.user.last_name}`);
                        }

                    }}
                >
                    Profesor
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
                    dataField="grado"
                    dataSort
                    dataFormat={(cell, row)=>{
                        if(row.grado){
                            return row.grado.nombre
                        }
                    }}
                >
                    Grado
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
                    dataSort
                    dataFormat={(cell, row)=>{
                        if(row.curso){
                            return row.curso.nombre;
                        }
                    }}
                >
                    Curso
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataField="id"
                    dataAlign="center"
                    dataSort
                    isKey
                    dataFormat={standardActions({
                        editar: 'asignaciones',
                        ver: 'asignaciones',
                        eliminar,
                    })}
                >
                    Acciones
                </TableHeaderColumn>
            </Grid>
        }
        </React.Fragment>
        );
    }
}

export default ListadoAsignaciones;
