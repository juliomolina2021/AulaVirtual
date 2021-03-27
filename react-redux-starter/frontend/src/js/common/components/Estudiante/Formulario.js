import { fromPairs } from 'lodash';
import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import {
    renderField,
}from '../Utils/renderField/renderField'

class Formulario extends Component{
    render(){
        const {handleSubmit, crear} = this.props;
        const editar = window.location.href.includes('editar')
        let titulo = editar ? 'Editar Estudiante' : 'Registrar Estudiante';
        let disabled = false;
        if(crear == false && editar == false){
            disabled = true;
            titulo= 'Ver Estudiante';
        }
        return(
            <form onSubmit={handleSubmit} className="mb-3 col-12">
                <h3>{titulo}</h3>
                <div className="row">
                    <div className="col-md-4 col-12 mb-2">
                        <label>Nombre</label>
                        <Field name='first_name' component={renderField} disabled= {disabled}/>
                    </div>
                    <div className="col-md-4 col-12 mb-2">
                        <label>Apellidos</label>
                        <Field name='last_name' component={renderField} disabled= {disabled}/>
                    </div>
                    <div className="col-md-4 col-12 mb-2">
                        <label>Dirección</label>
                        <Field name='address' component={renderField} disabled= {disabled}/>
                    </div>
                    <div className="col-md-4 col-12 mb-2">
                        <label>Teléfono</label>
                        <Field name='phone' component={renderField} disabled= {disabled}/>
                    </div>
                    <div className="col-md-4 col-12 mb-2">
                        <label>Correo Electrónico</label>
                        <Field name='email' component={renderField} disabled= {disabled}/>
                    </div>
                    {(editar == false)  &&  (disabled == false)  &&
                        <div className="col-md-4 col-12 mb-2">
                            <label>Contraseña</label>
                            <Field name="password" type="password" component={renderField} disabled= {disabled}/>
                        </div>
                    }
                    <div className="col-md-4 col-12 mb-2">
                        <label>Carné</label>
                        <Field name='carnet' component={renderField} disabled= {disabled}/>
                    </div>
                    <div className="col-md-4 col-12 mb-2">
                        <label>Encargado</label>
                        <Field name='encargado' component={renderField} disabled= {disabled}/>
                    </div>
                    <div className="col-md-4 col-12 mb-2">
                        <label>Teléfono de Encargado</label>
                        <Field name='telefono_encargado' component={renderField} disabled= {disabled}/>
                    </div>
                </div>
                {/* <div className='d-flex flex-row justify-content-end mt-2' > */}
                <div className="col-md-6 col-12 mt-2">
                    <a
                        href='/#/estudiantes'
                        className='btn btn-secondary  btn-sm mr-2'>
                        Cancelar
                    </a>
                    {disabled == false  &&
                        <button
                            className={`btn btn-sm ${editar ? 'btn-success' : 'btn-primary'}`}
                            type='submit'
                        >
                            {editar ? 'Actualizar':'Registrar'}
                        </button>
                    }
                </div>
                <div className="col-md-4 col-12 mb-2">
                        <Field name='id_rol' type="hidden" component={renderField} disabled= {disabled}/>
                </div>

            </form>
        );
    }
}
export default reduxForm({
    form:'estudiante' // a unique identifier for this form
})(Formulario)

