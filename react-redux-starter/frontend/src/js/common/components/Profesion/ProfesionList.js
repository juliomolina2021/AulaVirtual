import React, { Component } from 'react';
import Grid from '../Utils/Grid'
import { standardActions } from '../Utils/Grid/StandardActions';

class ListadoProfesiones extends Component{
    componentWillMount = () => {
        const { listar } = this.props;
        listar();
    }


    render(){

        const { data, loader, eliminar } = this.props;
        return(
            <React.Fragment>
                <center><h3>Profesiones Registrados</h3></center>
                <div className='d-flex flex-row justify-contente-start mb-2'>
                    <a
                        href='/#/profesiones/crear'
                        className='btn btn-primary'
                    >
                        Crear Profesion
                    </a>
                </div>
                {data &&
                <Grid
                    hover
                    striped data={data}
                    loading={loader}
                    //onPageChange={onPageChange}
                    //onSortChange={onSortChange}
                >
                <TableHeaderColumn
                    dataField="nombre_profesion"
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
                        editar: 'profesiones',
                        ver: 'profesiones',
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

export default ListadoProfesiones;
