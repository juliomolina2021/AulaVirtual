import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import {renderField}from '../Utils/renderField/renderField'

class InformacionTareaForm extends Component{
    componentWillMount=()=>{
        const {clearFile, match}=this.props;
        clearFile();
    }
    render(){
        const { archivo, archivo_tarea, handleSubmit} = this.props;
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
                            <Field name='nombre_tarea' component={renderField} disabled={true}/>
                        </div>
                        <div className="col-md-4 col-12 mb-2">
                            <label>Fecha de Entrega</label>
                            <Field name='fecha_entrega' component={renderField} disabled= {true}/>
                        </div>
                        <div className="col-md-4 col-12 mb-2">
                            <label>Hora de Entrega</label>
                            <Field name='hora_entrega' component={renderField} disabled= {true}/>
                        </div>
                        <div className="col-md-4 col-12 mb-2">
                            <label>Valor de tarea</label>
                            <Field name='nota' component={renderField} disabled= {true}/>
                        </div>                         <div className="col-md-4 col-12 mb-2">
                            <label>Descripcion tarea</label>
                            <Field name='descripcion' component={renderField} disabled= {true}/>
                        </div>
                        <div className="col-md-2 col-12 mb-2">
                            <label>Descargar tarea</label><br/>
                            <a className="btn btn-primary" href={archivo} target="_blank" >Tarea</a>
                        </div>
                        <div className="col-md-2 col-12 mb-2">
                            <label>Entregar tarea</label><br/>
                            <button className={`btn btn-success`} type='submit'>
                                Enviar
                            </button>
                        </div>
                        <br/>
                    </div>
                    <br/>

                </div>
                <br/>
            </form>
        );
    }
}
export default reduxForm({
    form:'informacion_tarea' // a unique identifier for this form
})(InformacionTareaForm)

