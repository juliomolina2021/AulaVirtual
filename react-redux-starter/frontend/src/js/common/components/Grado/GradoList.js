import React, { Component } from 'react';
import Grid from '../Utils/Grid'
import { standardActions } from '../Utils/Grid/StandardActions';

class ListadoGrados extends Component{
    componentWillMount = () => {
        const { listar } = this.props;
        listar();
    }


    render(){
        const { data, loader, eliminar } = this.props;
        return(
            <React.Fragment>
                <center><h3>Grados Registrados</h3></center>
                <div className='d-flex flex-row justify-contente-start mb-2'>
                    <a
                        href='/#/grados/crear'
                        className='btn btn-primary'
                    >
                        Crear Grado
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
                    dataField="nombre"
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
                    dataField="nivel"
                    dataSort
                    dataFormat={(cell, row)=>{
                        return cell.nombre_nivel;
                    }}
                >
                    Nivel
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataField="id"
                    dataAlign="center"
                    dataSort
                    isKey
                    dataFormat={standardActions({
                        editar: 'grados',
                        ver: 'grados',
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

export default ListadoGrados;
