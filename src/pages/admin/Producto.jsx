import React, { useState, useEffect } from 'react';
import torta_chocolate from '../../assets/tortas/torta_chocolate.webp';
import fruta_tortawebp from '../../assets/tortas/fruta_tortawebp.webp';
import vainilla_circular from '../../assets/tortas/vainilla_circular.webp';
import manjar_redondawebp from '../../assets/tortas/manjar_redondawebp.webp';
import naranja_torta from '../../assets/tortas/naranja_torta.webp';
import chocolate_vegan from '../../assets/tortas/chocolate_vegan.webp';
import cumpleanos_torta from '../../assets/tortas/cumpleanos_torta.webp';
import boda_torta from '../../assets/tortas/boda_torta.webp';
import mousse_chocolate from '../../assets/postres/mousse_chocolate.webp';
import tiramisu_clasico from '../../assets/postres/tiramisu_clasico.webp';
import cheescake_noazucar from '../../assets/postres/cheescake_noazucar.webp';
import empanada_manzana from '../../assets/postres/empanada_manzana.webp';
import tarta_santiago from '../../assets/postres/tarta_santiago.webp';
import brownie from '../../assets/postres/brownie.webp';
import pan_nogluten from '../../assets/postres/pan_nogluten.jpg';
import galletas_avena from '../../assets/postres/galletas_avena.webp';
import '../../utils/Producto.logic.js'


// Datos iniciales de productos — usar las variables (rutas), no elementos JSX
const productosIniciales = [
    { categoria: "Tortas", nombre: "Torta Cuadrada Chocolate", precio: 45000, imagen: torta_chocolate },
    { categoria: "Tortas", nombre: "Torta Cuadrada Frutas", precio: 50000, imagen: fruta_tortawebp },
    { categoria: "Tortas", nombre: "Torta Circular Vainilla", precio: 40000, imagen: vainilla_circular },
    { categoria: "Tortas", nombre: "Torta Circular Manjar", precio: 42000, imagen: manjar_redondawebp },
    { categoria: "Tortas", nombre: "Torta Sin Azucar Naranja", precio: 48000, imagen: naranja_torta },
    { categoria: "Tortas", nombre: "Torta Vegana Chocolate", precio: 50000, imagen: chocolate_vegan },
    { categoria: "Tortas", nombre: "Torta Especial Cumpleaños", precio: 55000, imagen: cumpleanos_torta },
    { categoria: "Tortas", nombre: "Torta Especial Boda", precio: 60000, imagen: boda_torta },

    { categoria: "Postres", nombre: "Mousse Chocolate", precio: 5000, imagen: mousse_chocolate },
    { categoria: "Postres", nombre: "Tiramisú Clásico", precio: 5500, imagen: tiramisu_clasico },
    { categoria: "Postres", nombre: "Cheesecake Sin Azúcar", precio: 47000, imagen: cheescake_noazucar },
    { categoria: "Postres", nombre: "Empanada de Manzana", precio: 3000, imagen: empanada_manzana },
    { categoria: "Postres", nombre: "Tarta Santiago", precio: 6000, imagen: tarta_santiago },
    { categoria: "Postres", nombre: "Brownie Sin Gluten", precio: 4000, imagen: brownie },
    { categoria: "Postres", nombre: "Pan Sin Gluten", precio: 3500, imagen: pan_nogluten },
    { categoria: "Postres", nombre: "Galletas Veganas de Avena", precio: 4000, imagen: galletas_avena }
];

export default function Producto() {
    const [productos, setProductos] = useState(productosIniciales);
    const [formData, setFormData] = useState({ categoria: '', nombre: '', precio: '', imagen: '' });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        console.log('Productos cargados:', productos);
    }, [productos]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => window.ProductoLogic.actualizarFormData(prev, name, value));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId !== null) {
            setProductos(prev => window.ProductoLogic.editarProducto(prev, formData, editingId));
            setEditingId(null);
        } else {
            setProductos(prev => window.ProductoLogic.agregarProducto(prev, formData));
        }
        setFormData(window.ProductoLogic.limpiarForm());
    };


    const handleEdit = (index) => {
        setFormData(productos[index]);
        setEditingId(index);
    };

    const handleDelete = (index) => {
        setProductos(prev => window.ProductoLogic.eliminarProducto(prev, index));
    };


    return (
        <main className="admin-productos" id="admin-productos">
            <h1>Gestión de Productos</h1>
            <p>Total productos: {productos.length}</p>

            <form onSubmit={handleSubmit} className="producto-form">
                <select name="categoria" value={formData.categoria} onChange={handleInputChange} required>
                    <option value="">Seleccione categoría</option>
                    <option value="Tortas">Tortas</option>
                    <option value="Postres">Postres</option>
                </select>

                <input type="text" name="nombre" placeholder="Nombre del producto" value={formData.nombre} onChange={handleInputChange} required />
                <input type="number" name="precio" placeholder="Precio" value={formData.precio} onChange={handleInputChange} required />
                <input type="text" name="imagen" placeholder="URL de la imagen (opcional)" value={formData.imagen} onChange={handleInputChange} />

                <button type="submit">{editingId !== null ? 'Actualizar Producto' : 'Agregar Producto'}</button>
            </form>

            <div className="productos-lista">
                <h2>Lista de Productos</h2>
                <div className="tabla-wrapper">
                    <table className="productos-tabla">
                        <thead>
                            <tr>
                                <th>Imagen</th>
                                <th>Nombre</th>
                                <th>Categoría</th>
                                <th>Precio</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos && productos.length > 0 ? (
                                productos.map((producto, index) => (
                                    <tr key={index}>
                                        <td>
                                            <img
                                                src={producto.imagen}
                                                alt={producto.nombre}
                                                style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 6 }}
                                                onError={(e) => { e.target.src = '/img/placeholder.png'; }}
                                            />
                                        </td>
                                        <td>{producto.nombre}</td>
                                        <td>{producto.categoria}</td>
                                        <td>${producto.precio.toLocaleString()}</td>
                                        <td>
                                            <button type="button" onClick={() => handleEdit(index)}>Editar</button>
                                            <button type="button" onClick={() => handleDelete(index)}>Eliminar</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="5">No hay productos disponibles</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}