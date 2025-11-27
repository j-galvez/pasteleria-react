import axios from "axios";
const API_URL = "http://localhost:8080/api/pedido";

/**
* Obtiene todos los productos desde el backend (GET)
*/
export const getPedidos = async () => {
const res = await axios.get(API_URL);
return res.data;
}
/**
* Crea un nuevo producto (POST)
*/
export const createPedido = async (pedido) => {
const response = await axios.post(API_URL, pedido);
return response.data;
}
/**
* Actualiza un producto existente (PUT)
*/
export const updatePedido = async (idPedido, pedido) => {
const res = await axios.put(`${API_URL}/${idPedido}`, pedido);
return res.data;
}
/**
* Elimina un producto por su ID (DELETE)
*/
export const deletePedido = async (idPedido) => {
const res = await axios.delete(`${API_URL}/${idPedido}`);
return res.data;
}