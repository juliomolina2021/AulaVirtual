import { fromPairs } from 'lodash';
import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { AsyncSelectField, renderField, renderDatePicker } from '../Utils/renderField/renderField';

class Formulario extends Component{
    render(){
        const {handleSubmit, crear} = this.props;
        const editar = window.location.href.includes('editar')
        let titulo = editar ? 'Editar Evento' : 'Registrar Evento';
        let disabled = false;
        if(crear == false && editar == false){
            disabled = true;
            titulo= 'Ver Evento';
        }

        return(
            <form onSubmit={handleSubmit} className='w-25'>
                <h3>{titulo}</h3>
                <br/>
                <label>Nombre Evento</label>
                <Field name='nombre_evento' component={renderField} disabled={disabled} />
                <br/><br/>
                <label>Descripcion</label>
                <Field name='descripcion' component={renderField} disabled={disabled} />
                <br/><br/>
                <label>Fecha evento</label>
                <Field
                    name="fecha_evento"
                    type="date_picker_field"
                    component={renderDatePicker}
                    disabled={disabled}
                />
                <br/><br/>
                <label>Hora de evento</label>
                <Field
                    name='hora_evento'
                    type='time'
                    component={renderField}
                    disabled={disabled}
                />
                <br/>
                <div className='d-flex flex-row justify-content-end mt-2' >
                    <a
                        href='/#/eventos'
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
    form:'evento' // a unique identifier for this form
})(Formulario)

