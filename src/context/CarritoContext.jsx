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

  // ✅ Ahora agregarAlCarrito recibe el OBJETO producto completo
  const agregarAlCarrito = (producto) => {
    const item = {
      id: producto.id,
      nombre: producto.nombre || producto.nombre_producto,
      precio: Number(producto.precio),
      cantidad: 1,
    };

    setCarrito((prev) => {
      const existe = prev.find((p) => p.id === item.id);

      if (existe) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      }

      return [...prev, item];
    });
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((p) => p.id !== id));
  };

  const modificarCantidad = (id, cantidad) => {
    setCarrito((prev) =>
      prev
        .map((p) =>
          p.id === id ? { ...p, cantidad: parseInt(cantidad) } : p
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
