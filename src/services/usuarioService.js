import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const API = "http://localhost:8080/api/usuario";

// CREAR
export const crearUsuario = (usuario) =>
  axios.post(API, usuario).then(res => res.data);

// LISTAR TODOS
export const obtenerUsuarios = () =>
  axios.get(API).then(res => res.data);

// ACTUALIZAR
export const actualizarUsuario = (run, usuario) =>
  axios.put(`${API}/${run}`, usuario).then(res => res.data);

// ELIMINAR
export const eliminarUsuario = (run) =>
  axios.delete(`${API}/${run}`);
