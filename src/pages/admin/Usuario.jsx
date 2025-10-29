import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Usuario() {
    const [usuarios, setUsuarios] = useState([]);
    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [correo, setCorreo] = useState("");
    const [region, setRegion] = useState("");
    const [comuna, setComuna] = useState("");
    const [edad, setEdad] = useState("");
    const [editingIndex, setEditingIndex] = useState(null);

    useEffect(() => {
        cargarUsuarios();
    }, []);

    const cargarUsuarios = () => {
        const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];
        setUsuarios(usuariosGuardados);
    };

    const agregarUsuario = (e) => {
        e.preventDefault();
        const nuevosUsuarios = [...usuarios, { id: usuarios.length + 1, nombre, apellidos, correo, region, comuna, edad }];
        localStorage.setItem('usuarios', JSON.stringify(nuevosUsuarios));
        setUsuarios(nuevosUsuarios);
        resetForm();
    };

    const editarUsuario = (idx) => {
        const usuario = usuarios[idx];
        setNombre(usuario.nombre);
        setApellidos(usuario.apellidos);
        setCorreo(usuario.correo);
        setRegion(usuario.region);
        setComuna(usuario.comuna);
        setEdad(usuario.edad);
        setEditingIndex(idx);
    };

    const actualizarUsuario = (e) => {
        e.preventDefault();
        const nuevosUsuarios = usuarios.map((usuario, idx) => {
            if (idx === editingIndex) {
                return { ...usuario, nombre, apellidos, correo, region, comuna, edad };
            }
            return usuario;
        });
        localStorage.setItem('usuarios', JSON.stringify(nuevosUsuarios));
        setUsuarios(nuevosUsuarios);
        resetForm();
    };

    const eliminarUsuario = (idx) => {
        if (window.confirm("¿Seguro que deseas eliminar este usuario?")) {
            const nuevosUsuarios = usuarios.filter((_, index) => index !== idx);
            localStorage.setItem('usuarios', JSON.stringify(nuevosUsuarios));
            setUsuarios(nuevosUsuarios);
        }
    };

    const resetForm = () => {
        setNombre("");
        setApellidos("");
        setCorreo("");
        setRegion("");
        setComuna("");
        setEdad("");
        setEditingIndex(null);
    };

    return (
        <main>
            <div className="usuarios-container">
                <div className="usuarios-header">
                    <h2>Lista de Usuarios</h2>
                </div>

                <form onSubmit={editingIndex !== null ? actualizarUsuario : agregarUsuario}>
                    <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" required />
                    <input type="text" value={apellidos} onChange={(e) => setApellidos(e.target.value)} placeholder="Apellidos" required />
                    <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder="Correo" required />
                    <input type="text" value={region} onChange={(e) => setRegion(e.target.value)} placeholder="Región" required />
                    <input type="text" value={comuna} onChange={(e) => setComuna(e.target.value)} placeholder="Comuna" required />
                    <input type="number" value={edad} onChange={(e) => setEdad(e.target.value)} placeholder="Edad" required />
                    <button type="submit">{editingIndex !== null ? 'Actualizar Usuario' : 'Agregar Usuario'}</button>
                    {editingIndex !== null && <button type="button" onClick={resetForm}>Cancelar</button>}
                </form>

                <div id="lista-usuarios-admin">
                    {!usuarios.length ? (
                        <p className="no-usuarios">No hay usuarios registrados.</p>
                    ) : (
                        <div className="tabla-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Apellidos</th>
                                        <th>Correo</th>
                                        <th>Región</th>
                                        <th>Comuna</th>
                                        <th>Edad</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usuarios.map((usuario, idx) => (
                                        <tr key={idx}>
                                            <td>{usuario.nombre}</td>
                                            <td>{usuario.apellidos}</td>
                                            <td>{usuario.correo}</td>
                                            <td>{usuario.region}</td>
                                            <td>{usuario.comuna}</td>
                                            <td>{usuario.edad || ''}</td>
                                            <td>
                                                <button onClick={() => editarUsuario(idx)}>Editar</button>
                                                <button 
                                                    className="btn-eliminar-usuario"
                                                    onClick={() => eliminarUsuario(idx)}
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}