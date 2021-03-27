import React, { Component } from 'react';
import Grid from '../Utils/Grid'
import { standardActions } from '../Utils/Grid/StandardActions';

class ListadoEstudiantesCurso extends Component{
    componentWillMount = () => {
        const {listar, idregistro}=this.props;
        listar(idregistro);
        //console.log("Props Listado Estudiante",this.props)
    }

    render(){

        const { data, loader, eliminar, idregistro} = this.props;
        console.log("propslist",this.props)
        //let profesor = data.results.profesor.perfil_profesor.user.first_name;

        return(
            <React.Fragment>
                <center><h3>Estudiantes asignados a curso</h3></center>
                {data &&
                <Grid
                    hover
                    striped data={data}
                    loading={loader}
                    //onPageChange={listar}
                    //onSortChange={onSortChange}
                >
                <TableHeaderColumn
                    dataField="first_name"
                    dataSort
                    isKey
                    dataFormat={(cell, row)=>{
                        if(row.profile){
                            return row.profile.user.first_name;
                        }
                    }}
                >
                    Nombres
                </TableHeaderColumn>

                <TableHeaderColumn
                    dataField="last_name"
                    dataSort
                    dataFormat={(cell, row)=>{
                        if(row.profile){
                            return row.profile.user.last_name;
                        }
                    }}
                >
                    Apellidos
                </TableHeaderColumn>

                <TableHeaderColumn
                    dataField="first_name"
                    dataAlign="center"

                    dataSort
                    dataFormat={(cell, row)=>{
                        if(row.profile){
                            return(<a href={`/#/cursosprofesor/${idregistro}/editar`} onClick={()=>{eliminar(row.id, idregistro)}}><i className="material-icons">person_add_disabled</i></a>);
                        }
                    }}
                >
                    Quitar Asignacion
                </TableHeaderColumn>
            </Grid>
            }
            </React.Fragment>
        );
    }
}

export default ListadoEstudiantesCurso;
