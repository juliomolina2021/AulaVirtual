import { fromPairs } from 'lodash';
import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { AsyncSelectField, renderField, } from '../Utils/renderField/renderField';
import { api } from '../../../utility/api';

const obtenerEstudiantes = (search) =>{
    return api.get("estudiante", {search}).then(data=>{
        if(data){
            const estudiantes=[];
            data.results.forEach(estudiante=>{
                estudiantes.push({
                    value: estudiante.id,
                    label: `${estudiante.profile.user.first_name} ${estudiante.profile.user.last_name}`
                })
            })
            return estudiantes;
        }
    }).catch(error=>{
        console.log("error: ", error);
        return  [];
    })
}

class Formulario extends Component{
    render(){
        const {handleSubmit } = this.props;

        return(
            <form onSubmit={handleSubmit} className='w-25'>

                <label>Estudiantes</label>
                <Field
                    name="estudiante"
                    loadOptions={obtenerEstudiantes}
                    component={AsyncSelectField}
                />
                <br/><br/>
                {/* <Field name='idasigacion' type="text" component={renderField}/> */}
                <div className='d-flex flex-row justify-content-end mt-2' >
                    <a
                        href='/#/cursosprofesor'
                        className='btn btn-secondary  btn-sm mr-2'>
                        Cancelar
                    </a>
                    {/* {disabled == false  && */}
                        <button
                            className={`btn btn-sm btn-success`}
                            type='submit'
                        >
                           Asignar a Curso {/* {editar ? 'Actualizar':'Registrar'} */}
                        </button>
                    {/* } */}
                </div>

            </form>
        );
    }
}
export default reduxForm({
    form:'cursos_estudiante' // a unique identifier for this form
})(Formulario)

