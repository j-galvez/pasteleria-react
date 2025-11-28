import React from "react";

import "../utils/Carrito.logic.js"; // <-- Importa la lógica antes de usarla
import { useCarrito } from '../context/CarritoContext';
import { NavLink } from "react-router-dom";

export default function Carrito() {
  const { carrito, eliminarDelCarrito, modificarCantidad } = useCarrito();

  // 🔹 Usamos las funciones desde la lógica externa
  const usuario = window.CarritoLogic.obtenerUsuarioLogueado();
  const total = window.CarritoLogic.calcularTotal(carrito);

  // 🔹 Obtenemos descuento y mensaje desde la lógica
  const { descuento, mensajeBeneficio } =
    window.CarritoLogic.obtenerDescuentoYMensaje(usuario);

  const totalConDescuento = window.CarritoLogic.calcularTotalConDescuento(
    total,
    descuento
  );

  return (
    <main>
      <h1>Carrito de Compras</h1>
      <div className="carrito-box">
        <div id="carrito-contenido">
          {carrito.length === 0 ? (
            <p>El carrito está vacío.</p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left" }}>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Total</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {carrito.map((p) => {
                  // 🔹 Validamos precio y cantidad antes de multiplicar
                  const precio = parseFloat(p.precio);
                  const cantidad = parseFloat(p.cantidad);
                  const subtotal =
                    !isNaN(precio) && !isNaN(cantidad)
                      ? precio * cantidad
                      : 0;

                  return (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>${!isNaN(precio) ? precio.toLocaleString() : '0'}</td>
                      <td>
                        <input
                          type="number"
                          min="1"
                          value={p.cantidad}
                          style={{ width: 60 }}
                          onChange={(e) =>
                            modificarCantidad(p.id, e.target.value)
                          }
                        />
                      </td>
                      <td>${subtotal.toLocaleString()}</td>
                      <td>
                        <button
                          onClick={() => eliminarDelCarrito(p.id)}
                          title="Eliminar"
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="20"
                            width="20"
                            fill="#8B4513"
                            viewBox="0 0 24 24"
                          >
                            <path d="M3 6h18v2H3V6zm2 3h14l-1.5 14h-11L5 9zm3 2v10h2V11H8zm4 0v10h2V11h-2z" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {descuento > 0 && (
                  <tr>
                    <td
                      colSpan={3}
                      style={{
                        textAlign: "right",
                        fontWeight: "bold",
                        color: "#8B4513",
                      }}
                    >
                      Descuento:
                    </td>
                    <td colSpan={2} style={{ color: "#8B4513" }}>
                      -{(descuento * 100).toFixed(0)}%
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        <div id="carrito-resumen" style={{ marginTop: 16 }}>
          <h3>Total: ${totalConDescuento.toLocaleString()}</h3>

          {mensajeBeneficio && (
            <p style={{ color: "#8B4513" }}>{mensajeBeneficio}</p>
          )}

          {usuario &&
            usuario.beneficios &&
            usuario.beneficios.tortaGratisCumple && (
              <p style={{ color: "#8B4513" }}>
                ¡El día de tu cumpleaños tienes una torta gratis!
              </p>
            )}

          <div style={{ textAlign: "right", marginTop: "20px" }}>
            <NavLink to="/checkout" className="btn btn-success">
              Ir a pagar
            </NavLink>
          </div>
        </div>
      </div>
    </main>
  );
}
