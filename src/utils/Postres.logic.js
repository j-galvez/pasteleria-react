// 📦 src/utils/Postres.logic.js
// ==========================================================
// Lógica pura extraída del componente React "Postres"
// Todas las funciones se agrupan en window.PostresLogic
// ==========================================================

// Evita redefinir el objeto si ya existe
window.PostresLogic = window.PostresLogic || {};

/**
 * 📘 Función: agregarPostreAlCarrito
 * ---------------------------------
 * Encapsula la lógica de agregar un postre al carrito.
 * Valida los parámetros antes de ejecutar la función del hook.
 *
 * @param {Function} agregarAlCarrito - función proveniente del hook useCarrito()
 * @param {string} nombre - nombre del postre seleccionado
 * @param {number} precio - precio numérico del postre
 * @returns {string} Mensaje de éxito o error
 */
window.PostresLogic.agregarPostreAlCarrito = function (agregarAlCarrito, nombre, precio) {
  if (typeof agregarAlCarrito !== 'function') {
    return 'Error: agregarAlCarrito no es una función válida.';
  }

  if (!nombre || typeof nombre !== 'string') {
    return 'Error: nombre inválido.';
  }

  if (isNaN(precio) || precio <= 0) {
    return 'Error: precio inválido.';
  }

  // Ejecuta la acción original del hook
  agregarAlCarrito(nombre, precio);
  return `✅ ${nombre} agregado al carrito con precio $${precio}`;
};
