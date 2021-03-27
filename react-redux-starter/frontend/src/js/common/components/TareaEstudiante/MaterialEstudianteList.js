import React, { Component } from 'react';
import Grid from '../Utils/Grid'

class InformacionTarea extends Component{
    componentWillMount = () => {
        const {listarMateriales, match}=this.props;
        const id= match.params.idasignacion;
        listarMateriales(id)
    }


    render(){

        const { materiales, loader} = this.props;
         console.log("prosps materiales estudiante", this.props)
        return(
            <React.Fragment>
                 <center><h3>Materiales Registrados</h3></center>

                <Grid
                    hover
                    striped data={materiales}
                    loading={loader}
                    //onPageChange={onPageChange}
                    //onSortChange={onSortChange}
                >
                <TableHeaderColumn
                    dataField="nombre_material"
                    dataSort
                    isKey
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
                    dataField="archivo"
                    dataSort
                    dataAlign="center"
                    dataFormat={(cell, row)=>{
                        if(row.archivo){
                            return (
                                <a href={row.archivo} target="_blank"><i class="material-icons">file_download</i></a>
                            )
                        }
                    }}
                >
                    Descargar
                </TableHeaderColumn>
            </Grid>
            </React.Fragment>
        );
    }
}

export default InformacionTarea;
