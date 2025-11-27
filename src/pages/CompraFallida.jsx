import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function CompraFallida() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { cliente, carrito, totalConDescuento, codigoOrden } = state || {};

  return (
    <main className="container my-5">
      <div className="card shadow">
        <div className="card-body">
          <h3 className="text-danger mb-3">
            ❌ No se pudo realizar el pago. nro #{codigoOrden}
          </h3>

          <button
            className="btn btn-success mb-4"
            onClick={() => navigate("/checkout")}
          >
            Volver a realizar el pago
          </button>

          <table className="table text-center">
            <thead className="table-light">
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {carrito?.map((item, i) => (
                <tr key={i}>
                  <td>{item.nombre}</td>
                  <td>${(item.precio || 0).toLocaleString()}</td>
                  <td>{item.cantidad || 0}</td>
                  <td>${((item.precio || 0) * (item.cantidad || 0)).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h4 className="text-end mt-4">Total a pagar: ${(totalConDescuento || 0).toLocaleString()}</h4>
        </div>
      </div>
    </main>
  );
}
