import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { crearUsuario } from "../services/usuarioService";

function Registro() {
  const navigate = useNavigate();

  const [run, setRun] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [direccion, setDireccion] = useState("");
  const [region, setRegion] = useState("");
  const [comuna, setComuna] = useState("");
  const [fechaNac, setFechaNac] = useState("");
  const [codigo, setCodigo] = useState("");

  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construcción del objeto compatible con el backend
    const usuario = {
      run,
      nombre,
      apellidos,
      correo,
      password,
      direccion,
      region,
      comuna,
      fechaNac,
      codigo: codigo || null
    };

    try {
      const respuesta = await crearUsuario(usuario);
      console.log("Usuario creado:", respuesta);

      setSuccess(true);
      setTimeout(() => navigate("/"), 1500);

    } catch (error) {
      console.error("Error registrando usuario:", error);
      alert("No se pudo registrar el usuario. Revisa consola.");
    }
  };

  return (
    <main>
      <section className="form-container">
        <h1>Registro de Usuario</h1>

        <form id="formRegistro" onSubmit={handleSubmit}>
          <label>RUN</label>
          <input value={run} onChange={(e) => setRun(e.target.value)} required />

          <label>Nombre</label>
          <input value={nombre} onChange={(e) => setNombre(e.target.value)} required />

          <label>Apellidos</label>
          <input value={apellidos} onChange={(e) => setApellidos(e.target.value)} required />

          <label>Correo</label>
          <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} required />

          <label>Contraseña</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

          <label>Dirección</label>
          <input value={direccion} onChange={(e) => setDireccion(e.target.value)} required />

          <label>Región</label>
          <input value={region} onChange={(e) => setRegion(e.target.value)} required />

          <label>Comuna</label>
          <input value={comuna} onChange={(e) => setComuna(e.target.value)} required />

          <label>Fecha de nacimiento</label>
          <input type="date" value={fechaNac} onChange={(e) => setFechaNac(e.target.value)} required />

          <label>Código descuento (opcional)</label>
          <input value={codigo} onChange={(e) => setCodigo(e.target.value)} />

          <button type="submit" disabled={success}>
            {success ? "Registrando..." : "Registrar"}
          </button>
        </form>

        {success && (
          <div id="registro-success-modal">
            <p>Registro exitoso. Redirigiendo…</p>
          </div>
        )}
      </section>
    </main>
  );
}

export default Registro;
