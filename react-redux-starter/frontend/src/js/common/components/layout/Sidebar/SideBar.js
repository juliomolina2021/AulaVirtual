import React, { Component } from 'react';
import {Link, NavLink} from "react-router-dom";

class SideBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { toggleOpen, navToggle, logOut , user} = this.props;
        let rolUsuario="";
        if(!user.is_superuser){

            if(user.user_profile && user.user_profile.rol){
                rolUsuario=(user.user_profile.rol.nombre_rol).toUpperCase();
            }

        }
        return (
            <aside className={`main-sidebar px-0 col-12 col-md-3 col-lg-2 ${toggleOpen?'':'open'}`}>
                <div className="main-navbar">
                    <nav
                        className="align-items-stretch bg-white flex-md-nowrap border-bottom p-0 navbar navbar-light">
                        <a  href="#" className="w-100 mr-0 navbar-brand" >
                            <div className="d-table m-auto">
                                <img id="main-logo"
                                    className="d-inline-block align-top mr-1"
                                    src={require('assets/img/logo.png')}
                                    alt="Logo" />
                            </div>
                        </a>
                        <a  className="toggle-sidebar d-sm-inline d-md-none d-lg-none"
                            onClick={navToggle}>
                            <i className="material-icons"></i>
                        </a>
                    </nav>
                </div>
                <div className="nav-wrapper">
                    <ul className="nav--no-borders flex-column nav">
                        <li className="nav-item">
                            <NavLink to="/" exact className="nav-link " activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">edit</i>
                                </div>
                                <span>Home</span>
                            </NavLink>
                        </li>
                        {
                            user.is_superuser == true &&
                            <li className="nav-item">
                                <NavLink to="/asignaciones" exact className="nav-link " activeClassName={'active'}>
                                    <div className="d-inline-block item-icon-wrapper">
                                        <i className="material-icons">school</i>
                                    </div>
                                    <span>Asignacion</span>
                                </NavLink>
                            </li>
                        }
                        {
                            rolUsuario == "ESTUDIANTE" &&
                            <li className="nav-item">
                                <NavLink to="/cursosestudiantes" exact className="nav-link " activeClassName={'active'}>
                                    <div className="d-inline-block item-icon-wrapper">
                                        <i className="material-icons">school</i>
                                    </div>
                                    <span>Mis Cursos</span>
                                </NavLink>
                            </li>
                        }
                        {
                            rolUsuario == "PROFESOR" &&
                            <li className="nav-item">
                                <NavLink to="/cursosprofesor" exact className="nav-link " activeClassName={'active'}>
                                    <div className="d-inline-block item-icon-wrapper">
                                        <i className="material-icons">school</i>
                                    </div>
                                    <span>Mis Cursos</span>
                                </NavLink>
                            </li>
                        }
                        {
                            user.is_superuser == true &&
                            <li className="nav-item">
                                <NavLink to="/estudiantes" exact className="nav-link " activeClassName={'active'}>
                                    <div className="d-inline-block item-icon-wrapper">
                                        <i className="material-icons">school</i>
                                    </div>
                                    <span>Estudiantes</span>
                                </NavLink>
                            </li>
                        }
                        {
                            user.is_superuser == true &&
                            <li className="nav-item">
                                <NavLink to="/profesores" exact className="nav-link " activeClassName={'active'}>
                                    <div className="d-inline-block item-icon-wrapper">
                                        <i className="material-icons">school</i>
                                    </div>
                                    <span>Profesores</span>
                                </NavLink>
                            </li>
                        }
                        {
                            user.is_superuser == true &&
                            <li className="nav-item">
                                <NavLink to="/profesiones" exact className="nav-link " activeClassName={'active'}>
                                    <div className="d-inline-block item-icon-wrapper">
                                        <i className="material-icons">work</i>
                                    </div>
                                    <span>Profesiones</span>
                                </NavLink>
                            </li>
                        }
                        {
                            user.is_superuser == true &&
                            <li className="nav-item">
                                <NavLink to="/roles" exact className="nav-link " activeClassName={'active'}>
                                    <div className="d-inline-block item-icon-wrapper">
                                        <i className="material-icons">accessibility</i>
                                    </div>
                                    <span>Roles</span>
                                </NavLink>
                            </li>
                        }
                        {
                            user.is_superuser == true &&
                            <li className="nav-item">
                                <NavLink to="/niveles" exact className="nav-link " activeClassName={'active'}>
                                    <div className="d-inline-block item-icon-wrapper">
                                        <i className="material-icons">all_inbox</i>
                                    </div>
                                    <span>Niveles</span>
                                </NavLink>
                            </li>
                        }
                        {
                            user.is_superuser == true &&
                            <li className="nav-item">
                                <NavLink to="/grados" exact className="nav-link " activeClassName={'active'}>
                                    <div className="d-inline-block item-icon-wrapper">
                                        <i className="material-icons">all_inbox</i>
                                    </div>
                                    <span>Grados</span>
                                </NavLink>
                            </li>
                        }
                        {
                            user.is_superuser == true &&
                            <li className="nav-item">
                                <NavLink to="/eventos" exact className="nav-link " activeClassName={'active'}>
                                    <div className="d-inline-block item-icon-wrapper">
                                        <i className="material-icons">all_inbox</i>
                                    </div>
                                    <span>Eventos</span>
                                </NavLink>
                            </li>
                        }
                        {
                            user.is_superuser == true &&
                            <li className="nav-item">
                                <NavLink to="/ciclos" exact className="nav-link " activeClassName={'active'}>
                                    <div className="d-inline-block item-icon-wrapper">
                                        <i className="material-icons">calendar_today</i>
                                    </div>
                                    <span>Ciclos Escolares</span>
                                </NavLink>
                            </li>
                        }
                        {
                            user.is_superuser == true &&
                            <li className="nav-item">
                                <NavLink to="/secciones" exact className="nav-link " activeClassName={'active'}>
                                    <div className="d-inline-block item-icon-wrapper">
                                        <i className="material-icons">horizontal_split</i>
                                    </div>
                                    <span>Secciones</span>
                                </NavLink>
                            </li>
                        }
                        {
                            user.is_superuser == true &&
                            <li className="nav-item">
                                <NavLink to="/cursos" exact className="nav-link " activeClassName={'active'}>
                                    <div className="d-inline-block item-icon-wrapper">
                                        <i className="material-icons">menu_book</i>
                                    </div>
                                    <span>Cursos</span>
                                </NavLink>
                            </li>
                        }
                        {
                            user.is_superuser == true &&
                            <li className="nav-item">
                                <NavLink to="/page2" className="nav-link" activeClassName={'active'}>
                                    <div className="d-inline-block item-icon-wrapper">
                                        <i className="material-icons">vertical_split</i>
                                    </div>
                                    <span>Basic components</span>
                                </NavLink>
                            </li>
                        }
                        {
                            user.is_superuser == true &&
                            <li className="nav-item">
                                <NavLink to="/grids" className="nav-link" activeClassName={'active'}>
                                    <div className="d-inline-block item-icon-wrapper">
                                        <i className="material-icons">vertical_split</i>
                                    </div>
                                    <span>Grids</span>
                                </NavLink>
                            </li>
                        }
                        {
                            user.is_superuser == true &&
                            <li className="nav-item">
                                <NavLink to="/notifications" className="nav-link" activeClassName={'active'}>
                                    <div className="d-inline-block item-icon-wrapper">
                                        <i className="material-icons">vertical_split</i>
                                    </div>
                                    <span>Notificaciones</span>
                                </NavLink>
                            </li>
                        }
                        {
                            user.is_superuser == true &&
                            <li className="nav-item">
                                <NavLink to="/tabs" className="nav-link" activeClassName={'active'}>
                                    <div className="d-inline-block item-icon-wrapper">
                                        <i className="material-icons">vertical_split</i>
                                    </div>
                                    <span>Tabs</span>
                                </NavLink>
                            </li>
                        }
                        <li className="nav-item">
                            <Link to="/login" onClick={logOut} className="nav-link">
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">lock</i>
                                </div>
                                <span>Log Out</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>
        )
    }
}

export default SideBar;
