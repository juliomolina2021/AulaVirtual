import { fromPairs } from 'lodash';
import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { renderField, renderFilePicker } from '../Utils/renderField/renderField';

class Formulario extends Component{
    componentWillUnmount=()=>{
        const {clearFile}=this.props;
        clearFile();
    }
    render(){
        const { handleSubmit, crear, setArchivo, archivo, asignacion} = this.props;
        const editar = window.location.href.includes('editar')
        let titulo = editar ? 'Editar Material' : 'Registrar Material';
        let disabled = false;
        if(crear == false && editar == false){
            disabled = true;
            titulo= 'Ver Material';
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
                <a href={archivo} target="_blank" >Adjunto</a>
                <br/><br/>
                <label>Titulo</label>
                <Field name='nombre_material' component={renderField} disabled={disabled}/>
                <br/><br/>
                <label>Descripcion</label>
                <Field name='descripcion' component={renderField} disabled={disabled} />
                <br/><br/>
                <Field
                    name='asignacion'
                    type="hidden"
                    component={renderField}
                    disabled={disabled}
                />

                <div className='d-flex flex-row justify-content-end mt-2' >
                    <a
                        href={`/#/materialesasignacion/${asignacion}`}
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
    form:'material' // a unique identifier for this form
})(Formulario)

