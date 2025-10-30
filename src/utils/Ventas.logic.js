// src/utils/Ventas.logic.js
// Lógica pura para el componente Ventas
// Todas las funciones se exponen en window.VentasLogic
// Evita redeclaración global

(function () {
  if (window.VentasLogic) return;

  window.VentasLogic = {
    /**
     * cargarVentasFromLocalStorage
     * Lee el item 'ventas' desde localStorage (JSON) y devuelve un array.
     * Si no existe o es inválido, devuelve [].
     * @returns {Array}
     */
    cargarVentasFromLocalStorage: function () {
      try {
        const raw = window.localStorage.getItem('ventas');
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        return [];
      }
    },

    /**
     * calcularTotalVentas
     * Devuelve el número total de ventas registradas.
     * @param {Array} ventas
     * @returns {number}
     */
    calcularTotalVentas: function (ventas) {
      if (!Array.isArray(ventas)) throw new Error('ventas debe ser un array');
      return ventas.length;
    },

    /**
     * formatearMoneda
     * Formatea un número como moneda local chilena con separador de miles.
     * @param {number} valor
     * @returns {string}
     */
    formatearMoneda: function (valor) {
      if (typeof valor !== 'number' || isNaN(valor)) return '$0';
      return '$' + valor.toLocaleString();
    },

    /**
     * generarDetalleVenta
     * Dado un objeto venta, devuelve un arreglo de strings con productos formateados.
     * @param {Object} venta
     * @returns {Array<string>}
     */
    generarDetalleVenta: function (venta) {
      if (!venta || !Array.isArray(venta.carrito)) return [];
      return venta.carrito.map(item => `${item.nombre} (x${item.cantidad})`);
    },

    /**
     * crearVenta
     * Crea una nueva venta válida con ID autoincremental y datos mínimos requeridos.
     * @param {Array} ventas
     * @param {Object} ventaData
     * @returns {Array}
     */
    crearVenta: function (ventas, ventaData) {
      if (!Array.isArray(ventas)) throw new Error('ventas debe ser un array');
      if (!ventaData || typeof ventaData !== 'object') throw new Error('ventaData inválida');
      if (!ventaData.cliente || !ventaData.totalPagado) throw new Error('Campos requeridos: cliente y totalPagado');

      const nextId = ventas.length > 0 ? ventas[ventas.length - 1].id + 1 : 1;
      const nuevaVenta = {
        id: nextId,
        fecha: ventaData.fecha || new Date().toISOString().split('T')[0],
        cliente: ventaData.cliente,
        carrito: ventaData.carrito || [],
        totalPagado: ventaData.totalPagado
      };
      return ventas.concat([nuevaVenta]);
    },

    /**
     * setLocalStorageVentas
     * Persiste las ventas en localStorage.
     * @param {Array} ventas
     */
    setLocalStorageVentas: function (ventas) {
      window.localStorage.setItem('ventas', JSON.stringify(ventas));
    }
  };
})();
