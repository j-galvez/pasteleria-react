import React from "react";
import { useCarrito } from '../components/Navbar';
import mousse_chocolate from '../assets/postres/mousse_chocolate.webp';
import tiramisu_clasico from '../assets/postres/tiramisu_clasico.webp';
import cheescake_noazucar from '../assets/postres/cheescake_noazucar.webp';
import empanada_manzana from '../assets/postres/empanada_manzana.webp';
import tarta_santiago from '../assets/postres/tarta_santiago.webp';
import brownie from '../assets/postres/brownie.webp';
import pan_nogluten from '../assets/postres/pan_nogluten.jpg';
import galletas_avena from '../assets/postres/galletas_avena.webp';

export default function Postres() {
    const { agregarAlCarrito } = useCarrito();
    return(
         <main>

      <h1>Nuestros Postres</h1>

  
<div className="productos">
  <div className="card">
    <img src={mousse_chocolate} alt="Mousse de Chocolate"/>
    <h2>Mousse Chocolate</h2>
    <p className="precio">$5.000</p>
    <button className="btn" onClick={()=>agregarAlCarrito('Mousse Chocolate', 5000)}>Agregar</button>
    <button className="btn detalle-btn">Detalle</button>
    <div className="detalle-contenedor" style={{ display: 'none' }}>
      <p>Postre individual cremoso y suave, hecho con chocolate de alta calidad, ideal para los amantes del chocolate.</p>
    </div>
  </div>

  <div className="card">
    <img src={tiramisu_clasico} alt="Tiramisú Clásico"/>
    <h2>Tiramisú Clásico</h2>
    <p className="precio">$5.500</p>
    <button className="btn" onClick={()=>agregarAlCarrito('Tiramisú Clásico', 5500)}>Agregar</button>
    <button className="btn detalle-btn">Detalle</button>
    <div className="detalle-contenedor" style={{ display: 'none' }}>
      <p>Un postre italiano individual con capas de café, mascarpone y cacao, perfecto para finalizar cualquier comida.</p>
    </div>
  </div>

  <div className="card">
    <img src={cheescake_noazucar} alt="Cheesecake Sin Azúcar"/>
    <h2>Cheesecake Sin Azúcar</h2>
    <p className="precio">$47.000</p>
    <button className="btn" onClick={()=>agregarAlCarrito('Cheesecake Sin Azúcar', 47000)}>Agregar</button>
    <button className="btn detalle-btn">Detalle</button>
    <div className="detalle-contenedor" style={{display: 'none'}}>
      <p>Suave y cremoso, este cheesecake es una opción perfecta para disfrutar sin culpa</p>
    </div>
  </div>

  <div className="card">
    <img src={empanada_manzana} alt="Empanada de Manzana"/>
    <h2>Empanada de Manzana</h2>
    <p className="precio">$3.000</p>
    <button className="btn" onClick={()=>agregarAlCarrito('Empanada de Manzana', 3000)}>Agregar</button>
    <button className="btn detalle-btn">Detalle</button>
    <div className="detalle-contenedor" style={{display: 'none'}}>
      <p>Pastelería tradicional rellena de manzanas especiadas, perfecta para un dulce desayuno o merienda</p>
    </div>
  </div>

  <div className="card">
    <img src={tarta_santiago} alt="Tarta Santiago"/>
    <h2>Tarta Santiago</h2>
    <p className="precio">$6.000</p>
    <button className="btn" onClick={()=>agregarAlCarrito('Tarta Santiago', 6000)}>Agregar</button>
    <button className="btn detalle-btn">Detalle</button>
    <div className="detalle-contenedor" style={{display: 'none'}}>
      <p>Tradicional tarta española hecha con almendras, azúcar, y huevos, una delicia para los amantes de los postres clásicos</p>
    </div>
  </div>

  <div className="card">
    <img src={brownie} alt="Brownie Sin Gluten"/>
    <h2>Brownie Sin Gluten</h2>
    <p className="precio">$4.000</p>
    <button className="btn" onClick={()=>agregarAlCarrito('Brownie Sin Gluten', 4000)}>Agregar</button>
    <button className="btn detalle-btn">Detalle</button>
    <div className="detalle-contenedor" style={{display: 'none'}}>
      <p>Rico y denso, este brownie es perfecto para quienes necesitan evitar el gluten sin sacrificar el sabor</p>
    </div>
  </div>

  <div className="card">
    <img src={pan_nogluten} alt="Pan Sin Gluten"/>
    <h2>Pan Sin Gluten</h2>
    <p className="precio">$3.500</p>
    <button className="btn" onClick={()=>agregarAlCarrito('Pan Sin Gluten', 3500)}>Agregar</button>
    <button className="btn detalle-btn">Detalle</button>
    <div className="detalle-contenedor" style={{display: 'none'}}>
      <p>Suave y esponjoso, ideal para sándwiches o para acompañar cualquier comida</p>
    </div>
  </div>

  <div className="card">
    <img src={galletas_avena} alt="Galletas Veganas de Avena"/>
    <h2>Galletas Veganas de Avena</h2>
    <p className="precio">$4.000</p>
    <button className="btn" onClick={()=>agregarAlCarrito('Galletas Veganas de Avena', 4000)}>Agregar</button>
    <button className="btn detalle-btn">Detalle</button>
    <div className="detalle-contenedor" style={{display: 'none'}}>
      <p>Crujientes y sabrosas, estas galletas son una excelente opción para un snack saludable y vegano</p>
    </div>
  </div>
</div>

    </main>
    );
}