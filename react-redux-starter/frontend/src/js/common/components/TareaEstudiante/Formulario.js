import { fromPairs } from 'lodash';
import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { renderField, renderFilePicker, renderTextArea} from '../Utils/renderField/renderField';

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
                    disabled={disabled}
                />

                <br/><br/>
                <label>Comentarios de la entrega (opcional)</label>
                <Field name='comentario' component={renderTextArea} disabled={disabled}/>
                <br/><br/>

                <Field
                    name='tarea'
                    type="hidden"
                    component={renderField}
                    disabled={disabled}
                />
                <Field
                    name='estudiante'
                    type="hidden"
                    component={renderField}
                    disabled={disabled}
                />
                <Field
                    name='tarea'
                    type="hidden"
                    component={renderField}
                    disabled={disabled}
                />
                <br/><br/>
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
                            //onClick={()=>{getMe()}}
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
    form:'tarea_estudiante' // a unique identifier for this form
})(Formulario)

