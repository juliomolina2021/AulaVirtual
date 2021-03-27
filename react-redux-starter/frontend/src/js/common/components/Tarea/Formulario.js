import { fromPairs } from 'lodash';
import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { renderField, renderFilePicker, renderDatePicker, renderNumber } from '../Utils/renderField/renderField';

class Formulario extends Component{
    componentWillUnMount=()=>{
        const {clearFile}=this.props;
        clearFile();
    }
    render(){
        const {handleSubmit, crear, setArchivo, archivo} = this.props;
        const editar = window.location.href.includes('editar')
        let titulo = editar ? 'Editar Tarea' : 'Registrar Tarea';
        let disabled = false;
        if(crear == false && editar == false){
            disabled = true;
            titulo= 'Ver Tarea';
        }

        return(
            <form onSubmit={handleSubmit} className='w-25'>
                <h3>{titulo}</h3>
                <label>Archivo</label>
                <Field
                    accept="image/*,.pdf,document/*"
                    setFile={setArchivo}
                    name="archivo"
                    photo={archivo}
                    component={renderFilePicker}
                />
                <a href={archivo} target="_blank" >Adjunto</a>
                <br/><br/>
                <label>Nombre</label>
                <Field name='nombre_tarea' component={renderField} disabled={disabled}/>
                <br/><br/>
                <label>Descripcion</label>
                <Field name='descripcion' component={renderField} disabled={disabled} />
                <br/><br/>
                <label>Punteo</label>
                <Field
                    disabled={disabled}
                    decimalScale={2}
                    name="nota"
                    placeholder="Nota de Tarea"
                    component={renderNumber}
                />
                <br/><br/>
                <label>Fecha entrega</label>
                <Field
                    name="fecha_entrega"
                    type="date_picker_field"
                    component={renderDatePicker}
                    disabled={disabled}

                />
                <br/><br/>
                <label>Hora de entrega</label>
                <Field
                    name='hora_entrega'
                    type='time'
                    component={renderField}
                    disabled={disabled}
                />
                <br/><br/>
                <Field
                    name='asignacion'
                    type="hidden"
                    component={renderField}
                    disabled={disabled}
                />

                <div className='d-flex flex-row justify-content-end mt-2' >
                    <a
                        href={`/#/tareasasignacion/`}
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
    form:'tarea' // a unique identifier for this form
})(Formulario)

