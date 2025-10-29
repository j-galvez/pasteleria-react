import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuario = usuarios.find(
      (u) => u.correo === correo && u.password === password
    );

    if (usuario) {
      localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));
      setSuccess(true);
      setError(false);
      setTimeout(() => navigate("/"), 1500);
    } else {
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
