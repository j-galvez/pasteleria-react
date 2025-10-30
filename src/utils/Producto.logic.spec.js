// src/utils/Producto.logic.spec.js
describe('ProductoLogic - pruebas unitarias', function () {

  // ---------- Tests agregarProducto ----------
  describe('agregarProducto', function () {
    it('agrega un producto válido a la lista', function () {
      var productos = [];
      var formData = { categoria: 'Tortas', nombre: 'Torta Test', precio: '5000', imagen: 'foto.png' };
      var result = window.ProductoLogic.agregarProducto(productos, formData);
      expect(result.length).toBe(1);
      expect(result[0].nombre).toBe('Torta Test');
    });

    it('usa imagen placeholder si falta imagen', function () {
      var result = window.ProductoLogic.agregarProducto([], { nombre: 'X', precio: '1000' });
      expect(result[0].imagen).toBe('/img/placeholder.png');
    });

    it('maneja entrada inválida (productos no array)', function () {
      var result = window.ProductoLogic.agregarProducto(null, { nombre: 'T' });
      expect(Array.isArray(result)).toBe(true);
    });
  });

  // ---------- Tests editarProducto ----------
  describe('editarProducto', function () {
    it('modifica producto en índice válido', function () {
      var productos = [{ nombre: 'Viejo', precio: 1000 }];
      var result = window.ProductoLogic.editarProducto(productos, { nombre: 'Nuevo', precio: 2000 }, 0);
      expect(result[0].nombre).toBe('Nuevo');
    });

    it('no modifica si índice inválido', function () {
      var productos = [{ nombre: 'A' }];
      var result = window.ProductoLogic.editarProducto(productos, { nombre: 'B' }, null);
      expect(result[0].nombre).toBe('A');
    });

    it('convierte precio a número', function () {
      var productos = [{ nombre: 'X', precio: '10' }];
      var result = window.ProductoLogic.editarProducto(productos, { nombre: 'X', precio: '3000' }, 0);
      expect(typeof result[0].precio).toBe('number');
    });
  });

  // ---------- Tests eliminarProducto ----------
  describe('eliminarProducto', function () {
    it('elimina producto correctamente', function () {
      var productos = [{ nombre: 'A' }, { nombre: 'B' }];
      var result = window.ProductoLogic.eliminarProducto(productos, 0);
      expect(result.length).toBe(1);
      expect(result[0].nombre).toBe('B');
    });

    it('no elimina si índice fuera de rango', function () {
      var productos = [{ nombre: 'A' }];
      var result = window.ProductoLogic.eliminarProducto(productos, 9);
      expect(result.length).toBe(1);
    });

    it('devuelve [] si productos no es array', function () {
      var result = window.ProductoLogic.eliminarProducto(null, 0);
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(0);
    });
  });

  // ---------- Tests actualizarFormData ----------
  describe('actualizarFormData', function () {
    it('actualiza correctamente el campo indicado', function () {
      var form = { nombre: 'A' };
      var result = window.ProductoLogic.actualizarFormData(form, 'nombre', 'B');
      expect(result.nombre).toBe('B');
    });

    it('mantiene otros campos sin cambios', function () {
      var form = { nombre: 'A', categoria: 'C' };
      var result = window.ProductoLogic.actualizarFormData(form, 'nombre', 'Z');
      expect(result.categoria).toBe('C');
    });

    it('funciona con form vacío', function () {
      var result = window.ProductoLogic.actualizarFormData({}, 'x', 'y');
      expect(result.x).toBe('y');
    });
  });

  // ---------- Tests limpiarForm ----------
  describe('limpiarForm', function () {
    it('devuelve objeto con campos vacíos', function () {
      var result = window.ProductoLogic.limpiarForm();
      expect(result.nombre).toBe('');
      expect(result.categoria).toBe('');
    });

    it('es un nuevo objeto cada vez', function () {
      var a = window.ProductoLogic.limpiarForm();
      var b = window.ProductoLogic.limpiarForm();
      expect(a).not.toBe(b);
    });

    it('tiene todas las llaves esperadas', function () {
      var r = window.ProductoLogic.limpiarForm();
      expect(Object.keys(r)).toEqual(['categoria', 'nombre', 'precio', 'imagen']);
    });
  });
});
