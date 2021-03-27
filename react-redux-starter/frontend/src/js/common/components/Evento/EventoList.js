import React, { Component } from 'react';
import Grid from '../Utils/Grid'
import { standardActions } from '../Utils/Grid/StandardActions';

class ListadoEventos extends Component{
    componentWillMount = () => {
        const { listar } = this.props;
        listar();
    }

    render(){
        const { data, loader, eliminar } = this.props;
        return(
            <React.Fragment>
                <center><h3>Eventos Registrados</h3></center>
                <div className='d-flex flex-row justify-contente-start mb-2'>
                    <a
                        href='/#/eventos/crear'
                        className='btn btn-primary'
                    >
                        Crear Evento
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
                    dataField="nombre_evento"
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
                    dataField="fecha_evento"
                    dataSort
                >
                    Fecha
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataField="hora_evento"
                    dataSort
                >
                    Hora
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataField="id"
                    dataAlign="center"
                    dataSort
                    isKey
                    dataFormat={standardActions({
                        editar: 'eventos',
                        ver: 'eventos',
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

export default ListadoEventos;
