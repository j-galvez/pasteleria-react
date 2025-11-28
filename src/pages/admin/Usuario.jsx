import React, { useState, useEffect } from "react";
import {
  obtenerUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
} from "../../services/usuarioService";

export default function Usuario() {
  const [usuarios, setUsuarios] = useState([]);

  const [run, setRun] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  const [region, setRegion] = useState("");
  const [comuna, setComuna] = useState("");
  const [fechaNac, setFechaNac] = useState("");
  const [password, setPassword] = useState("");
  const [direccion, setDireccion] = useState("");
  const [codigo, setCodigo] = useState("");

  const [modoEdicion, setModoEdicion] = useState(false);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    const data = await obtenerUsuarios();
    setUsuarios(data);
  };

  const resetForm = () => {
    setRun("");
    setNombre("");
    setApellidos("");
    setCorreo("");
    setRegion("");
    setComuna("");
    setFechaNac("");
    setPassword("");
    setDireccion("");
    setCodigo("");
    setModoEdicion(false);
  };

  const seleccionarUsuario = (u) => {
    setRun(u.run);
    setNombre(u.nombre);
    setApellidos(u.apellidos);
    setCorreo(u.correo);
    setRegion(u.region);
    setComuna(u.comuna);
    setFechaNac(u.fechaNac);
    setPassword(u.password);
    setDireccion(u.direccion);
    setCodigo(u.codigo);
    setModoEdicion(true);
  };

  const agregarUsuarioHandler = async (e) => {
    e.preventDefault();
    await crearUsuario({
      run,
      nombre,
      apellidos,
      correo,
      region,
      comuna,
      fechaNac,
      password,
      direccion,
      codigo,
    });
    await cargarUsuarios();
    resetForm();
  };

  const actualizarUsuarioHandler = async (e) => {
    e.preventDefault();
    await actualizarUsuario(run, {
      run,
      nombre,
      apellidos,
      correo,
      region,
      comuna,
      fechaNac,
      password,
      direccion,
      codigo,
    });
    await cargarUsuarios();
    resetForm();
  };

  const eliminarUsuarioHandler = async (run) => {
    if (!window.confirm("¿Eliminar este usuario?")) return;
    await eliminarUsuario(run);
    await cargarUsuarios();
  };

  return (
    <main>
      <div className="usuarios-container">
        <h2>Gestión de Usuarios</h2>

        {/* FORMULARIO */}
        <form onSubmit={modoEdicion ? actualizarUsuarioHandler : agregarUsuarioHandler}>
          <input placeholder="RUN" value={run} onChange={(e) => setRun(e.target.value)} required />
          <input placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          <input placeholder="Apellidos" value={apellidos} onChange={(e) => setApellidos(e.target.value)} required />
          <input type="email" placeholder="Correo" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
          <input placeholder="Región" value={region} onChange={(e) => setRegion(e.target.value)} required />
          <input placeholder="Comuna" value={comuna} onChange={(e) => setComuna(e.target.value)} required />
          <input type="date" value={fechaNac} onChange={(e) => setFechaNac(e.target.value)} required />
          <input placeholder="Dirección" value={direccion} onChange={(e) => setDireccion(e.target.value)} required />
          <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <input placeholder="Código (opcional)" value={codigo} onChange={(e) => setCodigo(e.target.value)} />

          <button type="submit">
            {modoEdicion ? "Actualizar Usuario" : "Agregar Usuario"}
          </button>

          {modoEdicion && <button onClick={resetForm}>Cancelar</button>}
        </form>

        {/* TABLA */}
        <div className="tabla-wrapper">
          <table>
            <thead>
              <tr>
                <th>RUN</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Comuna</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {usuarios.map((u) => (
                <tr key={u.run}>
                  <td>{u.run}</td>
                  <td>{u.nombre} {u.apellidos}</td>
                  <td>{u.correo}</td>
                  <td>{u.comuna}</td>
                  <td>
                    <button onClick={() => seleccionarUsuario(u)}>Editar</button>
                    <button onClick={() => eliminarUsuarioHandler(u.run)}>Eliminar</button>
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
