import React, { useState, useEffect, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCarrito } from "../context/CarritoContext.jsx";
import { useNavigate } from "react-router-dom";
import "../utils/Carrito.logic.js";

export default function Checkout() {
  const { carrito } = useCarrito();
  const navigate = useNavigate();

  // Get user and calculate discounts
  const usuario = window.CarritoLogic.obtenerUsuarioLogueado();
  const total = window.CarritoLogic.calcularTotal(carrito);
  const { descuento, mensajeBeneficio } = window.CarritoLogic.obtenerDescuentoYMensaje(usuario);
  const totalConDescuento = window.CarritoLogic.calcularTotalConDescuento(total, descuento);

  // Datos cliente
  const [cliente, setCliente] = useState({
    nombre: "",
    apellidos: "",
    correo: "",
    calle: "",
    departamento: "",
    region: "",
    comuna: "",
    indicaciones: "",
  });

  const regionesYComunas = useMemo(
  () => ({
    "Región de Arica y Parinacota": ["Arica", "Camarones", "Putre", "General Lagos"],

    "Región de Tarapacá": [
      "Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"
    ],

    "Región de Antofagasta": [
      "Antofagasta", "Mejillones", "Sierra Gorda", "Taltal",
      "Calama", "Ollagüe", "San Pedro de Atacama",
      "Tocopilla", "María Elena"
    ],

    "Región de Atacama": [
      "Copiapó", "Caldera", "Tierra Amarilla", "Chañaral",
      "Diego de Almagro", "Vallenar", "Alto del Carmen",
      "Freirina", "Huasco"
    ],

    "Región de Coquimbo": [
      "La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paiguano",
      "Vicuña", "Illapel", "Canela", "Los Vilos", "Salamanca",
      "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"
    ],

    "Región de Valparaíso": [
      "Valparaíso", "Casablanca", "Concón", "Juan Fernández", "Puchuncaví",
      "Quintero", "Viña del Mar", "Isla de Pascua", "Los Andes",
      "Calle Larga", "Rinconada", "San Esteban", "La Ligua", "Cabildo",
      "Papudo", "Petorca", "Zapallar", "Quillota", "Calera",
      "Hijuelas", "La Cruz", "Nogales", "San Antonio", "Algarrobo",
      "Cartagena", "El Quisco", "El Tabo", "Santo Domingo",
      "San Felipe", "Catemu", "Llay-Llay", "Panquehue", "Putaendo",
      "Santa María", "Limache", "Olmué", "Quilpué", "Villa Alemana"
    ],

    "Región Metropolitana de Santiago": [
      "Santiago", "Cerrillos", "Cerro Navia", "Conchalí", "El Bosque",
      "Estación Central", "Huechuraba", "Independencia", "La Cisterna",
      "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes",
      "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú",
      "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia",
      "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca",
      "San Joaquín", "San Miguel", "San Ramón", "Vitacura", "Puente Alto",
      "Pirque", "San José de Maipo", "Colina", "Lampa", "Tiltil",
      "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla",
      "Alhué", "Curacaví", "María Pinto", "San Pedro", "Talagante",
      "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"
    ],

    "Región del Libertador General Bernardo O'Higgins": [
      "Rancagua", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros",
      "Las Cabras", "Machalí", "Malloa", "Mostazal", "Olivar", "Peumo",
      "Pichidegua", "Quinta de Tilcoco", "Rengo", "Requínoa",
      "San Vicente de Tagua Tagua", "Pichilemu", "La Estrella", "Litueche",
      "Marchigüe", "Navidad", "Paredones", "San Fernando", "Chépica",
      "Chimbarongo", "Lolol", "Nancagua", "Palmilla", "Peralillo",
      "Placilla", "Pumanque", "Santa Cruz"
    ],

    "Región del Maule": [
      "Talca", "Constitución", "Curepto", "Empedrado", "Maule", "Pelarco",
      "Pencahue", "Río Claro", "San Clemente", "San Rafael", "Cauquenes",
      "Chanco", "Pelluhue", "Curicó", "Hualañé", "Licantén", "Molina",
      "Rauco", "Romeral", "Sagrada Familia", "Teno", "Vichuquén",
      "Linares", "Colbún", "Longaví", "Parral", "Retiro", "San Javier",
      "Villa Alegre", "Yerbas Buenas"
    ],

    "Región de Ñuble": [
      "Chillán", "Bulnes", "Cobquecura", "Coelemu", "Coihueco", "El Carmen",
      "Ninhue", "Ñiquén", "Pemuco", "Pinto", "Portezuelo", "Quillón",
      "Quirihue", "Ránquil", "San Carlos", "San Fabián", "San Ignacio",
      "San Nicolás", "Treguaco", "Yungay"
    ],

    "Región del Biobío": [
      "Concepción", "Coronel", "Chiguayante", "Florida", "Hualqui",
      "Lota", "Penco", "San Pedro de la Paz", "Santa Juana",
      "Talcahuano", "Tomé", "Hualpén", "Lebu", "Arauco", "Cañete",
      "Contulmo", "Curanilahue", "Los Álamos", "Tirúa", "Los Ángeles",
      "Antuco", "Cabrero", "Laja", "Mulchén", "Nacimiento", "Negrete",
      "Quilaco", "Quilleco", "San Rosendo", "Santa Bárbara", "Tucapel",
      "Yumbel", "Alto Biobío"
    ],

    "Región de La Araucanía": [
      "Temuco", "Carahue", "Cholchol", "Cunco", "Curarrehue", "Freire",
      "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Melipeuco",
      "Nueva Imperial", "Padre Las Casas", "Perquenco", "Pitrufquén",
      "Pucón", "Saavedra", "Teodoro Schmidt", "Toltén", "Vilcún",
      "Villarrica", "Angol", "Collipulli", "Curacautín", "Ercilla",
      "Lonquimay", "Los Sauces", "Lumaco", "Purén", "Renaico",
      "Traiguén", "Victoria"
    ],

    "Región de Los Ríos": [
      "Valdivia", "Corral", "Lanco", "Los Lagos", "Máfil", "Mariquina",
      "Paillaco", "Panguipulli", "La Unión", "Futrono", "Lago Ranco",
      "Río Bueno"
    ],

    "Región de Los Lagos": [
      "Puerto Montt", "Calbuco", "Cochamó", "Fresia", "Frutillar",
      "Los Muermos", "Llanquihue", "Maullín", "Puerto Varas",
      "Osorno", "Puerto Octay", "Purranque", "Puyehue", "Río Negro",
      "San Juan de la Costa", "San Pablo", "Ancud", "Castro", "Chaitén",
      "Curaco de Vélez", "Dalcahue", "Futaleufú", "Hualaihué", "Palena",
      "Puqueldón", "Queilén", "Quellón", "Quemchi", "Quinchao"
    ],

    "Región de Aysén del General Carlos Ibáñez del Campo": [
      "Coyhaique", "Lago Verde", "Aisén", "Cisnes", "Guaitecas",
      "Cochrane", "O'Higgins", "Tortel", "Chile Chico", "Río Ibáñez"
    ],

    "Región de Magallanes y de la Antártica Chilena": [
      "Punta Arenas", "Laguna Blanca", "Río Verde", "San Gregorio",
      "Cabo de Hornos", "Antártica", "Porvenir", "Primavera",
      "Timaukel", "Puerto Natales", "Torres del Paine"
    ],
  }),
  []);

  const comunasParaRegion = cliente.region ? regionesYComunas[cliente.region] || [] : [];

  // Cargar usuario
  useEffect(() => {
    const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));
    if (usuarioLogueado) {
      setCliente({
        nombre: usuarioLogueado.nombre || "",
        apellidos: usuarioLogueado.apellidos || "",
        correo: usuarioLogueado.correo || "",
        calle: usuarioLogueado.direccion || "",
        departamento: "",
        region: usuarioLogueado.region || "",
        comuna: usuarioLogueado.comuna || "",
        indicaciones: "",
      });
    }
  }, []);

  // Mantener comuna válida
  useEffect(() => {
    if (cliente.region && !comunasParaRegion.includes(cliente.comuna)) {
      setCliente((prev) => ({ ...prev, comuna: "" }));
    }
  }, [cliente.region, comunasParaRegion]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente((prev) => ({ ...prev, [name]: value }));
  };

  // --- Simular compra ---
  const handleSubmit = (e) => {
    e.preventDefault();

    // 50% chance of éxito o fallo
    const esExito = Math.random() < 0.5;

    // Simular código de orden
    const codigoOrden = Math.floor(10000000 + Math.random() * 90000000);

    // Redirigir según resultado
    if (esExito) {
      navigate("/compra-exitosa", {
        state: { cliente, carrito, totalConDescuento, codigoOrden },
      });
    } else {
      navigate("/compra-fallida", {
        state: { cliente, carrito, totalConDescuento, codigoOrden },
      });
    }
  };

  return (
    <main className="container my-4">
      <div className="card mb-4">
        <div className="card-header bg-light d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Carrito de compra</h5>
          <div>
            {descuento > 0 && (
              <div className="text-success mb-1">
                Descuento aplicado: {(descuento * 100).toFixed(0)}%
              </div>
            )}
            <span className="badge bg-primary fs-6">
              Total a pagar: ${totalConDescuento.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="card-body">
          {carrito.length === 0 ? (
            <p>Tu carrito está vacío.</p>
          ) : (
            <table className="table text-center">
              <thead className="table-light">
                <tr>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {carrito.map((item, i) => {
                  const subtotal = item.precio * item.cantidad;
                  const subtotalConDescuento = descuento > 0 ? subtotal * (1 - descuento) : subtotal;
                  return (
                    <tr key={i}>
                      <td>{item.nombre}</td>
                      <td>${item.precio.toLocaleString()}</td>
                      <td>{item.cantidad}</td>
                      <td>${subtotalConDescuento.toLocaleString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          {mensajeBeneficio && (
            <div className="alert alert-success mt-3">{mensajeBeneficio}</div>
          )}
        </div>
      </div>

      {/* --- Información del cliente --- */}
      <div className="card mb-4">
        <div className="card-header bg-light">
          <h5 className="mb-0">Información del cliente</h5>
          <p className="text-muted mb-0"> {localStorage.getItem("usuarioLogueado") ? "Verifique la información pre-cargada" : "Complete la siguiente información"} </p>
        </div> <div className="card-body"> <form onSubmit={handleSubmit}>
          <div className="row g-3 mb-3">
            <div className="col-md-6"> <label className="form-label">Nombre*</label>
              <input type="text" className="form-control" name="nombre" value={cliente.nombre} onChange={handleChange} required /> </div>
            <div className="col-md-6"> <label className="form-label">Apellidos*</label>
              <input type="text" className="form-control" name="apellidos" value={cliente.apellidos} onChange={handleChange} required /> </div>
          </div> <div className="mb-3"> <label className="form-label">Correo*</label>
            <input type="email" className="form-control" name="correo" value={cliente.correo} onChange={handleChange} required /> </div>
          <div className="row g-3 mb-3"> <div className="col-md-8"> <label className="form-label">Calle*</label>
            <input type="text" className="form-control" name="calle" value={cliente.calle} onChange={handleChange} required /> </div>
            <div className="col-md-4"> <label className="form-label">Departamento (opcional)</label>
              <input type="text" className="form-control" name="departamento" value={cliente.departamento} onChange={handleChange} placeholder="Ej: 603" /> </div>
          </div> <div className="row g-3 mb-3"> <div className="col-md-6"> <label className="form-label">Región*</label>
            <select className="form-select" name="region" value={cliente.region} onChange={handleChange} required >
              <option value="">Seleccione una región</option> {Object.keys(regionesYComunas).map((r) => (<option key={r} value={r}> {r} </option>))} </select> </div>
            <div className="col-md-6"> <label className="form-label">Comuna*</label>
              <select className="form-select" name="comuna" value={cliente.comuna} onChange={handleChange} required >
                <option value="">Seleccione una comuna</option> {comunasParaRegion.map((c) => (<option key={c} value={c}> {c} </option>))} </select> </div>
          </div> <div className="mb-3"> <label className="form-label"> Indicaciones para la entrega (opcional) </label>
            <textarea className="form-control" name="indicaciones" value={cliente.indicaciones} onChange={handleChange} placeholder="Ej.: Entre calles, color del edificio, no tiene timbre." ></textarea>
          </div>
          <div className="text-end">
            <button type="submit" className="btn btn-success btn-lg">
              Pagar ahora ${totalConDescuento.toLocaleString()}
            </button>
          </div>
        </form>
        </div>
      </div>
    </main>
  );
}
