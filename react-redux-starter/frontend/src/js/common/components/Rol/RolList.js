import React, { Component } from 'react';
import Grid from '../Utils/Grid'
import { standardActions } from '../Utils/Grid/StandardActions';

class ListadoRoles extends Component{
    componentWillMount = () => {
        const { listar } = this.props;
        listar();
    }


    render(){

        const { data, loader, eliminar } = this.props;
        return(
            <React.Fragment>
                <center><h3>Roles Registrados</h3></center>
                <div className='d-flex flex-row justify-contente-start mb-2'>
                    <a
                        href='/#/roles/crear'
                        className='btn btn-primary'
                    >
                        Crear Rol
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
                    dataField="nombre_rol"
                    dataSort
                >
                    Nombre
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataField="descripcion"
                    dataSort
                >
                    Descripcion
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataField="id"
                    dataAlign="center"
                    dataSort
                    isKey
                    dataFormat={standardActions({
                        editar: 'roles',
                        ver: 'roles',
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

export default ListadoRoles;
