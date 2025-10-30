// src/utils/Registro.logic.spec.js
// Tests Jasmine para RegistroLogic
describe('RegistroLogic - tests básicos', function () {
  beforeEach(function () {
    // limpiar localStorage antes de cada test
    localStorage.clear();
  });

  // ---------- Tests calcularEdad ----------
  describe('calcularEdad', function () {
    it('devuelve edad correcta para fecha válida (caso normal)', function () {
      // Si hoy es 2025-10-29 (ejemplo), para 2000-01-01 la edad debe ser 25
      var edad = window.RegistroLogic.calcularEdad('2000-01-01', '2025-10-29');
      expect(edad).toBeGreaterThan(0);
      expect(typeof edad).toBe('number');
    });

    it('devuelve 0 para fecha nula o vacía (entrada inválida)', function () {
      var edad = window.RegistroLogic.calcularEdad('', '2025-10-29');
      expect(edad).toBe(0);
    });

    it('manejando caso borde: cumpleaños hoy (sin restar mes)', function () {
      // Simulamos mismo día y mes -> edad exacta
      var edad = window.RegistroLogic.calcularEdad('2000-10-29', '2025-10-29');
      expect(edad).toBe(25);
    });
  });

  // ---------- Tests determinarBeneficios ----------
  describe('determinarBeneficios', function () {
    it('aplica 50% para edad mayor a 50', function () {
      var b = window.RegistroLogic.determinarBeneficios(51, '', 'user@correo.com');
      expect(b.descuento).toBe(0.5);
    });

    it('aplica codigo FELICES50 y setea descuento minimo 10%', function () {
      var b = window.RegistroLogic.determinarBeneficios(30, 'FELICES50', 'a@b.com');
      expect(b.descuento).toBe(0.1);
      expect(b.descuentoFijo).toBe(true);
    });

    it('si es email @duocuc.cl asigna tortaGratisCumple', function () {
      var b = window.RegistroLogic.determinarBeneficios(25, '', 'yo@duocuc.cl');
      expect(b.tortaGratisCumple).toBe(true);
    });

    it('prioriza mayor descuento (edad>50 vs FELICES50)', function () {
      var b = window.RegistroLogic.determinarBeneficios(60, 'FELICES50', 'x@y.com');
      // descuento debe ser 0.5 (mayor)
      expect(b.descuento).toBe(0.5);
      expect(b.descuentoFijo).toBe(true); // aún marca descuentoFijo si viene el código
    });
  });

  // ---------- Tests buildUsuario ----------
  describe('buildUsuario', function () {
    it('construye usuario con campos completos (entrada válida)', function () {
      var u = window.RegistroLogic.buildUsuario({
        run: '19011022K',
        nombre: 'Juan',
        apellidos: 'Perez',
        correo: 'a@b.com',
        password: '1234',
        direccion: 'Calle 1',
        region: 'Región de X',
        comuna: 'Comuna Y',
        fechaNac: '1990-01-01',
        edad: 35,
        beneficios: { descuento: 0.1 }
      });
      expect(u.nombre).toBe('Juan');
      expect(u.edad).toBe(35);
      expect(u.beneficios.descuento).toBe(0.1);
    });

    it('rellena campos vacíos con strings vacíos y edad 0 (entrada parcial)', function () {
      var u = window.RegistroLogic.buildUsuario({});
      expect(u.run).toBe('');
      expect(u.edad).toBe(0);
      expect(typeof u.beneficios).toBe('object');
    });

    it('no falla si edad es NaN (edge case)', function () {
      var u = window.RegistroLogic.buildUsuario({ edad: 'NaN' });
      expect(u.edad).toBe(0);
    });
  });

  // ---------- Tests guardarUsuarioLocal ----------
  describe('guardarUsuarioLocal', function () {
    it('guarda un usuario y lee localStorage correctamente (caso normal)', function () {
      var u = { nombre: 'Test', run: '1' };
      var ok = window.RegistroLogic.guardarUsuarioLocal(u);
      expect(ok).toBe(true);
      var almacen = JSON.parse(localStorage.getItem('usuarios'));
      expect(Array.isArray(almacen)).toBe(true);
      expect(almacen.length).toBe(1);
      expect(almacen[0].nombre).toBe('Test');
    });

    it('guarda múltiples usuarios acumulando en el array', function () {
      window.RegistroLogic.guardarUsuarioLocal({ nombre: 'A' });
      window.RegistroLogic.guardarUsuarioLocal({ nombre: 'B' });
      var almacen = JSON.parse(localStorage.getItem('usuarios'));
      expect(almacen.length).toBe(2);
      expect(almacen[1].nombre).toBe('B');
    });

    it('maneja error en localStorage (simulado) devolviendo false', function () {
      // Simulamos localStorage.setItem fallando
      var originalSetItem = localStorage.setItem;
      localStorage.setItem = function () { throw new Error('Fallo'); };
      var ok = window.RegistroLogic.guardarUsuarioLocal({ nombre: 'X' });
      expect(ok).toBe(false);
      // Restaurar
      localStorage.setItem = originalSetItem;
    });
  });

  // ---------- Tests comunasParaRegion ----------
  describe('comunasParaRegion', function () {
    it('devuelve lista de comunas para región válida', function () {
      var comunas = window.RegistroLogic.comunasParaRegion('Región Metropolitana de Santiago');
      expect(Array.isArray(comunas)).toBe(true);
      expect(comunas.length).toBeGreaterThan(0);
    });

    it('devuelve [] para región inválida o vacía', function () {
      var comunas = window.RegistroLogic.comunasParaRegion('Región que no existe');
      expect(Array.isArray(comunas)).toBe(true);
      expect(comunas.length).toBe(0);
    });

    it('es determinista: misma región mismo resultado', function () {
      var a = window.RegistroLogic.comunasParaRegion('Región de Antofagasta');
      var b = window.RegistroLogic.comunasParaRegion('Región de Antofagasta');
      expect(JSON.stringify(a)).toBe(JSON.stringify(b));
    });
  });
});
