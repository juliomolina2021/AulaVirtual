import React, { Component } from 'react';
import Grid from '../Utils/Grid'
import { standardActions } from '../Utils/Grid/StandardActions';

class ListadoSecciones extends Component{
    componentWillMount = () => {
        const { listar } = this.props;
        listar();
    }

    render(){
        //console.log("PROPS en estudiantes list: ", this. props);

        const { data, loader, eliminar } = this.props;
        return(
            <React.Fragment>
                <center><h3>Secciones Registradas</h3></center>
                <div className='d-flex flex-row justify-contente-start mb-2'>
                    <a
                        href='/#/secciones/crear'
                        className='btn btn-primary'
                    >
                        Crear Seccion
                    </a>
                </div>
                <Grid
                    hover
                    striped data={data}
                    loading={loader}
                    //onPageChange={onPageChange}
                    //onSortChange={onSortChange}
                >
                <TableHeaderColumn
                    dataField="nombre"
                    dataSort
                >
                    Seccion
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataField="id"
                    dataAlign="center"
                    dataSort
                    isKey
                    dataFormat={standardActions({
                        editar: 'secciones',
                        ver: 'secciones',
                        eliminar,
                    })}
                >
                    Acciones
                </TableHeaderColumn>
            </Grid>
        </React.Fragment>
        );
    }
}

export default ListadoSecciones;
