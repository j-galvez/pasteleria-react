import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../utils/Usuario.logic.js';


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
        const usuariosGuardados = window.UsuarioLogic.cargarUsuariosFromLocalStorage();
        setUsuarios(usuariosGuardados);
    };


    const agregarUsuario = (e) => {
        e.preventDefault();
        try {
            const nuevosUsuarios = window.UsuarioLogic.agregarUsuario(usuarios, { nombre, apellidos, correo, region, comuna, edad });
            window.UsuarioLogic.setLocalStorageUsuarios(nuevosUsuarios);
            setUsuarios(nuevosUsuarios);
            const reset = window.UsuarioLogic.resetFormData();
            setNombre(reset.nombre);
            setApellidos(reset.apellidos);
            setCorreo(reset.correo);
            setRegion(reset.region);
            setComuna(reset.comuna);
            setEdad(reset.edad);
            setEditingIndex(reset.editingIndex);
        } catch (error) {
            // muestra el error en consola o maneja como quieras
            console.error('Error agregando usuario:', error.message);
            alert('Error al agregar usuario: ' + error.message);
        }
    };


    const editarUsuario = (idx) => {
        const datos = window.UsuarioLogic.getUsuarioForEditing(usuarios, idx);
        if (!datos) {
            console.warn('Índice para editar inválido:', idx);
            return;
        }
        setNombre(datos.nombre);
        setApellidos(datos.apellidos);
        setCorreo(datos.correo);
        setRegion(datos.region);
        setComuna(datos.comuna);
        setEdad(datos.edad);
        setEditingIndex(idx);
    };


    const actualizarUsuario = (e) => {
        e.preventDefault();
        try {
            const nuevosUsuarios = window.UsuarioLogic.actualizarUsuario(usuarios, editingIndex, { nombre, apellidos, correo, region, comuna, edad });
            window.UsuarioLogic.setLocalStorageUsuarios(nuevosUsuarios);
            setUsuarios(nuevosUsuarios);
            const reset = window.UsuarioLogic.resetFormData();
            setNombre(reset.nombre);
            setApellidos(reset.apellidos);
            setCorreo(reset.correo);
            setRegion(reset.region);
            setComuna(reset.comuna);
            setEdad(reset.edad);
            setEditingIndex(reset.editingIndex);
        } catch (err) {
            console.error('Error al actualizar:', err.message);
            alert('Error al actualizar: ' + err.message);
        }
    };


    const eliminarUsuario = (idx) => {
        if (!window.confirm('¿Seguro que deseas eliminar este usuario?')) return;
        try {
            const nuevosUsuarios = window.UsuarioLogic.eliminarUsuarioByIndex(usuarios, idx);
            window.UsuarioLogic.setLocalStorageUsuarios(nuevosUsuarios);
            setUsuarios(nuevosUsuarios);
        } catch (err) {
            console.error('Error al eliminar usuario:', err.message);
            alert('Error al eliminar: ' + err.message);
        }
    };

    const resetForm = () => {
        const reset = window.UsuarioLogic.resetFormData();
        setNombre(reset.nombre);
        setApellidos(reset.apellidos);
        setCorreo(reset.correo);
        setRegion(reset.region);
        setComuna(reset.comuna);
        setEdad(reset.edad);
        setEditingIndex(reset.editingIndex);
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