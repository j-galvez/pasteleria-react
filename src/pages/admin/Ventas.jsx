import React, { useState, useEffect } from 'react';
import '../../styles/style.css'; // Importamos los estilos para que se vea como el resto del admin

export default function Ventas() {
    const [ventas, setVentas] = useState([]);

    useEffect(() => {
        // Cargar las ventas desde localStorage al montar el componente
        const ventasGuardadas = JSON.parse(localStorage.getItem("ventas")) || [];
        setVentas(ventasGuardadas);
    }, []);

    return (
        <main className="content">
            <h1>Reporte de Ventas</h1>
            <p>Total de ventas realizadas: {ventas.length}</p>

            <div className="seccion">
                <h2>Detalle de Ventas</h2>
                {ventas.length === 0 ? (
                    <p>Aún no se han registrado ventas.</p>
                ) : (
                    <div className="tabla-wrapper" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                        <table className="productos-tabla">
                            <thead>
                                <tr>
                                    <th>ID Venta</th>
                                    <th>Fecha</th>
                                    <th>Cliente</th>
                                    <th>Correo</th>
                                    <th>Productos</th>
                                    <th>Total Pagado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ventas.map(venta => (
                                    <tr key={venta.id}>
                                        <td>{venta.id}</td>
                                        <td>{venta.fecha}</td>
                                        <td>{venta.cliente.nombre} {venta.cliente.apellidos}</td>
                                        <td>{venta.cliente.correo}</td>
                                        <td>
                                            <ul>
                                                {venta.carrito.map((item, index) => (
                                                    <li key={index}>
                                                        {item.nombre} (x{item.cantidad})
                                                    </li>
                                                ))}
                                            </ul>
                                        </td>
                                        <td>${venta.totalPagado.toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </main>
    );
}