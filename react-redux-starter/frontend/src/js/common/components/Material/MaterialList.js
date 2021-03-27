import React, { Component } from 'react';
import Grid from '../Utils/Grid'
import { standardActions } from '../Utils/Grid/StandardActions';

class ListadoMateriales extends Component{
    componentWillMount = () => {

        const { listarMaterialesCurso, match } = this.props;
        const idAsignacion = match.params.asignacion
        listarMaterialesCurso(idAsignacion);
    }


    render(){
        const { data, loader, eliminar, match } = this.props;
        const idasignacion= match.params.asignacion;
        return(
            <React.Fragment>
                <center><h3>Materiales Registrados</h3></center>
                <div className='d-flex flex-row justify-contente-start mb-2'>
                    <a
                        href={`/#/materiales/crear/${idasignacion}`}
                        className='btn btn-primary'
                    >
                        Crear Material
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
                    dataField="nombre_material"
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
                        editar: `/materialesasignacion/${idasignacion}/materiales`,
                        ver: `/materialesasignacion/${idasignacion}/materiales`,
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

export default ListadoMateriales;
