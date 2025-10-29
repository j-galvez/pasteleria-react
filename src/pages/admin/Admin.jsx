import React, { useState, useEffect } from 'react';
import usuariosIniciales from './usuarios'; // Import the usuarios data

export default function Admin() {
    const [seccionActiva, setSeccionActiva] = useState('productos');
    const [productos, setProductos] = useState([]);
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        // Inicializar productos si no existen
        if (!localStorage.getItem("productos")) {
            const productosIniciales = [
                { id: 1, nombre: "Torta Cuadrada Chocolate", precio: 45000 },
                { id: 2, nombre: "Torta Circular Vainilla", precio: 40000 },
                { id: 3, nombre: "Torta Cuadrada de Frutas", precio: 50000 }
            ];
            localStorage.setItem("productos", JSON.stringify(productosIniciales));
        }

        // Inicializar usuarios si no existen
        if (!localStorage.getItem("usuarios")) {
            localStorage.setItem("usuarios", JSON.stringify(usuariosIniciales)); // Use imported data
        }

        // Cargar datos del localStorage
        setProductos(JSON.parse(localStorage.getItem("productos")) || []);
        setUsuarios(JSON.parse(localStorage.getItem("usuarios")) || []);
    }, []);

    const mostrarSeccion = (id) => {
        setSeccionActiva(id);
    };

    return (
        <main className="content">
            <h1>Hola Admin</h1>

            <div>
                <button onClick={() => mostrarSeccion('productos')}>Ver Productos</button>
                <button onClick={() => mostrarSeccion('usuarios')}>Ver Usuarios</button>
            </div>

            <div 
                id="productos" 
                className="seccion"
                style={{ display: seccionActiva === 'productos' ? 'block' : 'none' }}
            >
                <h2>Productos</h2>
                <div id="lista-productos">
                    {productos.map(p => (
                        <p key={p.id}>{p.nombre} - ${p.precio.toLocaleString()}</p>
                    ))}
                </div>
            </div>

            <div 
                id="usuarios" 
                className="seccion"
                style={{ display: seccionActiva === 'usuarios' ? 'block' : 'none' }}
            >
                <h2>Usuarios</h2>
                <div id="lista-usuarios">
                    {usuarios.map(u => (
                        <p key={u.id}>{u.nombre} - {u.email}</p>
                    ))}
                </div>
            </div>
        </main>
    );
}