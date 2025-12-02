import axios from 'axios';

const API_URL = 'http://localhost:8080/api/pedido';

export const obtenerVentas = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error obteniendo ventas:', error);
    throw error;
  }
};

export const obtenerVentasPorUsuario = async (run) => {
  try {
    const response = await axios.get(`${API_URL}/usuario/${run}`);
    return response.data;
  } catch (error) {
    console.error('Error obteniendo ventas del usuario:', error);
    throw error;
  }
};