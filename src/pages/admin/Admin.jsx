import React, { useState, useEffect } from 'react';
import usuariosIniciales from './usuarios';

export default function Admin() {
    const [seccionActiva, setSeccionActiva] = useState('productos');
    const [productos, setProductos] = useState([]);
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        // Inicializar usuarios si no existen
        if (!localStorage.getItem("usuarios")) {
            localStorage.setItem("usuarios", JSON.stringify(usuariosIniciales));
        }

        // Cargar datos del localStorage
        const productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];
        const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];

        setProductos(productosGuardados);
        setUsuarios(usuariosGuardados);

        // Si usas lógica adicional en window.AdminLogic
        if (window.AdminLogic) {
            const { productos, usuarios } = window.AdminLogic.cargarDatos();
            if (productos) setProductos(productos);
            if (usuarios) setUsuarios(usuarios);
        }
    }, []); // 👈 solo se ejecuta una vez

    const mostrarSeccion = (id) => {
        try {
            const nuevaSeccion = window.AdminLogic?.mostrarSeccion(id) || id;
            setSeccionActiva(nuevaSeccion);
        } catch (err) {
            console.error('Error al cambiar sección:', err.message);
        }
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
