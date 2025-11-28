import React, { useState, useEffect } from "react";
import { obtenerUsuarios, eliminarUsuario } from "../../services/usuarioService";


export default function Admin() {
  const [usuarios, setUsuarios] = useState([]);

  const cargarUsuarios = async () => {
    try {
      const data = await obtenerUsuarios();
      setUsuarios(data);
    } catch (error) {
      console.error("Error cargando usuarios:", error);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const handleEliminar = async (run) => {
    if (!window.confirm("¿Eliminar usuario?")) return;

    try {
      await eliminarUsuario(run);
      cargarUsuarios();
    } catch (error) {
      console.error("Error eliminando usuario:", error);
    }
  };

  return (
    <main className="content">
      <h1>Panel de Administrador</h1>

      <h2>Usuarios Registrados</h2>
      <table border="1">
        <thead>
          <tr>
            <th>RUN</th>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Correo</th>
            <th>Comuna</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {usuarios.map(u => (
            <tr key={u.run}>
              <td>{u.run}</td>
              <td>{u.nombre}</td>
              <td>{u.apellidos}</td>
              <td>{u.correo}</td>
              <td>{u.comuna}</td>
              <td>
                <button onClick={() => handleEliminar(u.run)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
