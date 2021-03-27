import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import asignacion from '../../../redux/modules/asignacion/asignacion';
import curso from '../../../redux/modules/curso/curso';
import {renderField, renderFilePicker}from '../Utils/renderField/renderField'
import './card.css';

class DetalleCurso extends Component{


    render(){

        const {match} = this.props;
        let asignacion=match.params.idasignacion;
        let curso= match.params.nombreCurso
        return(
            <React.Fragment>
                <br/>
                <div className="card mb3 col-12" >
                    <br/>
                    <div className="row">
                        <div className="col-md-12 mt-lg-4 mt-4">
                            <div className="d-sm-flex align-items-center justify-content-center mb-4">
                                <h1 className="h3 mb-0">Curso:  {curso}</h1>
                            </div>
                        </div>
                        <hr width="100%"/>

                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-sm-12">
                            <div className="circle-tile ">
                                <a href={`/#/tareasestudiante/${asignacion}`}><div className="circle-tile-heading dark-blue"><i className="fa fa-cube fa-fw fa-3x"></i></div></a>
                                <div className="circle-tile-content dark-blue">
                                    <div className="circle-tile-description text-faded"> Tareas</div>
                                    <div className="circle-tile-number text-faded "></div>
                                    <a className="circle-tile-footer" href={`/#/tareasestudiante/${asignacion}`}>Ver Mas  <i className="fa fa-chevron-circle-right"></i></a>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6 col-sm-12">
                            <div className="circle-tile ">
                                <a href={`/#/materialestudiante/${asignacion}`}><div className="circle-tile-heading red"><i className="fa fa-cube fa-fw fa-3x"></i></div></a>
                                <div className="circle-tile-content red">
                                    <div className="circle-tile-description text-faded"> Materiales</div>
                                    <div className="circle-tile-number text-faded "></div>
                                    <a className="circle-tile-footer" href={`/#/materialestudiante/${asignacion}`}>Ver Mas  <i className="fa fa-chevron-circle-right"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 col-sm-12">
                            <div className="circle-tile ">
                                <a href={`/#/Calificacionestudiante/${asignacion}`}><div className="circle-tile-heading blue"><i className="fa fa-cube fa-fw fa-3x"></i></div></a>
                                <div className="circle-tile-content blue">
                                    <div className="circle-tile-description text-faded">Calificaciones de tareas</div>
                                    <div className="circle-tile-number text-faded "></div>
                                    <a className="circle-tile-footer" href={`/#/Calificacionestudiante/${asignacion}`}>Ver Mas  <i className="fa fa-chevron-circle-right"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
            </React.Fragment>
        );
    }
}
export default DetalleCurso;

