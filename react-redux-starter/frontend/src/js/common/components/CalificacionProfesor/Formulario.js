import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import {renderField}from '../Utils/renderField/renderField'

class Formulario extends Component{
    componentWillUnmount=()=>{
        const {clearFile}=this.props;
        clearFile();
    }
    render(){
        const {handleSubmit, archivo, archivo_tarea} = this.props;
        return(
            <form onSubmit={handleSubmit} className="mb-3 col-12">
                <br/>
                <div className="card mb3 col-12" >
                    <br/>
                    <center><h3>Informacion tarea</h3></center>
                    <br/>
                    <div className="row">
                        <div className="col-md-4 col-12 mb-2">
                            <label>Nombre de Tarea</label>
                            <Field name='tarea.nombre_tarea' component={renderField} disabled={true}/>
                        </div>
                        <div className="col-md-4 col-12 mb-2">
                            <label>Fecha de Entrega</label>
                            <Field name='tarea.fecha_entrega' component={renderField} disabled= {true}/>
                        </div>
                        <div className="col-md-4 col-12 mb-2">
                            <label>Hora de Entrega</label>
                            <Field name='tarea.hora_entrega' component={renderField} disabled= {true}/>
                        </div>
                        <div className="col-md-4 col-12 mb-2">
                            <label>Valor de tarea</label>
                            <Field name='tarea.nota' component={renderField} disabled= {true}/>
                        </div>                         <div className="col-md-4 col-12 mb-2">
                            <label>Descripcion tarea</label>
                            <Field name='tarea.descripcion' component={renderField} disabled= {true}/>
                        </div>
                        <div className="col-md-4 col-12 mb-2">
                            <label>Tarea</label><br/>
                            <a className="btn btn-primary" href={archivo_tarea} target="_blank" >Click aqui para descargar</a>
                        </div>
                    </div>
                    <br/>
                </div>
                <br/>
                <div className="card mb3 col-12" >
                    <br/>
                    <center><h3>Informacion entrega</h3></center>
                    <br/>
                    <div className="row">
                        <div className="col-md-4 col-12 mb-2">
                            <label>Nombre Estudiante</label>
                            <Field name='estudiante.profile.user.first_name' component={renderField} disabled={true}/>
                        </div>
                        <div className="col-md-4 col-12 mb-2">
                            <label>Apellido Estudiante</label>
                            <Field name='estudiante.profile.user.last_name' component={renderField} disabled= {true}/>
                        </div>
                        <div className="col-md-4 col-12 mb-2">
                            <label>Carne</label>
                            <Field name='estudiante.carnet' component={renderField} disabled= {true}/>
                        </div>
                        <div className="col-md-4 col-12 mb-2">
                            <label>Fecha de la ultima subida</label>
                            <Field name='fecha_entrega' component={renderField} disabled= {true}/>
                        </div>
                        <div className="col-md-4 col-12 mb-2">
                            <label>Comentario</label>
                            <Field name='comentario' component={renderField} disabled= {true}/>
                        </div>
                        <div className="col-md-4 col-12 mb-2">
                            <label>Archivo Recibido</label><br/>
                            <a className="btn btn-primary" href={archivo} target="_blank" >Click aqui para descargar</a>
                        </div>
                        <hr width="100%"/>
                        <div className="card-footer mb3 col-12">
                            <div className="row">

                                <div className="col-md-4 col-12 mb-2">
                                    <label>Estado de calificacion</label>
                                    <Field name='estado_calificacion' component={renderField} disabled= {true}/>
                                </div>
                                <div className="col-md-4 col-12 mb-2">
                                    <label>Ingresa la calificacion</label>
                                    <Field name='calificacion' component={renderField} disabled={false}/>
                                </div>
                                <div className='col-md-4 col-12 mb-2' >
                                    <label>Enviar Calificacion</label><br/>
                                    <button className={`btn btn-sm  btn-success`}type='submit'>
                                        Calificar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br/>
                </div>
                <br/>
            </form>
        );
    }
}
export default reduxForm({
    form:'tarea_calificacion' // a unique identifier for this form
})(Formulario)

