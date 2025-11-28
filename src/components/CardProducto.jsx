import React, { useState } from "react";
import { imagenesProductos, imagenPorDefecto } from "../api/imagenesProductos";
import { Card, Button } from "react-bootstrap";

export default function ProductoCard({ producto, agregarAlCarrito }) {
    const [mostrarDetalle, setMostrarDetalle] = useState(false);

    const imagen = imagenesProductos[Number(producto.id)] || imagenPorDefecto;

    return (
        <Card className="mb-4 shadow-sm" style={{ width: "18rem" }}>
            <Card.Img variant="top" src={imagen} alt={producto.nombre || producto.nombre_producto || ''} />

            <Card.Body>
                <Card.Title>{producto.nombre || producto.nombre_producto || 'Producto sin nombre'}</Card.Title>

                <Card.Text className="text-muted">
                    ${producto.precio.toLocaleString()}
                </Card.Text>

                {mostrarDetalle && (
                    <Card.Text style={{ fontSize: "0.9rem" }}>
                        {producto.descripcion}
                    </Card.Text>
                )}

                <Button 
                    variant="primary" 
                    className="me-2"
                    onClick={() => agregarAlCarrito(producto)}
                >
                    Agregar
                </Button>

                <Button 
                    variant="secondary" 
                    onClick={() => setMostrarDetalle(!mostrarDetalle)}
                >
                    {mostrarDetalle ? "Ocultar" : "Detalle"}
                </Button>
            </Card.Body>
        </Card>
    );
}
