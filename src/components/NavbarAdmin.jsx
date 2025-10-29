import { NavLink, Link } from "react-router-dom";
import pastelerialogo from "../assets/pasteleria-logo.svg";

export default function NavbarAdmin() {
     return (
    <header>
      <Link to="/administrador" className="logo">
        <img src={pastelerialogo} alt="Pasteleria Logo" style={{ height: "2.5rem", width: "auto" }} />
      </Link>
      <nav className="navbar">
        <ul>
          <li><NavLink to="/administrador">Home Admin</NavLink></li>
          <li><NavLink to="/administrador/producto">Productos</NavLink></li>
          <li><NavLink to="/administrador/ventas">Ventas</NavLink></li>
          <li><NavLink to="/administrador/usuario">Usuarios</NavLink></li>
          <li><NavLink to="/index">Salir</NavLink></li>
        </ul>
      </nav>
    </header>
    );
}
