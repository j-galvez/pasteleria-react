import pasteleriaLogo from "../assets/pasteleria-logo.svg";
import { NavLink, Link } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";
import '../styles/navbarFooter.css'


export default function NavbarAdmin(){
    return(
        <nav className="navbar navbar-expand-lg navbar-custom" >
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img src={pasteleriaLogo} alt="Logo Pastelería" style={{ height: "2.5rem", width: "auto" }}/>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/administrador">Administrador</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/administrador/producto">Productos</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/administrador/usuario">Usuarios</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/administrador/ventas">Ventas</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/index">Salir</NavLink>
                        </li>
                    </ul>
                </div>
                <div className="d-flex ms-auto me-3">
        </div>
            </div>
        </nav>
    );
}















