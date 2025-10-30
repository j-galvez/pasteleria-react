// src/utils/Ventas.logic.spec.js
// Pruebas unitarias con Jasmine + Karma para Ventas.logic.js
// Usa window.VentasLogic (sin destructuring)

describe('VentasLogic (lógica pura)', function () {
  var ventasEjemplo;

  beforeEach(function () {
    ventasEjemplo = [
      {
        id: 1,
        fecha: '2025-10-28',
        cliente: { nombre: 'Ana', apellidos: 'Perez', correo: 'ana@example.com' },
        carrito: [
          { nombre: 'Producto A', cantidad: 2 },
          { nombre: 'Producto B', cantidad: 1 }
        ],
        totalPagado: 20000
      }
    ];
    window.localStorage.removeItem('ventas');
  });

  // --- cargarVentasFromLocalStorage ---
  describe('cargarVentasFromLocalStorage', function () {
    it('devuelve [] si localStorage está vacío', function () {
      var result = window.VentasLogic.cargarVentasFromLocalStorage();
      expect(result.length).toBe(0);
    });

    it('devuelve array si hay JSON válido', function () {
      window.localStorage.setItem('ventas', JSON.stringify(ventasEjemplo));
      var result = window.VentasLogic.cargarVentasFromLocalStorage();
      expect(result[0].cliente.nombre).toBe('Ana');
    });

    it('maneja JSON inválido devolviendo []', function () {
      window.localStorage.setItem('ventas', '{nojson}');
      var result = window.VentasLogic.cargarVentasFromLocalStorage();
      expect(result).toEqual([]);
    });
  });

  // --- calcularTotalVentas ---
  describe('calcularTotalVentas', function () {
    it('retorna cantidad correcta de ventas', function () {
      var result = window.VentasLogic.calcularTotalVentas(ventasEjemplo);
      expect(result).toBe(1);
    });

    it('lanza error si no es array', function () {
      expect(function () {
        window.VentasLogic.calcularTotalVentas(null);
      }).toThrowError();
    });

    it('retorna 0 si array vacío', function () {
      var result = window.VentasLogic.calcularTotalVentas([]);
      expect(result).toBe(0);
    });
  });

  // --- formatearMoneda ---
  describe('formatearMoneda', function () {
    it('formatea correctamente un número', function () {
      var result = window.VentasLogic.formatearMoneda(10000);
      expect(result).toContain('$');
    });

    it('retorna "$0" si el valor es NaN', function () {
      var result = window.VentasLogic.formatearMoneda(NaN);
      expect(result).toBe('$0');
    });

    it('retorna "$0" si el valor no es número', function () {
      var result = window.VentasLogic.formatearMoneda('texto');
      expect(result).toBe('$0');
    });
  });

  // --- generarDetalleVenta ---
  describe('generarDetalleVenta', function () {
    it('devuelve lista de productos', function () {
      var detalle = window.VentasLogic.generarDetalleVenta(ventasEjemplo[0]);
      expect(detalle.length).toBe(2);
      expect(detalle[0]).toContain('Producto A');
    });

    it('devuelve [] si carrito es inválido', function () {
      var detalle = window.VentasLogic.generarDetalleVenta({});
      expect(detalle).toEqual([]);
    });

    it('maneja carrito vacío correctamente', function () {
      var detalle = window.VentasLogic.generarDetalleVenta({ carrito: [] });
      expect(detalle.length).toBe(0);
    });
  });

  // --- crearVenta ---
  describe('crearVenta', function () {
    it('crea una venta nueva correctamente', function () {
      var nueva = window.VentasLogic.crearVenta([], {
        cliente: { nombre: 'Juan', apellidos: 'Gomez', correo: 'j@example.com' },
        totalPagado: 15000
      });
      expect(nueva.length).toBe(1);
      expect(nueva[0].id).toBe(1);
    });

    it('lanza error si datos inválidos', function () {
      expect(function () {
        window.VentasLogic.crearVenta([], {});
      }).toThrowError();
    });

    it('incrementa ID según última venta', function () {
      var nuevas = window.VentasLogic.crearVenta(ventasEjemplo, {
        cliente: { nombre: 'Luis', apellidos: 'Lopez', correo: 'l@example.com' },
        totalPagado: 25000
      });
      expect(nuevas[1].id).toBe(2);
    });
  });

  // --- setLocalStorageVentas ---
  describe('setLocalStorageVentas', function () {
    it('guarda correctamente en localStorage', function () {
      window.VentasLogic.setLocalStorageVentas(ventasEjemplo);
      var stored = JSON.parse(window.localStorage.getItem('ventas'));
      expect(stored.length).toBe(1);
    });

    it('sobrescribe valor anterior', function () {
      window.localStorage.setItem('ventas', '[]');
      window.VentasLogic.setLocalStorageVentas(ventasEjemplo);
      var stored = JSON.parse(window.localStorage.getItem('ventas'));
      expect(stored[0].id).toBe(1);
    });

    it('puede leerse luego con cargarVentasFromLocalStorage', function () {
      window.VentasLogic.setLocalStorageVentas(ventasEjemplo);
      var result = window.VentasLogic.cargarVentasFromLocalStorage();
      expect(result.length).toBe(1);
    });
  });
});
