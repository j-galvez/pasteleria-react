// src/utils/Carrito.logic.js
// Lógica pura extraída del componente Carrito.
// Todas las funciones se definen dentro del objeto global window.CarritoLogic.

window.CarritoLogic = {
  /**
   * Obtiene el usuario logueado desde el localStorage.
   * @returns {Object|null} Objeto del usuario o null si no existe.
   */
  obtenerUsuarioLogueado: function() {
    try {
      const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));
      return usuario || null;
    } catch (e) {
      return null;
    }
  },

  /**
   * Calcula el total del carrito.
   * @param {Array} carrito - Lista de productos con {precio, cantidad}.
   * @returns {number} Total sin descuento.
   */
  calcularTotal: function (carrito) {
  if (!Array.isArray(carrito)) return 0;

  return carrito.reduce((acc, p) => {
    const precio = parseFloat(p.precio);
    const cantidad = parseFloat(p.cantidad);

    // Si alguno de los dos no es numérico, lo ignoramos
    if (isNaN(precio) || isNaN(cantidad)) {
      return acc;
    }

    return acc + precio * cantidad;
  }, 0);
},


  /**
   * Obtiene el descuento y mensaje según los beneficios del usuario.
   * @param {Object|null} usuario - Usuario logueado.
   * @returns {Object} { descuento, mensajeBeneficio }
   */
  obtenerDescuentoYMensaje: function(usuario) {
    let descuento = 0;
    let mensajeBeneficio = "";

    if (usuario && usuario.beneficios) {
      if (usuario.beneficios.descuento) {
        descuento = usuario.beneficios.descuento;
        mensajeBeneficio =
          descuento === 0.5
            ? "¡Tienes 50% de descuento por ser mayor de 50 años!"
            : "¡Tienes 10% de descuento por código FELICES50!";
      }
    }
    return { descuento, mensajeBeneficio };
  },

  /**
   * Aplica el descuento sobre el total.
   * @param {number} total - Monto total original.
   * @param {number} descuento - Porcentaje de descuento (0 a 1).
   * @returns {number} Total con descuento aplicado.
   */
  calcularTotalConDescuento: function(total, descuento) {
    if (typeof total !== "number" || total < 0) return 0;
    if (typeof descuento !== "number" || descuento <= 0) return total;
    return total * (1 - descuento);
  }
};
