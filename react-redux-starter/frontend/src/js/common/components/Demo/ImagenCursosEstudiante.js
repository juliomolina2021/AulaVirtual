import React from  'react'
import './card.css';

const Imagen=(props)=>{
    const {portada, curso, color,nombre_profesor , apellido_profesor} = props;
    return(
        <React.Fragment>
            <div className="col-12 col-sm-6 col-md-4 col-lg-4 mb-4">
                <div className="card">
                    <a>
                    {!portada && <img src={`http://localhost:8000/media/Avatar/default.png`} className="card-img-top" height="150px"/> }
                    {portada && <img src={`http://localhost:8000${portada}`} className="card-img-top" height="150px"/> }
                    </a>
                    <div className={`card-body text-faded ${color}`} >
                        <center><label>Curso: {curso}</label></center>
                        <p className="text-faded ">
                            Profesor que imparte el curso<br/>
                            <center>{`${nombre_profesor} ${apellido_profesor}`}</center><br/>

                        </p>
                    </div>
                    <center><a className={`circle-tile-footer ${color}`}  href={`/#/cursosestudiantes`}>Ver Mas  <i className="fa fa-chevron-circle-right"></i></a></center>
                </div>
            </div>
        </React.Fragment>
    )
}
export default Imagen;
