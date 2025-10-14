import { useState, useRef, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import pastelerialogo from "../assets/pasteleria-logo.svg";

export default function Navbar() {
  const [carroOpen, setCarroOpen] = useState(false);
  const carroRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (carroRef.current && !carroRef.current.contains(event.target)) {
        setCarroOpen(false);
      }
    }
    if (carroOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [carroOpen]);

  return (
    <header>
      <Link to="/" className="logo">
        <img src={pastelerialogo} alt="Pasteleria Logo" style={{ height: "2.5rem", width: "auto" }} />
      </Link>
      <nav className="navbar">
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li>
            <NavLink to="/productos">Productos</NavLink>
            <ul className="dropdown">
              <li><NavLink to="/tortas">Tortas</NavLink></li>
              <li><NavLink to="/postres">Postres</NavLink></li>
            </ul>
          </li>
          <li><NavLink to="/nosotros">Nosotros</NavLink></li>
          <li><NavLink to="/blogs">Blogs</NavLink></li>
          <li><NavLink to="/contacto">Contacto</NavLink></li>
        </ul>
      </nav>
      <div
        className="carro"
        id="carro-btn"
        tabIndex="0"
        ref={carroRef}
        onClick={() => setCarroOpen((open) => !open)}
        style={{ position: "relative", cursor: "pointer" }}
      >
        🛒 Carro <span id="carro-cantidad">0</span>
        {carroOpen && (
          <div id="carro-dropdown" className="carro-dropdown" style={{ position: "absolute", right: 0, top: "100%" }}>
            <div id="carro-lista"></div>
            <Link to="/carrito" className="btn-pagar" style={{ marginTop: "10px", display: "block", textAlign: "center" }}>
              Ir a carrito
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}