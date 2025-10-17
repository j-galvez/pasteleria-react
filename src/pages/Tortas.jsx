import React from 'react';
// NavLink not used in this page
import { useCarrito } from '../components/Navbar';
import torta_chocolate from '../assets/tortas/torta_chocolate.webp';
import fruta_tortawebp from '../assets/tortas/fruta_tortawebp.webp';
import vainilla_circular from '../assets/tortas/vainilla_circular.webp';
import manjar_redondawebp from '../assets/tortas/manjar_redondawebp.webp';
import naranja_torta from '../assets/tortas/naranja_torta.webp';
import chocolate_vegan from '../assets/tortas/chocolate_vegan.webp';
import cumpleanos_torta from '../assets/tortas/cumpleanos_torta.webp';
import boda_torta from '../assets/tortas/boda_torta.webp';      

export default function Tortas() {
  const { agregarAlCarrito } = useCarrito();

  return (
        <main>

            <h1>Nuestras Tortas</h1>

            <div className="productos">
                  <div className="card">
                    <img src={torta_chocolate} alt="Torta de Chocolate" />
                    <h2>Torta Cuadrada Chocolate</h2>
                    <p className="precio">$45.000</p>
                    <button className="btn" onClick={() => agregarAlCarrito('Torta Cuadrada Chocolate', 45000)}>Agregar</button>
                    <button className="btn detalle-btn">Detalle</button>
                    <div className="detalle-contenedor" style={{ display: 'none' }}>
                      <p>Deliciosa torta de chocolate con capas de ganache y un toque
                        de avellanas. Personalizable con mensajes especiales</p>
                    </div>

                  </div>
                  <div className="card">
                    <img src={fruta_tortawebp} alt="Torta de Frutas" />
                    <h2>Torta Cuadrada Frutas</h2>
                    <p className="precio">$50.000</p>

                    <button className="btn" onClick={() => agregarAlCarrito('Torta Cuadrada Frutas', 50000)}>Agregar</button>
                    <button className="btn detalle-btn">Detalle</button>
                    <div className="detalle-contenedor" style={{ display: 'none' }}>
                      <p> Una mezcla de frutas frescas y crema chantilly sobre un suave
                        bizcocho de vainilla, ideal para celebraciones</p>
                    </div>

                  </div>
                  <div className="card">
                    <img src={vainilla_circular} alt="Torta Vainilla" />
                    <h2>Torta Circular Vainilla</h2>
                    <p className="precio">$40.000</p>

                    <button className="btn" onClick={() => agregarAlCarrito('Torta Circular Vainilla', 40000)}>Agregar</button>
                    <button className="btn detalle-btn">Detalle</button>
                    <div className="detalle-contenedor" style={{ display: 'none' }}>
                      <p>Bizcocho de vainilla clásico relleno con crema pastelera y cubierto
                        con un glaseado dulce, perfecto para cualquier ocasión</p>
                    </div>

                  </div>
                  <div className="card">
                    <img src={manjar_redondawebp} alt="Torta Circular Manjar" />
                    <h2>Torta Circular Manjar</h2>
                    <p className="precio">$42.000</p>

                    <button className="btn" onClick={() => agregarAlCarrito('Torta Circular Manjar', 42000)}>Agregar</button>
                    <button className="btn detalle-btn">Detalle</button>
                    <div className="detalle-contenedor" style={{ display: 'none' }}>
                      <p>Torta tradicional chilena con manjar y nueces, un deleite para los
                        amantes de los sabores dulces y clásicos</p>
                    </div>

                  </div>
                  <div className="card">
                    <img src={naranja_torta} alt="Torta Sin Azucar Naranja" />
                    <h2>Torta Sin Azucar Naranja</h2>
                    <p className="precio">$48.000</p>

                    <button className="btn" onClick={() => agregarAlCarrito('Torta Sin Azucar Naranja', 48000)}>Agregar</button>
                    <button className="btn detalle-btn">Detalle</button>
                    <div className="detalle-contenedor" style={{ display: 'none' }}>
                      <p> Torta ligera y deliciosa, endulzada naturalmente, ideal para
                        quienes buscan opciones más saludables</p>
                    </div>

                  </div>
                  <div className="card">
                    <img src={chocolate_vegan} alt="Torta Vegana Chocolate" />
                    <h2>Torta Vegana Chocolate</h2>
                    <p className="precio">$50.000</p>

                    <button className="btn" onClick={() => agregarAlCarrito('Torta Vegana Chocolate', 50000)}>Agregar</button>
                    <button className="btn detalle-btn">Detalle</button>
                    <div className="detalle-contenedor" style={{ display: 'none' }}>
                      <p>Torta de chocolate húmeda y deliciosa, hecha sin productos de
                        origen animal, perfecta para veganos</p>
                    </div>

                  </div>
                  <div className="card">
                    <img src={cumpleanos_torta} alt="Torta Especial Cumpleaños" />
                    <h2>Torta Especial Cumpleaños</h2>
                    <p className="precio">$55.000</p>

                    <button className="btn" onClick={() => agregarAlCarrito('Torta Especial Cumpleaños', 55000)}>Agregar</button>
                    <button className="btn detalle-btn">Detalle</button>
                    <div className="detalle-contenedor" style={{ display: 'none' }}>
                      <p>Diseñada especialmente para celebraciones, personalizable
                        con decoraciones y mensajes únicos</p>
                    </div>

                  </div>
                  <div className="card">
                    <img src={boda_torta} alt="Torta Especial de Boda" />
                    <h2>Torta Especial Boda</h2>
                    <p className="precio">$60.000</p>
                    <button className="btn" onClick={() => agregarAlCarrito('Torta Especial Boda', 60000)}>Agregar</button>

                    <button className="btn detalle-btn">Detalle</button>
                    <div className="detalle-contenedor" style={{ display: 'none' }}>
                      <p> Elegante y deliciosa, esta torta está diseñada para ser el centro de
                        atención en cualquier boda</p>
                    </div>
                  </div>
                </div>
        </main>
    );
}