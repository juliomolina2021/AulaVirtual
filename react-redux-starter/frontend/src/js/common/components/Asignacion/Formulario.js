import { fromPairs } from 'lodash';
import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { AsyncSelectField, renderField, } from '../Utils/renderField/renderField';
import { api } from '../../../utility/api';

const obtenerGrados = (search) =>{
    return api.get("grado", {search}).then(data=>{
        if(data){
            const grados=[];
            data.results.forEach(grado=>{
                grados.push({
                    value: grado.id,
                    label: grado.nombre
                })
            })
            return grados;
        }
    }).catch(error=>{
        console.log("error: ", error);
        return  [];
    })
}

const obtenerSecciones = (search) =>{
    return api.get("seccion", {search}).then(data=>{
        if(data){
            const secciones=[];
            data.results.forEach(seccion=>{
                secciones.push({
                    value: seccion.id,
                    label: seccion.nombre
                })
            })
            return secciones;
        }
    }).catch(error=>{
        console.log("error: ", error);
        return  [];
    })
}
const obtenerCursos = (search) =>{
    return api.get("curso", {search}).then(data=>{
        if(data){
            const cursos=[];
            data.results.forEach(curso=>{
                cursos.push({
                    value: curso.id,
                    label: curso.nombre
                })
            })
            return cursos;
        }
    }).catch(error=>{
        console.log("error: ", error);
        return  [];
    })
}
const obtenerProfesores = (search) =>{
    return api.get("profesor", {search}).then(data=>{
        if(data){
            const profesores=[];
            data.results.forEach(profesor=>{
                profesores.push({
                    value: profesor.id,
                    label: profesor.perfil_profesor.user.first_name
                })
            })
            return profesores;
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
        let titulo = editar ? 'Editar Asignacion' : 'Registrar Asignacion';
        let disabled = false;
        if(crear == false && editar == false){
            disabled = true;
            titulo= 'Ver Asignacion';
        }

        return(
            <form onSubmit={handleSubmit} className='w-25'>
                <h3>{titulo}</h3>

                <label>Grado</label>
                <Field
                    name="grado"
                    loadOptions={obtenerGrados}
                    component={AsyncSelectField}
                    disabled={disabled}
                />
                <br/><br/>
                <label>Seccion</label>
                <Field
                    name="seccion"
                    loadOptions={obtenerSecciones}
                    component={AsyncSelectField}
                    disabled={disabled}
                />
                <br/><br/>
                <label>Curso</label>
                <Field
                    name="curso"
                    loadOptions={obtenerCursos}
                    component={AsyncSelectField}
                    disabled={disabled}
                />
                <br/><br/>
                <label>Profesor</label>
                <Field
                    name="profesor"
                    loadOptions={obtenerProfesores}
                    component={AsyncSelectField}
                    disabled={disabled}
                />
                <br/><br/>
                <label>Descripcion</label>
                <Field name='descripcion' component={renderField} disabled={disabled} />
                <br/>
                <div className='d-flex flex-row justify-content-end mt-2' >
                    <a
                        href='/#/asignaciones'
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
    form:'asignacion' // a unique identifier for this form
})(Formulario)

