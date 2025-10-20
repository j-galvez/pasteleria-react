export default function Registro() {
  return (
    <main>
      <section className="form-container">
        <h1>Registro de Usuario</h1>
        <form id="formRegistro">
          {/* RUN */}
          <label htmlFor="run">RUN (sin puntos ni guion)</label>
          <input
            type="text"
            id="run"
            required
            minLength={7}
            maxLength={9}
            placeholder="Ej: 19011022K"
          />

          {/* Nombre */}
          <label htmlFor="nombre">Nombre</label>
          <input type="text" id="nombre" required maxLength={50} />

          {/* Apellidos */}
          <label htmlFor="apellidos">Apellidos</label>
          <input type="text" id="apellidos" required maxLength={100} />

          {/* Correo */}
          <label htmlFor="correo">Correo</label>
          <input type="email" id="correo" required maxLength={100} />

          {/* Contraseña */}
          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" required minLength={4} maxLength={10} />

          {/* Dirección */}
          <label htmlFor="direccion">Dirección</label>
          <input type="text" id="direccion" required maxLength={300} />

          {/* Región y comuna */}
          <label htmlFor="region">Región</label>
          <select id="region" required>
            <option value="">Seleccione una región</option>
          </select>

          <label htmlFor="comuna">Comuna</label>
          <select id="comuna" required>
            <option value="">Seleccione una comuna</option>
          </select>

          {/* Fecha de nacimiento */}
          <label htmlFor="fechaNac">Fecha de nacimiento</label>
          <input type="date" id="fechaNac" required />

          {/* Código */}
          <label htmlFor="codigo">Código Descuento (Opcional)</label>
          <input type="text" id="codigo" maxLength={10} />

          {/* Botón */}
          <button type="submit">Registrar</button>
        </form>
      </section>
    </main>
  );
}