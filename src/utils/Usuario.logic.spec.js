// src/utils/Usuario.logic.spec.js
// Tests Jasmine para Usuario.logic.js
// Usamos window.UsuarioLogic explícitamente (no destructuring)

describe('UsuarioLogic (lógica pura)', function () {
  var initialUsuarios;

  beforeEach(function () {
    // estado de ejemplo para tests
    initialUsuarios = [
      { id: 1, nombre: 'Ana', apellidos: 'Perez', correo: 'ana@example.com', region: 'RM', comuna: 'Santiago', edad: '30' },
      { id: 2, nombre: 'Luis', apellidos: 'Gomez', correo: 'luis@example.com', region: 'V', comuna: 'Viña', edad: '25' }
    ];
    // limpiar localStorage antes de cada test
    window.localStorage.removeItem('usuarios');
  });

  /*--------------------------
    Tests para cargarUsuariosFromLocalStorage
  ---------------------------*/
  describe('cargarUsuariosFromLocalStorage', function () {
    it('devuelve [] si no hay nada en localStorage', function () {
      var result = window.UsuarioLogic.cargarUsuariosFromLocalStorage();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(0);
    });

    it('devuelve array parseado correctamente si hay JSON válido', function () {
      window.localStorage.setItem('usuarios', JSON.stringify(initialUsuarios));
      var result = window.UsuarioLogic.cargarUsuariosFromLocalStorage();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(2);
      expect(result[0].nombre).toBe('Ana');
    });

    it('maneja JSON inválido devolviendo []', function () {
      window.localStorage.setItem('usuarios', 'no es json');
      var result = window.UsuarioLogic.cargarUsuariosFromLocalStorage();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(0);
    });
  });

  /*--------------------------
    Tests para agregarUsuario
  ---------------------------*/
  describe('agregarUsuario', function () {
    it('agrega usuario válido al final (caso normal)', function () {
      var nuevos = window.UsuarioLogic.agregarUsuario([], {
        nombre: 'María', apellidos: 'Lopez', correo: 'maria@example.com'
      });
      expect(Array.isArray(nuevos)).toBe(true);
      expect(nuevos.length).toBe(1);
      expect(nuevos[0].id).toBe(1);
      expect(nuevos[0].nombre).toBe('María');
    });

    it('lanza error si usuarioData es nulo/incorrecto', function () {
      expect(function () {
        window.UsuarioLogic.agregarUsuario(initialUsuarios, null);
      }).toThrowError();
    });

    it('mantiene inmutabilidad del array original (caso borde)', function () {
      var copiaAntes = initialUsuarios.slice();
      var nuevos = window.UsuarioLogic.agregarUsuario(initialUsuarios, {
        nombre: 'Pedro', apellidos: 'Ruiz', correo: 'pedro@example.com'
      });
      // original no debe cambiar
      expect(initialUsuarios.length).toBe(copiaAntes.length);
      expect(nuevos.length).toBe(initialUsuarios.length + 1);
    });
  });

  /*--------------------------
    Tests para getUsuarioForEditing
  ---------------------------*/
  describe('getUsuarioForEditing', function () {
    it('devuelve datos del usuario para editar (caso normal)', function () {
      var data = window.UsuarioLogic.getUsuarioForEditing(initialUsuarios, 1);
      expect(data).not.toBeNull();
      expect(data.nombre).toBe('Luis');
    });

    it('devuelve null si índice inválido', function () {
      expect(window.UsuarioLogic.getUsuarioForEditing(initialUsuarios, 5)).toBeNull();
    });

    it('devuelve copia (mutaciones externas no afectan original) (caso borde)', function () {
      var data = window.UsuarioLogic.getUsuarioForEditing(initialUsuarios, 0);
      data.nombre = 'X';
      expect(initialUsuarios[0].nombre).toBe('Ana');
    });
  });

  /*--------------------------
    Tests para actualizarUsuario
  ---------------------------*/
  describe('actualizarUsuario', function () {
    it('actualiza correctamente un usuario existente (caso normal)', function () {
      var updated = window.UsuarioLogic.actualizarUsuario(initialUsuarios, 0, { nombre: 'Ana Maria' });
      expect(updated[0].nombre).toBe('Ana Maria');
      // otros campos mantienen valor anterior
      expect(updated[0].correo).toBe('ana@example.com');
    });

    it('lanza error si editingIndex inválido', function () {
      expect(function () {
        window.UsuarioLogic.actualizarUsuario(initialUsuarios, 5, { nombre: 'X' });
      }).toThrowError();
    });

    it('no muta el array original (caso borde)', function () {
      var copiaAntes = JSON.stringify(initialUsuarios);
      var updated = window.UsuarioLogic.actualizarUsuario(initialUsuarios, 1, { nombre: 'Luisito' });
      expect(JSON.stringify(initialUsuarios)).toBe(copiaAntes);
      expect(updated[1].nombre).toBe('Luisito');
    });
  });

  /*--------------------------
    Tests para eliminarUsuarioByIndex
  ---------------------------*/
  describe('eliminarUsuarioByIndex', function () {
    it('elimina usuario por índice (caso normal)', function () {
      var result = window.UsuarioLogic.eliminarUsuarioByIndex(initialUsuarios, 0);
      expect(result.length).toBe(1);
      expect(result[0].nombre).toBe('Luis');
    });

    it('lanza error si idx inválido', function () {
      expect(function () {
        window.UsuarioLogic.eliminarUsuarioByIndex(initialUsuarios, 10);
      }).toThrowError();
    });

    it('no cambia array original (caso borde)', function () {
      var copia = initialUsuarios.slice();
      var result = window.UsuarioLogic.eliminarUsuarioByIndex(initialUsuarios, 1);
      expect(initialUsuarios.length).toBe(copia.length);
      expect(result.length).toBe(copia.length - 1);
    });
  });

  /*--------------------------
    Tests para resetFormData
  ---------------------------*/
  describe('resetFormData', function () {
    it('devuelve objeto con campos vacíos', function () {
      var r = window.UsuarioLogic.resetFormData();
      expect(r.nombre).toBe('');
      expect(r.editingIndex).toBeNull();
    });

    it('si se muta la salida no afecta otras llamadas (inmutabilidad)', function () {
      var a = window.UsuarioLogic.resetFormData();
      a.nombre = 'Test';
      var b = window.UsuarioLogic.resetFormData();
      expect(b.nombre).toBe('');
    });

    it('estructura de salida contiene todas las claves esperadas', function () {
      var r = window.UsuarioLogic.resetFormData();
      expect(r).toEqual(jasmine.objectContaining({
        nombre: jasmine.any(String),
        apellidos: jasmine.any(String),
        correo: jasmine.any(String),
        region: jasmine.any(String),
        comuna: jasmine.any(String),
        edad: jasmine.any(String),
        editingIndex: null
      }));
    });
  });

  /*--------------------------
    Tests para persistencia (setLocalStorageUsuarios + readLocalStorageRaw)
  ---------------------------*/
  describe('setLocalStorageUsuarios / readLocalStorageRaw', function () {
    it('persiste y puede leerse el string', function () {
      window.UsuarioLogic.setLocalStorageUsuarios(initialUsuarios);
      var raw = window.UsuarioLogic.readLocalStorageRaw();
      expect(typeof raw).toBe('string');
      expect(raw).toContain('Ana');
    });

    it('cargarUsuariosFromLocalStorage lee lo persistido', function () {
      window.UsuarioLogic.setLocalStorageUsuarios(initialUsuarios);
      var cargados = window.UsuarioLogic.cargarUsuariosFromLocalStorage();
      expect(cargados.length).toBe(2);
      expect(cargados[1].nombre).toBe('Luis');
    });

    it('setLocalStorageUsuarios sobrescribe valor anterior (caso borde)', function () {
      window.UsuarioLogic.setLocalStorageUsuarios([]);
      expect(window.UsuarioLogic.cargarUsuariosFromLocalStorage().length).toBe(0);
      window.UsuarioLogic.setLocalStorageUsuarios(initialUsuarios);
      expect(window.UsuarioLogic.cargarUsuariosFromLocalStorage().length).toBe(2);
    });
  });
});
