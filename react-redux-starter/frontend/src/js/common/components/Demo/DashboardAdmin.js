import React, { Component } from 'react';
import Grid from "../../components/Utils/Grid";
import './card.css';

class DashboardAdmin extends Component {

    render() {

        const {estudiante,profesor,grado,seccion,niveles,loader,usuario}= this.props;

        return (
            <React.Fragment>

                <br/>
                <div className="card mb3 col-12">
                    <div className="row">
                        <div className="col-md-12 mt-lg-4 mt-4">
                            <div className="d-sm-flex align-items-center justify-content-center mb-4">
                                <h1 className="h3 mb-0">Ciclo escolar</h1>
                            </div>
                        </div>
                        <hr width="100%"/>
                        <div className="col-md-12 mt-lg-4 mt-4">
                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h3 mb-0">Total de usuarios registrados</h1>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-12">
                            <div className="circle-tile ">
                                <a href="#"><div className="circle-tile-heading dark-blue"><i className="fa fa-users fa-fw fa-3x"></i></div></a>
                                <div className="circle-tile-content dark-blue">
                                    <div className="circle-tile-description text-faded"> Usuarios</div>
                                    <div className="circle-tile-number text-faded ">{usuario && usuario.count}</div>
                                    <a className="circle-tile-footer" href="#">Ver Mas  <i className="fa fa-chevron-circle-right"></i></a>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-12">
                            <div className="circle-tile ">
                                <a href="/#/estudiantes"><div className="circle-tile-heading red"><i className="fa fa-graduation-cap fa-fw fa-3x"></i></div></a>
                                <div className="circle-tile-content red">
                                    <div className="circle-tile-description text-faded"> Estudiantes </div>
                                    <div className="circle-tile-number text-faded ">{estudiante && estudiante.count}</div>
                                    <a className="circle-tile-footer" href="/#/estudiantes">Ver Mas  <i className="fa fa-chevron-circle-right"></i></a>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-12">
                            <div className="circle-tile ">
                                <a href="/#/profesores"><div className="circle-tile-heading blue"><i className="fa fa-male fa-fw fa-3x"></i></div></a>
                                <div className="circle-tile-content blue">
                                    <div className="circle-tile-description text-faded"> Profesores </div>
                                    <div className="circle-tile-number text-faded ">{profesor && profesor.count}</div>
                                    <a className="circle-tile-footer" href="/#/profesores">Ver Mas  <i className="fa fa-chevron-circle-right"></i></a>
                                </div>
                            </div>
                        </div>
                        <hr width="100%"/>
                    </div>

                    <div className="row">
                        <div className="col-md-12 mt-lg-4 mt-4">
                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h3 mb-0">Total de Grados y Secciones registrados</h1>
                            </div>
                        </div>
                        <div className="col-lg-6 col-sm-12">
                            <div className="circle-tile ">
                                <a href="/#/grados"><div className="circle-tile-heading gray"><i className="fa fa-cube fa-fw fa-3x"></i></div></a>
                                <div className="circle-tile-content gray">
                                    <div className="circle-tile-description text-faded"> Grados</div>
                                    <div className="circle-tile-number text-faded ">{grado && grado.count}</div>
                                    <a className="circle-tile-footer" href="/#/grados">Ver Mas  <i className="fa fa-chevron-circle-right"></i></a>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6 col-sm-12">
                            <div className="circle-tile ">
                                <a href="/#/secciones"><div className="circle-tile-heading purple"><i className="fa fa-cubes fa-fw fa-3x"></i></div></a>
                                <div className="circle-tile-content purple">
                                    <div className="circle-tile-description text-faded"> Secciones </div>
                                    <div className="circle-tile-number text-faded ">{seccion && seccion.count}</div>
                                    <a className="circle-tile-footer" href="/#/secciones">Ver Mas  <i className="fa fa-chevron-circle-right"></i></a>
                                </div>
                            </div>
                        </div>
                        <hr width="100%"/>
                    </div>
                    <div className="row">
                        <div className="col-md-12 mt-lg-4 mt-4">
                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h3 mb-0">Total de Niveles registrados</h1>
                                <a href="/#/niveles" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i className="fas fa-download fa-sm text-white-50"></i>
                                Ver mas de Niveles</a>
                            </div>
                        </div>
                        <div className="col-md-12 mt-lg-4 mt-4">
                        {niveles &&
                            <Grid
                                hover
                                striped
                                data={niveles}
                                loading={loader}
                                //onPageChange={onPageChange}
                                //onSortChange={onSortChange}
                            >
                                <TableHeaderColumn
                                    isKey
                                    dataField="nombre_nivel"
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
                                    dataField="fecha_creado"
                                    dataSort
                                >
                                    Fecha de creacion
                                </TableHeaderColumn>
                            </Grid>
                        }
                        </div>
                    </div>
                </div>
                <br/>
            </React.Fragment>
        );
    }
}

export default DashboardAdmin;
