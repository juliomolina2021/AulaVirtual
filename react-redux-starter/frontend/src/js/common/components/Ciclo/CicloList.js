import React, { Component } from 'react';
import Grid from '../Utils/Grid'
import { standardActions } from '../Utils/Grid/StandardActions';

class ListadoCiclos extends Component{
    componentWillMount = () => {
        const { listar } = this.props;
        listar();
    }
    render(){

        const { data, loader, eliminar } = this.props;
        return(
            <React.Fragment>
                <center><h3>Ciclos Registrados</h3></center>
                <div className='d-flex flex-row justify-contente-start mb-2'>
                    <a
                        href='/#/ciclos/crear'
                        className='btn btn-primary'
                    >
                        Crear Ciclo Escolar
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
                    dataField="anio"
                    dataSort
                >
                    Anio
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataField="id"
                    dataAlign="center"
                    dataSort
                    isKey
                    dataFormat={standardActions({
                        editar: 'ciclos',
                        ver: 'ciclos',
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

export default ListadoCiclos;
