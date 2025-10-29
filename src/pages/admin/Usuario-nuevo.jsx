import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

export default function UsuarioNuevo() {
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
  const navigate = useNavigate();

  // Regiones y comunas de Chile (puedes ajustar/agregar)
  const regionesYComunas = useMemo(
    () => ({
      "Región de Arica y Parinacota": ["Arica", "Camarones", "Putre", "General Lagos"],
      "Región de Tarapacá": ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"],
      "Región de Antofagasta": ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama", "Tocopilla", "María Elena"],
      "Región de Atacama": ["Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Alto del Carmen", "Freirina", "Huasco"],
      "Región de Coquimbo": ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paiguano", "Vicuña", "Illapel", "Canela", "Los Vilos", "Salamanca", "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"],
      "Región de Valparaíso": ["Valparaíso", "Casablanca", "Concón", "Juan Fernández", "Puchuncaví", "Quintero", "Viña del Mar", "Isla de Pascua", "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "La Ligua", "Cabildo", "Papudo", "Petorca", "Zapallar", "Quillota", "Calera", "Hijuelas", "La Cruz", "Nogales", "San Antonio", "Algarrobo", "Cartagena", "El Quisco", "El Tabo", "Santo Domingo", "San Felipe", "Catemu", "Llay-Llay", "Panquehue", "Putaendo", "Santa María", "Limache", "Olmué", "Quilpué", "Villa Alemana"],
      "Región Metropolitana de Santiago": ["Santiago", "Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Joaquín", "San Miguel", "San Ramón", "Vitacura", "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "Tiltil", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"],
      "Región del Libertador General Bernardo O'Higgins": ["Rancagua", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "Las Cabras", "Machalí", "Malloa", "Mostazal", "Olivar", "Peumo", "Pichidegua", "Quinta de Tilcoco", "Rengo", "Requínoa", "San Vicente de Tagua Tagua", "Pichilemu", "La Estrella", "Litueche", "Marchigüe", "Navidad", "Paredones", "San Fernando", "Chépica", "Chimbarongo", "Lolol", "Nancagua", "Palmilla", "Peralillo", "Placilla", "Pumanque", "Santa Cruz"],
      "Región del Maule": ["Talca", "Constitución", "Curepto", "Empedrado", "Maule", "Pelarco", "Pencahue", "Río Claro", "San Clemente", "San Rafael", "Cauquenes", "Chanco", "Pelluhue", "Curicó", "Hualañé", "Licantén", "Molina", "Rauco", "Romeral", "Sagrada Familia", "Teno", "Vichuquén", "Linares", "Colbún", "Longaví", "Parral", "Retiro", "San Javier", "Villa Alegre", "Yerbas Buenas"],
      "Región de Ñuble": ["Chillán", "Bulnes", "Cobquecura", "Coelemu", "Coihueco", "El Carmen", "Ninhue", "Ñiquén", "Pemuco", "Pinto", "Portezuelo", "Quillón", "Quirihue", "Ránquil", "San Carlos", "San Fabián", "San Ignacio", "San Nicolás", "Treguaco", "Yungay"],
      "Región del Biobío": ["Concepción", "Coronel", "Chiguayante", "Florida", "Hualqui", "Lota", "Penco", "San Pedro de la Paz", "Santa Juana", "Talcahuano", "Tomé", "Hualpén", "Lebu", "Arauco", "Cañete", "Contulmo", "Curanilahue", "Los Álamos", "Tirúa", "Los Ángeles", "Antuco", "Cabrero", "Laja", "Mulchén", "Nacimiento", "Negrete", "Quilaco", "Quilleco", "San Rosendo", "Santa Bárbara", "Tucapel", "Yumbel", "Alto Biobío"],
      "Región de La Araucanía": ["Temuco", "Carahue", "Cholchol", "Cunco", "Curarrehue", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Melipeuco", "Nueva Imperial", "Padre Las Casas", "Perquenco", "Pitrufquén", "Pucón", "Saavedra", "Teodoro Schmidt", "Toltén", "Vilcún", "Villarrica", "Angol", "Collipulli", "Curacautín", "Ercilla", "Lonquimay", "Los Sauces", "Lumaco", "Purén", "Renaico", "Traiguén", "Victoria"],
      "Región de Los Ríos": ["Valdivia", "Corral", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli", "La Unión", "Futrono", "Lago Ranco", "Río Bueno"],
      "Región de Los Lagos": ["Puerto Montt", "Calbuco", "Cochamó", "Fresia", "Frutillar", "Los Muermos", "Llanquihue", "Maullín", "Puerto Varas", "Osorno", "Puerto Octay", "Purranque", "Puyehue", "Río Negro", "San Juan de la Costa", "San Pablo", "Ancud", "Castro", "Chaitén", "Curaco de Vélez", "Dalcahue", "Futaleufú", "Hualaihué", "Palena", "Puqueldón", "Queilén", "Quellón", "Quemchi", "Quinchao"],
      "Región de Aysén del General Carlos Ibáñez del Campo": ["Coyhaique", "Lago Verde", "Aisén", "Cisnes", "Guaitecas", "Cochrane", "O'Higgins", "Tortel", "Chile Chico", "Río Ibáñez"],
      "Región de Magallanes y de la Antártica Chilena": ["Punta Arenas", "Laguna Blanca", "Río Verde", "San Gregorio", "Cabo de Hornos", "Antártica", "Porvenir", "Primavera", "Timaukel", "Puerto Natales", "Torres del Paine"]
    }),
    []
  );

  // Comunas que corresponden a la región seleccionada
  const comunasParaRegion = region ? regionesYComunas[region] || [] : [];

  useEffect(() => {
    // Si la región cambia, reiniciar comuna seleccionada si no pertenece
    if (region && !comunasParaRegion.includes(comuna)) {
      setComuna("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [region]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Calcular edad
    let edad = 0;
    if (fechaNac) {
      const hoy = new Date();
      const cumple = new Date(fechaNac);
      edad = hoy.getFullYear() - cumple.getFullYear();
      const m = hoy.getMonth() - cumple.getMonth();
      if (m < 0 || (m === 0 && hoy.getDate() < cumple.getDate())) {
        edad--;
      }
    }

    // Determinar beneficios
    const beneficios = {};
    if (edad > 50) {
      beneficios.descuento = 0.5;
    }
    if ((codigo || "").trim().toUpperCase() === "FELICES50") {
      beneficios.descuento = Math.max(beneficios.descuento || 0, 0.1);
      beneficios.descuentoFijo = true;
    }
    if (correo.endsWith("@duocuc.cl")) {
      beneficios.tortaGratisCumple = true;
    }

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
      edad,
      beneficios,
    };

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // Mostrar mensaje de éxito y redirigir a página de usuarios
    setSuccess(true);
    setTimeout(() => navigate("/administrador/usuario"), 1500); // Changed navigation path
  };

  return (
    <main>
      <section className="form-container">
        <h1>Registro de Usuario</h1>
        <form id="formRegistro" onSubmit={handleSubmit}>
          {/* RUN */}
          <label htmlFor="run">RUN (sin puntos ni guion)</label>
          <input
            type="text"
            id="run"
            required
            minLength={7}
            maxLength={9}
            placeholder="Ej: 19011022K"
            value={run}
            onChange={(e) => setRun(e.target.value)}
          />

          {/* Nombre */}
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            required
            maxLength={50}
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          {/* Apellidos */}
          <label htmlFor="apellidos">Apellidos</label>
          <input
            type="text"
            id="apellidos"
            required
            maxLength={100}
            value={apellidos}
            onChange={(e) => setApellidos(e.target.value)}
          />

          {/* Correo */}
          <label htmlFor="correo">Correo</label>
          <input
            type="email"
            id="correo"
            required
            maxLength={100}
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />

          {/* Contraseña */}
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

          {/* Dirección */}
          <label htmlFor="direccion">Dirección</label>
          <input
            type="text"
            id="direccion"
            required
            maxLength={300}
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
          />

          {/* Región y comuna */}
          <label htmlFor="region">Región</label>
          <select
            id="region"
            required
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            <option value="">Seleccione una región</option>
            {Object.keys(regionesYComunas).map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>

          <label htmlFor="comuna">Comuna</label>
          <select
            id="comuna"
            required
            value={comuna}
            onChange={(e) => setComuna(e.target.value)}
          >
            <option value="">Seleccione una comuna</option>
            {comunasParaRegion.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          {/* Fecha de nacimiento */}
          <label htmlFor="fechaNac">Fecha de nacimiento</label>
          <input
            type="date"
            id="fechaNac"
            required
            value={fechaNac}
            onChange={(e) => setFechaNac(e.target.value)}
          />

          {/* Código */}
          <label htmlFor="codigo">Código Descuento (Opcional)</label>
          <input
            type="text"
            id="codigo"
            maxLength={10}
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
          />

          {/* Botón */}
          <button type="submit" disabled={success}>
            {success ? "Registrando..." : "Registrar"}
          </button>
        </form>
      </section>

      {success && (
        <div
          id="registro-success-modal"
          role="status"
          aria-live="polite"
        >
          <div className="modal-content">
            <p>Registro exitoso. Redirigiendo a usuarios...</p>
          </div>
        </div>
      )}
    </main>
  );
}