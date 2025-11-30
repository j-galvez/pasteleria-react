import '../utils/Login.logic.js'; 
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

export default function Login() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    try {
      const response = await login({ correo, password });

      const { token, rol, nombre } = response.data; 
      // IMPORTANTE: asegúrate de que tu backend retorna estos 3 valores

      // Guardar datos en localStorage
      const usuarioData = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("rol", rol);
      localStorage.setItem("nombre", nombre);
      localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioData));


      setSuccess(true);

      setTimeout(() => {
        if (rol === "ADMIN") {
          navigate("/"); // usa la misma ruta que en Home
        } else {
          navigate("/");
        }
      }, 1500);

    } catch (error) {
      setError(true);
    }
  };

  return (
    <main>
      <section className="form-container">
        <h1>Iniciar Sesión</h1>
        <form id="formLogin" onSubmit={handleSubmit}>
          <label htmlFor="correo">Correo</label>
          <input
            type="email"
            id="correo"
            required
            maxLength={100}
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />

          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            required
            minLength={4}
            maxLength={10}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" disabled={success}>
            {success ? "Ingresando..." : "Ingresar"}
          </button>

          {error && (
            <p id="login-error" style={{ color: "red", textAlign: "center" }}>
              Correo o contraseña incorrectos
            </p>
          )}
        </form>
      </section>

      {success && (
        <div id="login-success-modal" role="status" aria-live="polite">
          <div className="modal-content">
            <p>Inicio de sesión exitoso. Redirigiendo a inicio...</p>
          </div>
        </div>
      )}
    </main>
  );
}
