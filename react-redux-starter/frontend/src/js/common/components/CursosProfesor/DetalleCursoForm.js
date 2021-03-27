import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import asignacion from '../../../redux/modules/asignacion/asignacion';
import {renderField, renderFilePicker}from '../Utils/renderField/renderField'
import './card.css';

class DetalleCursoForm extends Component{
    componentWillUnmount=()=>{
        const {clearFile}=this.props;
        clearFile();
    }
    render(){
        const {handleSubmit, asignacion, curso, setPortada, portada}=this.props;

        //const { archivo, archivo_tarea, handleSubmit} = this.props;
        return(
            <form onSubmit={handleSubmit} className="mb-3 col-12">
                <br/>
                <div className="card mb3 col-12" >
                    <br/>
                    <div className="row">
                        <div className="col-md-12 mt-lg-4 mt-4">
                            <div className="d-sm-flex align-items-center justify-content-center mb-4">
                                <h1 className="h3 mb-0">Curso: {curso && curso}</h1>
                            </div>
                        </div>
                        <hr width="100%"/>

                        <div className="col-lg-12 col-sm-12">
                            <label>Portada</label>
                            <Field
                                    accept="image/*,.pdf,document/*"
                                    setFile={setPortada}
                                    name="portada"
                                    photo={portada}
                                    component={renderFilePicker}
                                />
                        </div>
                        <div className="col-lg-12 col-sm-12">
                            <div className="d-flex flex-row justify-content-end mt-2">
                                <button
                                    className='btn btn-sm btn-success'
                                    type='submit'
                                >
                                Agregar Portada
                                </button>
                            </div>
                        </div>
                        <Field name="asignacion" type="hidden" component={renderField} />
                        <hr width="100%"/>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-sm-12">
                            <div className="circle-tile ">
                                <a href={`/#/tareasasignacion/${asignacion}`}><div className="circle-tile-heading dark-blue"><i className="fa fa-cube fa-fw fa-3x"></i></div></a>
                                <div className="circle-tile-content dark-blue">
                                    <div className="circle-tile-description text-faded"> Tareas</div>
                                    <div className="circle-tile-number text-faded "></div>
                                    <a className="circle-tile-footer" href={`/#/tareasasignacion/${asignacion}`}>Ver Mas  <i className="fa fa-chevron-circle-right"></i></a>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6 col-sm-12">
                            <div className="circle-tile ">
                                <a href={`/#/materialesasignacion/${asignacion}`}><div className="circle-tile-heading red"><i className="fa fa-cube fa-fw fa-3x"></i></div></a>
                                <div className="circle-tile-content red">
                                    <div className="circle-tile-description text-faded"> Materiales</div>
                                    <div className="circle-tile-number text-faded "></div>
                                    <a className="circle-tile-footer" href={`/#/materialesasignacion/${asignacion}`}>Ver Mas  <i className="fa fa-chevron-circle-right"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-sm-12">
                            <div className="circle-tile ">
                                <a href={`/#/cursosprofesor/${asignacion}/editar`}><div className="circle-tile-heading blue"><i className="fa fa-cube fa-fw fa-3x"></i></div></a>
                                <div className="circle-tile-content blue">
                                    <div className="circle-tile-description text-faded"> Asignar estudiantes al curso</div>
                                    <div className="circle-tile-number text-faded "></div>
                                    <a className="circle-tile-footer" href={`/#/cursosprofesor/${asignacion}/editar`}>Ver Mas  <i className="fa fa-chevron-circle-right"></i></a>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6 col-sm-12">
                            <div className="circle-tile ">
                                <a href={`/#/calificaciones/${asignacion}`}><div className="circle-tile-heading gray"><i className="fa fa-cubes fa-fw fa-3x"></i></div></a>
                                <div className="circle-tile-content gray">
                                    <div className="circle-tile-description text-faded"> Calificar tareas </div>
                                    <div className="circle-tile-number text-faded "></div>
                                    <a className="circle-tile-footer" href={`/#/calificaciones/${asignacion}`}>Ver Mas  <i className="fa fa-chevron-circle-right"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
            </form>
        );
    }
}
export default reduxForm({
    form:'detalle_curso' // a unique identifier for this form
})(DetalleCursoForm)

