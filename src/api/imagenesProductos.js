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
import boda_torta from "../assets/tortas/boda_torta.webp";
import chocolate_vegan from "../assets/tortas/chocolate_vegan.webp";
import cumpleanos_torta from "../assets/tortas/cumpleanos_torta.webp";
import fruta_torta from "../assets/tortas/fruta_tortawebp.webp";
import manjar_redonda from "../assets/tortas/manjar_redondawebp.webp";
import naranja_torta from "../assets/tortas/naranja_torta.webp";
import torta_chocolate from "../assets/tortas/torta_chocolate.webp";
import vainilla_circular from "../assets/tortas/vainilla_circular.webp";

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
    9: boda_torta,
    10: chocolate_vegan,
    11: cumpleanos_torta,
    12: fruta_torta,
    13: manjar_redonda,
    14: naranja_torta,
    15: torta_chocolate,
    16: vainilla_circular,
    17: default_producto,
};

export const imagenPorDefecto = default_producto;
