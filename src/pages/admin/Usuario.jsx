import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Usuario() {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        cargarUsuarios();
    }, []);

    const cargarUsuarios = () => {
        const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];
        setUsuarios(usuariosGuardados);
    };

    const eliminarUsuario = (idx) => {
        if (window.confirm("¿Seguro que deseas eliminar este usuario?")) {
            const nuevosUsuarios = usuarios.filter((_, index) => index !== idx);
            localStorage.setItem('usuarios', JSON.stringify(nuevosUsuarios));
            setUsuarios(nuevosUsuarios);
        }
    };

    const getBeneficios = (beneficios) => {
        if (!beneficios) return '';
        
        const listaBeneficios = [];
        if (beneficios.descuento === 0.5) listaBeneficios.push("50% dcto.");
        else if (beneficios.descuento === 0.1) listaBeneficios.push("10% dcto.");
        if (beneficios.tortaGratisCumple) listaBeneficios.push("Torta cumpleaños");
        
        return listaBeneficios.join(", ");
    };

    return (
        <main>
            <div className="usuarios-container">
                <div className="usuarios-header">
                    <h2>Lista de Usuarios</h2>
                    <Link to="/administrador/usuario/nuevo" className="btn-nuevo">
                        + Crear Usuario Nuevo
                    </Link>
                </div>

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
                                        <th>Beneficios</th>
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
                                            <td>{getBeneficios(usuario.beneficios)}</td>
                                            <td>
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