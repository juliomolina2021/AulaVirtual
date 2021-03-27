import { fromPairs } from 'lodash';
import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { renderField, } from '../Utils/renderField/renderField';

class Formulario extends Component{
    render(){
        const {handleSubmit, crear} = this.props;
        const editar = window.location.href.includes('editar')
        let titulo = editar ? 'Editar Ciclo Escolar' : 'Registrar Ciclo Escolar';
        let disabled = false;
        if(crear == false && editar == false){
            disabled = true;
            titulo= 'Ver Ciclo Escolar';
        }

        return(
            <form onSubmit={handleSubmit} className='w-25'>
                <h3>{titulo}</h3>
                <label>Año</label>
                <Field name='anio' component={renderField} disabled={disabled} />
                <br/>
                <div className='d-flex flex-row justify-content-end mt-2' >
                    <a
                        href='/#/ciclos'
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
    form:'cicloForm' // a unique identifier for this form
})(Formulario)

