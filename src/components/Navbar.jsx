import pasteleriaLogo from "../assets/pasteleria-logo.svg";
import { NavLink, Link } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";
import '../styles/navbarFooter.css'


export default function Navbar(){
    const {carrito} = useCarrito();
    const totalCantidad = carrito.reduce((acc, p) => acc + (p.cantidad || 0), 0);
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
                            <NavLink className="nav-link" to="/">Inicio</NavLink>
                        </li>
                        
                        <li className="nav-item dropdown">
                            <button 
                                className="nav-link dropdown-toggle" 
                                data-bs-toggle="dropdown" 
                                aria-expanded="false"
                            >
                                Productos
                            </button>
                            <ul className="dropdown-menu dropdown-menu-custom">
                                <li><NavLink className="dropdown-item" to="/tortas">Tortas</NavLink></li>
                                <li><NavLink className="dropdown-item" to="/postres">Postres</NavLink></li>
                            </ul>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/nosotros">Nosotros</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/blogs">Blogs</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contacto">Contacto</NavLink>
                        </li>
                    </ul>
                </div>
                <div className="d-flex ms-auto me-3">
          <div className="dropdown">
            <button
              className="btn btn-outline-dark dropdown-toggle position-relative"
              type="button"
              id="carroDropdownBtn"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              🛒 Carro
              {/* Badge que muestra la cantidad total */}
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {totalCantidad > 0 ? totalCantidad : ""}
                <span className="visually-hidden">Productos en el carrito</span>
              </span>
            </button>

            {/* Contenido del Dropdown del Carrito */}
            <ul
              className="dropdown-menu dropdown-menu-end" // 'dropdown-menu-end' para alinearlo a la derecha
              aria-labelledby="carroDropdownBtn"
              style={{ minWidth: "250px" }} // Ajusta el ancho
            >
              {carrito.length === 0 ? (
                <li className="dropdown-item text-center">
                  El carrito está vacío
                </li>
              ) : (
                <>
                  {/* Lista de Productos */}
                  {carrito.map((item) => (
                    <li key={item.nombre}>
                      <div className="dropdown-item d-flex justify-content-between align-items-center">
                        <div>
                          <strong>{item.nombre}</strong> <br />
                          <small>
                            ${(item.precio || 0).toLocaleString()} x {item.cantidad || 0}
                          </small>
                        </div>
                        <span className="badge bg-secondary">
                          ${((item.precio || 0) * (item.cantidad || 0)).toLocaleString()}
                        </span>
                      </div>
                    </li>
                  ))}
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  {/* Botón de Ir a Carrito */}
                  <li>
                    <Link
                      to="/carrito"
                      className="dropdown-item text-center bg-primary text-white"
                      style={{ borderRadius: "5px" }}
                    >
                      Ir a carrito
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
            </div>
        </nav>
    );
}
