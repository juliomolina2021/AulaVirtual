import React, { Component } from 'react';
import Grid from '../Utils/Grid'
import { standardActions } from '../Utils/Grid/StandardActions';

class ListadoEstudiantes extends Component{
    componentWillMount = () => {
        const { listar } = this.props;
        listar();
    }


    render(){

        const { data, loader, eliminar } = this.props;
        return(
            <React.Fragment>
                <center><h3>Estudiantes Registrados</h3></center>
                <div className='d-flex flex-row justify-contente-start mb-2'>
                    <a
                        href='/#/estudiantes/crear'
                        className='btn btn-primary'
                    >
                        Crear Estudiante
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
                            return row.profile.user.first_name;
                        }}
                    >
                        Nombre
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="last_name"
                        dataSort
                        dataFormat={(cell, row)=>{
                            return row.profile.user.last_name;
                        }}
                    >
                        Apellidos
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="email"
                        dataSort
                        dataFormat={(cell, row)=>{
                            return row.profile.user.email;
                        }}
                    >
                        Correo Electronico
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="address"
                        dataSort
                        dataFormat={(cell, row)=>{
                            return row.profile.address;
                        }}
                    >
                        Direccion
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="phone"
                        dataSort
                        dataFormat={(cell, row)=>{
                            return row.profile.phone;
                        }}
                    >
                        Telefono
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="carnet"
                        dataSort
                    >
                        Carne
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="encargado"
                        dataSort
                    >
                        Encargado
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        isKey
                        dataField="id"
                        dataAlign="center"
                        dataSort
                        dataFormat={standardActions({
                            editar: 'estudiantes',
                            ver: 'estudiantes',
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

export default ListadoEstudiantes;
