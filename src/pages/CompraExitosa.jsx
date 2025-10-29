import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function CompraExitosa() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { cliente, carrito, totalConDescuento, codigoOrden } = state || {};

  return (
    <main className="container my-5">
      <div className="card shadow">
        <div className="card-body">
          <h3 className="text-success mb-3">
            ✅ Se ha realizado la compra. nro #{codigoOrden}
          </h3>
          <p>Completa la siguiente información</p>

          <div className="mb-4">
            <h5>Nombre:</h5>
            <p>{cliente?.nombre} {cliente?.apellidos}</p>
            <h5>Correo:</h5>
            <p>{cliente?.correo}</p>
          </div>

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
                  <td>${item.precio.toLocaleString()}</td>
                  <td>{item.cantidad}</td>
                  <td>${(item.precio * item.cantidad).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h4 className="text-end mt-4">Total pagado: ${totalConDescuento.toLocaleString()}</h4>

          <div className="d-flex justify-content-end mt-4 gap-2">
            <button className="btn btn-danger">Imprimir boleta en PDF</button>
            <button className="btn btn-success">Enviar boleta por email</button>
          </div>
        </div>
      </div>
    </main>
  );
}
