import { createContext, useState, useEffect, useContext } from "react";


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