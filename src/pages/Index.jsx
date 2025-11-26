import { NavLink } from "react-router-dom";
import pasteleria from '../assets/pasteleria.svg';
import torta_chocolate from '../assets/tortas/torta_chocolate.webp';
import vainilla_circular from '../assets/tortas/vainilla_circular.webp';
import brownie from '../assets/postres/brownie.webp';
import empanada_manzana from '../assets/postres/empanada_manzana.webp';
import fruta_tortawebp from '../assets/tortas/fruta_tortawebp.webp';
import naranja_torta from '../assets/tortas/naranja_torta.webp';
import galletas_avena from '../assets/postres/galletas_avena.webp';
import mousse_chocolate from '../assets/postres/mousse_chocolate.webp';

export default function Index() {
    return(
    <main>
   
    <div className="user-links">
        <NavLink to="/login">Iniciar sesión </NavLink> | 
        <NavLink to= "/registro">Registrar usuario</NavLink>
    </div>
    
   
    <section className="hero">
        <div className="hero-text">
            <h1>Tienda Online</h1>
            <p>Bienvenido a nuestra tienda online, donde encontrarás los mejores productos al mejor precio.</p>
            <button>Ver productos</button>
        </div>
        <div className="hero-img">
            <img src={pasteleria} alt="Imagen de tienda"/>
        </div>
    </section>

    <section className="productos">
        <div className="card">
            <img src={torta_chocolate} alt="Producto"/>
            <h3>Torta Cuadrada de Chocolate</h3>
            <div className="info">
                <span className="atributos">Atributos</span>
                <span className="precio">$45.000</span>
            </div>
        </div>
        <div className="card">
            <img src={vainilla_circular} alt="Producto"/>
            <h3>Torta circular de Vainilla</h3>
            <div className="info">
                <span className="atributos">Atributos</span>
                <span className="precio">$40.000</span>
            </div>
        </div>
        <div className="card">
            <img src={brownie} alt="Producto"/>
            <h3>Brownie Sin Gluten</h3>
            <div className="info">
                <span className="atributos">Atributos</span>
                <span className="precio">$4.000</span>
            </div>
        </div>
        <div className="card">
            <img src={empanada_manzana} alt="Producto"/>
            <h3>Empanada de Manzana</h3>
            <div className="info">
                <span className="atributos">Atributos</span>
                <span className="precio">$3.000</span>
            </div>
        </div>
        <div className="card">
            <img src={fruta_tortawebp} alt="Producto"/>
            <h3>Torta Cuadrada Frutas</h3>
            <div className="info">
                <span className="atributos">Atributos</span>
                <span className="precio">$50.000</span>
            </div>
        </div>
        <div className="card">
            <img src={naranja_torta} alt="Producto"/>
            <h3>Torta Sin Azucar Naranja</h3>
            <div className="info">
                <span className="atributos">Atributos</span>
                <span className="precio">$48.000</span>
            </div>
        </div>
        <div className="card">
            <img src={galletas_avena} alt="Producto"/>
            <h3>Galletas Veganas de Avena</h3>
            <div className="info">
                <span className="atributos">Atributos</span>
                <span className="precio">$4.000</span>
            </div>
        </div>
        <div className="card">
            <img src={mousse_chocolate} alt="Producto"/>
            <h3>Mousse Chocolate</h3>
            <div className="info">
                <span className="atributos">Atributos</span>
                <span className="precio">$5.000</span>
            </div>
        </div>
    </section>
    </main>
    )
}

