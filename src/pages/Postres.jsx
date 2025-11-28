import React, { useEffect, useState } from "react";
import ProductoCard from "../components/CardProducto.jsx";
import { useCarrito } from "../context/CarritoContext";
import axios from "axios";

export default function Postres() {
    const { agregarAlCarrito } = useCarrito();
    const [productos, setProductos] = useState([]);

    useEffect(() => {
    axios.get("http://localhost:8080/api/productos")
        .then((res) => {
            console.log("Productos desde backend:", res.data); // 👈 VERIFICAR
            const soloPostres = res.data.filter(
                (p) => p.categoria?.trim().toLowerCase() === "postre" && typeof p.precio === 'number'
            );
            setProductos(soloPostres);
        })
        .catch((err) => console.log(err));
}, []);


    return (
        <main className="container py-4">
            <h1 className="mb-4">Nuestros Postres</h1>

            <div className="d-flex flex-wrap gap-3">
                {productos.map((producto) => (
                    <ProductoCard 
                        key={producto.id}
                        producto={producto}
                        agregarAlCarrito={agregarAlCarrito}
                    />
                ))}
            </div>
        </main>
    );
}