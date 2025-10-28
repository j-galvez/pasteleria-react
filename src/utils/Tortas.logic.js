// 📦 src/utils/Tortas.logic.js
// ==========================================================
// Lógica pura extraída del componente React "Tortas"
// Todas las funciones se agrupan en window.TortasLogic
// ==========================================================

// Evita redefinir el objeto si ya existe
window.TortasLogic = window.TortasLogic || {};

/**
 * 📘 Función: agregarTortaAlCarrito
 * ---------------------------------
 * Lógica central para agregar una torta al carrito.
 * Separa la responsabilidad del componente React y
 * permite probar la función de forma aislada con Jasmine.
 *
 * @param {Function} agregarAlCarrito - función del hook useCarrito()
 * @param {string} nombre - nombre de la torta
 * @param {number} precio - precio de la torta
 * @returns {string} mensaje de confirmación o error
 */
window.TortasLogic.agregarTortaAlCarrito = function (agregarAlCarrito, nombre, precio) {
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
  return `✅ ${nombre} agregada al carrito con precio $${precio}`;
};
