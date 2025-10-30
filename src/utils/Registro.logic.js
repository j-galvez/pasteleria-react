// src/utils/Registro.logic.js
// Lógica pura para el componente Registro
// Todas las funciones se exponen en window.RegistroLogic
(function () {
  if (!window) return;

  // Devuelve la lista de regiones y comunas (inmutable)
  function obtenerRegionesYComunas() {
    return {
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
    };
  }

  /**
   * Calcula la edad a partir de fechaNac (cadena YYYY-MM-DD).
   * Devuelve número entero >= 0. Si fechaNac inválida devuelve 0.
   */
  function calcularEdad(fechaNac, hoyDate) {
    if (!fechaNac) return 0;
    try {
      const hoy = hoyDate ? new Date(hoyDate) : new Date();
      const cumple = new Date(fechaNac);
      if (isNaN(cumple.getTime())) return 0;
      let edad = hoy.getFullYear() - cumple.getFullYear();
      const m = hoy.getMonth() - cumple.getMonth();
      if (m < 0 || (m === 0 && hoy.getDate() < cumple.getDate())) {
        edad--;
      }
      return Math.max(0, edad);
    } catch (e) {
      return 0;
    }
  }

  /**
   * Determina beneficios a partir de edad, codigo y correo.
   * Devuelve objeto beneficios.
   */
  function determinarBeneficios(edad, codigo, correo) {
    const beneficios = {};
    if (typeof edad === "number" && edad > 50) {
      beneficios.descuento = 0.5; // 50%
    }
    if ((codigo || "").toString().trim().toUpperCase() === "FELICES50") {
      // Si ya hay mayor descuento se mantiene, sino 10%
      beneficios.descuento = Math.max(beneficios.descuento || 0, 0.1);
      beneficios.descuentoFijo = true;
    }
    if ((correo || "").toString().endsWith("@duocuc.cl")) {
      beneficios.tortaGratisCumple = true;
    }
    return beneficios;
  }

  /**
   * Crea el objeto usuario con los campos esperados por la app.
   * Recibe los estados del componente.
   */
  function buildUsuario(fields) {
    // fields: { run, nombre, apellidos, correo, password, direccion, region, comuna, fechaNac, edad, beneficios }
    return {
      run: fields.run || "",
      nombre: fields.nombre || "",
      apellidos: fields.apellidos || "",
      correo: fields.correo || "",
      password: fields.password || "",
      direccion: fields.direccion || "",
      region: fields.region || "",
      comuna: fields.comuna || "",
      fechaNac: fields.fechaNac || "",
      edad: typeof fields.edad === "number" ? fields.edad : 0,
      beneficios: fields.beneficios || {}
    };
  }

  /**
   * Guarda un usuario en localStorage bajo la clave "usuarios".
   * Devuelve true si guardeOK, false si error.
   */
  function guardarUsuarioLocal(usuario) {
    try {
      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
      usuarios.push(usuario);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Devuelve comunas para una región, o [] si no existe.
   */
  function comunasParaRegion(region) {
    const mapa = obtenerRegionesYComunas();
    return region && mapa[region] ? mapa[region] : [];
  }

  // Exponer funciones en global window.RegistroLogic
  window.RegistroLogic = window.RegistroLogic || {};
  window.RegistroLogic.obtenerRegionesYComunas = obtenerRegionesYComunas;
  window.RegistroLogic.calcularEdad = calcularEdad;
  window.RegistroLogic.determinarBeneficios = determinarBeneficios;
  window.RegistroLogic.buildUsuario = buildUsuario;
  window.RegistroLogic.guardarUsuarioLocal = guardarUsuarioLocal;
  window.RegistroLogic.comunasParaRegion = comunasParaRegion;
})();
