export default function Login() {
  return (
    <main>
      <section className="form-container">
        <h1>Iniciar Sesión</h1>
        <form id="formLogin">
          <label htmlFor="correo">Correo</label>
          <input type="email" id="correo" required maxLength={100} />

          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" required minLength={4} maxLength={10} />

          <button type="submit">Ingresar</button>
          <p
            id="login-error"
            style={{ color: "red", textAlign: "center", display: "none" }}
          >
            Correo o contraseña incorrectos
          </p>
        </form>
      </section>
    </main>
  );
}
