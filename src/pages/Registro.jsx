import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { crearUsuario } from "../services/usuarioService";

export default function Registro() {
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

  // Regiones y comunas (mismo dataset que en Checkout)
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

  const comunasParaRegion = region ? regionesYComunas[region] || [] : [];

  useEffect(() => {
    // Si la región cambia y la comuna actual no pertenece a la nueva región, limpiarla
    if (region && !comunasParaRegion.includes(comuna)) {
      setComuna("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [region, comunasParaRegion]);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      codigo: codigo || null,
      role: "user" // role por defecto
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
          <select value={region} onChange={(e) => setRegion(e.target.value)} required>
            <option value="">Seleccione una región</option>
            {Object.keys(regionesYComunas).map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>

          <label>Comuna</label>
          <select value={comuna} onChange={(e) => setComuna(e.target.value)} required>
            <option value="">Seleccione una comuna</option>
            {comunasParaRegion.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

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
