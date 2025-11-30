import React, { useState, useEffect } from 'react';
import '../../utils/Producto.logic.js';

export default function Producto() {
    const [productos, setProductos] = useState([]);
    const [formData, setFormData] = useState({
        id: null,
        nombre_producto: "",
        precio: "",
        descripcion: "",
        categoria: ""
    });

    // ============================
    // 🔹 1) Cargar productos desde la BD
    // ============================
    useEffect(() => {
        fetch("http://localhost:8080/api/productos")
            .then(res => res.json())
            .then(data => {
                setProductos(data);
                console.log("Productos cargados desde la BD:", data);
            })
            .catch(err => console.error("Error cargando productos:", err));
    }, []);

    // ============================
    // 🔹 2) Actualizar formulario
    // ============================
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // ============================
    // 🔹 3) Guardar o actualizar producto
    // ============================
    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestOptions = {
            method: formData.id ? "PUT" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        };

        const url = formData.id
            ? `http://localhost:8080/api/productos/${formData.id}`
            : "http://localhost:8080/api/productos";

        const res = await fetch(url, requestOptions);
        const data = await res.json();

        if (formData.id) {
            // actualizar lista
            setProductos(prev =>
                prev.map(p => p.id === formData.id ? data : p)
            );
        } else {
            // agregar nuevo producto
            setProductos(prev => [...prev, data]);
        }

        // limpiar formulario
        setFormData({
            id: null,
            nombre_producto: "",
            precio: "",
            descripcion: "",
            categoria: ""
        });
    };

    // ============================
    // 🔹 4) Editar producto
    // ============================
    const handleEdit = (producto) => {
        setFormData({ ...producto });
    };

    // ============================
    // 🔹 5) Eliminar producto
    // ============================
    const handleDelete = async (id) => {
        await fetch(`http://localhost:8080/api/productos/${id}`, {
            method: "DELETE"
        });

        setProductos(prev => prev.filter(p => p.id !== id));
    };

    return (
        <main className="admin-productos" id="admin-productos">
            <h1>Gestión de Productos</h1>
            <p>Total productos: {productos.length}</p>

            {/* FORMULARIO */}
            <form onSubmit={handleSubmit} className="producto-form">
                <select name="categoria" value={formData.categoria} onChange={handleInputChange} required>
                    <option value="">Seleccione categoría</option>
                    <option value="Torta">Torta</option>
                    <option value="Postre">Postre</option>
                </select>

                <input type="text"
                       name="nombre_producto"
                       placeholder="Nombre del producto"
                       value={formData.nombre_producto}
                       onChange={handleInputChange}
                       required />

                <input type="number"
                       name="precio"
                       placeholder="Precio"
                       value={formData.precio}
                       onChange={handleInputChange}
                       required />

                <input type="text"
                       name="descripcion"
                       placeholder="Descripción"
                       value={formData.descripcion}
                       onChange={handleInputChange}
                       required />

                <button type="submit">
                    {formData.id ? "Actualizar Producto" : "Agregar Producto"}
                </button>
            </form>

            {/* TABLA */}
            <div className="productos-lista">
                <h2>Lista de Productos</h2>
                <div className="tabla-wrapper">
                    <table className="productos-tabla">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Categoría</th>
                                <th>Precio</th>
                                <th>Descripción</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.map((producto) => (
                                <tr key={producto.id}>
                                    <td>{producto.id}</td>
                                    <td>{producto.nombre_producto}</td>
                                    <td>{producto.categoria}</td>
                                    <td>{producto.precio}</td>
                                    <td>{producto.descripcion}</td>
                                    <td>
                                        <button onClick={() => handleEdit(producto)}>Editar</button>
                                        <button onClick={() => handleDelete(producto.id)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}
