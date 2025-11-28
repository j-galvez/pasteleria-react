// Mapeo entre ID o nombre del producto y su imagen local
import brownie from "../assets/postres/brownie.webp";
import cheescake_noazucar from "../assets/postres/cheescake_noazucar.webp";
import empanada_manzana from "../assets/postres/empanada_manzana.webp";
import galletas_avena from "../assets/postres/galletas_avena.webp";
import mousse_chocolate from "../assets/postres/mousse_chocolate.webp";
import pan_nogluten from "../assets/postres/pan_nogluten.jpg";
import tarta_santiago from "../assets/postres/tarta_santiago.webp";
import tiramisu_clasico from "../assets/postres/tiramisu_clasico.webp";
import default_producto from "../assets/default_producto.jpeg";

// Aquí haces el match entre producto.nombre_producto o producto.id
// Usa exactamente el mismo texto que viene del backend

export const imagenesProductos = {
    1: brownie,
    2: cheescake_noazucar,
    3: empanada_manzana,
    4: galletas_avena,
    5: mousse_chocolate,
    6: pan_nogluten,
    7: tarta_santiago,
    8: tiramisu_clasico,
};

export const imagenPorDefecto = default_producto;
