import axios from "axios";

const API_URL = "http://localhost:8080/api/usuario";

export const crearUsuario = async (usuario) => {
  try {
    const response = await axios.post(API_URL, usuario);
    return response.data;
  } catch (error) {
    console.error("Error al crear usuario:", error);
    throw error;
  }
};
