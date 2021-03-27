import { fromPairs } from 'lodash';
import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import {
    AsyncSelectField,
    renderField,
}from '../Utils/renderField/renderField'
import { api } from '../../../utility/api';

const obtenerProfesiones = (search) =>{
    return api.get("profesion", {search}).then(data=>{
        if(data){
            const profesiones=[];
            data.results.forEach(profesion=>{
                profesiones.push({
                    value: profesion.id,
                    label: profesion.nombre_profesion
                })
            })
            return profesiones;
        }
    }).catch(error=>{
        console.log("error: ", error);
        return  [];
    })
}

class Formulario extends Component{
    render(){
        const {handleSubmit, crear} = this.props;
        const editar = window.location.href.includes('editar')
        let titulo = editar ? 'Editar Profesor' : 'Registrar Profesor';
        let disabled = false;
        if(crear == false && editar == false){
            disabled = true;
            titulo= 'Ver Profesor';
        }
        return(
            <form onSubmit={handleSubmit} className="mb-3 col-12">
                <center><h3>{titulo}</h3></center>
                <br/>
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
                        <label>Profesion</label>
                        <Field name="profesion" loadOptions={obtenerProfesiones} component={AsyncSelectField} disabled={disabled} />
                    </div>
                    <div className="col-md-4 col-12 mb-2">
                        <Field name="id_rol" type="hidden" component={renderField} disabled= {disabled}/>
                    </div>
                </div>
                {/* <div className='d-flex flex-row justify-content-end mt-2' > */}
                <div className="col-md-6 col-12 mt-2">
                    <a
                        href='/#/profesores'
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

            </form>
        );
    }
}
export default reduxForm({
    form:'profesor' // a unique identifier for this form
})(Formulario)

