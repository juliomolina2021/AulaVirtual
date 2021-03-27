import React, { Component } from 'react';
import Grid from '../Utils/Grid'
import { standardActions } from '../Utils/Grid/StandardActions';

class ListadoTareas extends Component{
    componentWillMount = () => {

        const { listarTareasCurso, match } = this.props;
        const idAsignacion = match.params.idasignacion
        listarTareasCurso(idAsignacion);
    }


    render(){
        const { data, loader, eliminar, match } = this.props;
        const idasignacion= match.params.idasignacion;
        return(
            <React.Fragment>
                <center><h3>Tareas Registradas</h3></center>
                <div className='d-flex flex-row justify-contente-start mb-2'>
                    <a
                        href={`/#/tareas/crear/${idasignacion}`}
                        className='btn btn-primary'
                    >
                        Crear Tarea
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
                    dataField="nombre_tarea"
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
                        editar: 'tareas',
                        ver: 'tareas',
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

export default ListadoTareas;
