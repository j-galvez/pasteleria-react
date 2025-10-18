import { createContext, useState, useRef, useEffect, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import pastelerialogo from "../assets/pasteleria-logo.svg";

// CREA Y EXPORTA EL CONTEXTO AQUÍ
export const CarritoContext = createContext();

export function useCarrito() {
  return useContext(CarritoContext);
}

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState(() => {
    return JSON.parse(localStorage.getItem("carrito")) || [];
  });

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (nombre, precio) => {
    setCarrito((prev) => {
      const existe = prev.find((p) => p.nombre === nombre);
      if (existe) {
        return prev.map((p) =>
          p.nombre === nombre ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      }
      return [...prev, { nombre, precio, cantidad: 1 }];
    });
  };

  const eliminarDelCarrito = (nombre) => {
    setCarrito((prev) => prev.filter((p) => p.nombre !== nombre));
  };

  const modificarCantidad = (nombre, cantidad) => {
    setCarrito((prev) =>
      prev
        .map((p) =>
          p.nombre === nombre ? { ...p, cantidad: parseInt(cantidad) } : p
        )
        .filter((p) => p.cantidad > 0)
    );
  };

  return (
    <CarritoContext.Provider
      value={{ carrito, agregarAlCarrito, eliminarDelCarrito, modificarCantidad }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export default function Navbar() {
  const [carroOpen, setCarroOpen] = useState(false);
  const carroRef = useRef();
  const { carrito } = useCarrito();

  // mostrar cantidad total (sumando cantidades) en el badge
  const totalCantidad = carrito.reduce((acc, p) => acc + (p.cantidad || 0), 0);

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
      <Link to="/index" className="logo">
        <img src={pastelerialogo} alt="Pasteleria Logo" style={{ height: "2.5rem", width: "auto" }} />
      </Link>
      <nav className="navbar">
        <ul>
          <li><NavLink to="/index">Home</NavLink></li>
          <li>
            <NavLink to="#">Productos</NavLink>
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
        🛒 Carro <span id="carro-cantidad">{totalCantidad}</span>
        {carroOpen && (
          <div id="carro-dropdown" className="carro-dropdown" style={{ position: "absolute", right: 0, top: "100%" }}>
            <div id="carro-lista">
              {carrito.length === 0 ? (
                <div style={{ padding: "10px", textAlign: "center" }}>El carrito está vacío</div>
              ) : (
                carrito.map((item) => (
                  <div key={item.nombre} style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
                    {item.nombre} - ${item.precio.toLocaleString()} x {item.cantidad} <span style={{ float: "right" }}>${(item.precio * item.cantidad).toLocaleString()}</span>
                  </div>
                ))
              )}
            </div>
            <Link to="/carrito" className="btn-pagar" style={{ marginTop: "10px", display: "block", textAlign: "center" }}>
              Ir a carrito
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}