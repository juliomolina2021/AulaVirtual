import React, { Component } from 'react';
import Grid from '../Utils/Grid'
import { standardActions } from '../Utils/Grid/StandardActions';

class ListadoProfesores extends Component{
    componentWillMount = () => {
        const { listar } = this.props;
        listar();
    }


    render(){

        const { data, loader, eliminar } = this.props;
        return(
            <React.Fragment>
                <center><h3>Profesores Registrados</h3></center>
                <div className='d-flex flex-row justify-contente-start mb-2'>
                    <a
                        href='/#/profesores/crear'
                        className='btn btn-primary'
                    >
                        Crear Profesor
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

                        dataField="first_name"
                        dataSort
                        dataFormat={(cell, row)=>{
                            return row.perfil_profesor.user.first_name;
                        }}
                    >
                        Nombre
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="last_name"
                        dataSort
                        dataFormat={(cell, row)=>{
                            return row.perfil_profesor.user.last_name;
                        }}
                    >
                        Apellidos
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="email"
                        dataSort
                        dataFormat={(cell, row)=>{
                            return row.perfil_profesor.user.email;
                        }}
                    >
                        Correo Electronico
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="address"
                        dataSort
                        dataFormat={(cell, row)=>{
                            return row.perfil_profesor.address;
                        }}
                    >
                        Direccion
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="phone"
                        dataSort
                        dataFormat={(cell, row)=>{
                            return row.perfil_profesor.phone;
                        }}
                    >
                        Telefono
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="nombre_profesion"
                        dataSort
                        dataFormat={(cell, row)=>{
                            return row.profesion.nombre_profesion;
                        }}
                    >
                        Profesion
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        isKey
                        dataField="id"
                        dataAlign="center"
                        dataSort
                        dataFormat={standardActions({
                            editar: 'profesores',
                            ver: 'profesores',
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

export default ListadoProfesores;
