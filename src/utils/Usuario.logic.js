// src/utils/Usuario.logic.js
// Lógica pura para el componente Usuario
// Todas las funciones expuestas en window.UsuarioLogic
// Evitar redeclaraciones globales: usamos window.UsuarioLogic

(function () {
  if (window.UsuarioLogic) return; // evita redeclaración

  window.UsuarioLogic = {
    /**
     * cargarUsuariosFromLocalStorage
     * Lee 'usuarios' desde localStorage (JSON) y devuelve un array.
     * Si no existe, devuelve [].
     * @returns {Array} usuarios
     */
    cargarUsuariosFromLocalStorage: function () {
      try {
        var raw = window.localStorage.getItem('usuarios');
        if (!raw) return [];
        var parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        // Si falla parseo, devolver array vacío
        return [];
      }
    },

    /**
     * agregarUsuario
     * Dado un array actual de usuarios y un objeto usuarioData,
     * devuelve el nuevo array con el usuario agregado (sin mutar).
     * Si usuarioData es inválido lanza Error.
     * @param {Array} usuarios
     * @param {Object} usuarioData {nombre, apellidos, correo, region, comuna, edad}
     * @returns {Array} nuevosUsuarios
     */
    agregarUsuario: function (usuarios, usuarioData) {
      if (!Array.isArray(usuarios)) throw new Error('usuarios debe ser un array');
      if (!usuarioData || typeof usuarioData !== 'object') throw new Error('usuarioData inválido');
      // validación simple
      if (!usuarioData.nombre || !usuarioData.apellidos || !usuarioData.correo) {
        throw new Error('Campos requeridos: nombre, apellidos, correo');
      }
      // asignar id incremental
      var nextId = usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1;
      var nuevo = {
        id: nextId,
        nombre: usuarioData.nombre,
        apellidos: usuarioData.apellidos,
        correo: usuarioData.correo,
        region: usuarioData.region || '',
        comuna: usuarioData.comuna || '',
        edad: usuarioData.edad || ''
      };
      // devolver nuevo array (inmutable)
      return usuarios.concat([nuevo]);
    },

    /**
     * getUsuarioForEditing
     * Dado array usuarios y un índice idx, devuelve una copia del usuario para
     * precargar en el formulario. Si idx inválido retorna null.
     * @param {Array} usuarios
     * @param {number} idx
     * @returns {Object|null}
     */
    getUsuarioForEditing: function (usuarios, idx) {
      if (!Array.isArray(usuarios)) return null;
      if (typeof idx !== 'number' || idx < 0 || idx >= usuarios.length) return null;
      // devolver copia para evitar mutaciones externas
      var found = usuarios[idx];
      return {
        nombre: found.nombre,
        apellidos: found.apellidos,
        correo: found.correo,
        region: found.region,
        comuna: found.comuna,
        edad: found.edad
      };
    },

    /**
     * actualizarUsuario
     * Dado array usuarios, índice editingIndex y datos actualizados,
     * devuelve un nuevo array con el usuario actualizado.
     * Si editingIndex inválido lanza Error.
     * @param {Array} usuarios
     * @param {number} editingIndex
     * @param {Object} updatedData
     * @returns {Array} nuevosUsuarios
     */
    actualizarUsuario: function (usuarios, editingIndex, updatedData) {
      if (!Array.isArray(usuarios)) throw new Error('usuarios debe ser un array');
      if (typeof editingIndex !== 'number' || editingIndex < 0 || editingIndex >= usuarios.length) {
        throw new Error('editingIndex inválido');
      }
      if (!updatedData || typeof updatedData !== 'object') throw new Error('updatedData inválido');

      var nuevos = usuarios.map(function (usuario, idx) {
        if (idx === editingIndex) {
          return {
            id: usuario.id,
            nombre: updatedData.nombre || usuario.nombre,
            apellidos: updatedData.apellidos || usuario.apellidos,
            correo: updatedData.correo || usuario.correo,
            region: updatedData.region || usuario.region,
            comuna: updatedData.comuna || usuario.comuna,
            edad: updatedData.edad || usuario.edad
          };
        }
        return usuario;
      });
      return nuevos;
    },

    /**
     * eliminarUsuarioByIndex
     * Dado array usuarios y un índice idx, devuelve nuevo array sin el elemento.
     * Si idx inválido lanza Error.
     * @param {Array} usuarios
     * @param {number} idx
     * @returns {Array} nuevosUsuarios
     */
    eliminarUsuarioByIndex: function (usuarios, idx) {
      if (!Array.isArray(usuarios)) throw new Error('usuarios debe ser un array');
      if (typeof idx !== 'number' || idx < 0 || idx >= usuarios.length) throw new Error('idx inválido');
      return usuarios.filter(function (_, index) { return index !== idx; });
    },

    /**
     * resetFormData
     * Devuelve un objeto con los valores por defecto para resetear el formulario.
     * @returns {Object}
     */
    resetFormData: function () {
      return {
        nombre: '',
        apellidos: '',
        correo: '',
        region: '',
        comuna: '',
        edad: '',
        editingIndex: null
      };
    },

    /**
     * Helpers para persistencia (opcional)
     * setLocalStorageUsuarios: persiste el array usuarios en localStorage
     * readLocalStorageRaw: lee y devuelve raw string (útil para tests)
     */
    setLocalStorageUsuarios: function (usuarios) {
      window.localStorage.setItem('usuarios', JSON.stringify(usuarios));
    },
    readLocalStorageRaw: function () {
      return window.localStorage.getItem('usuarios');
    }
  };
})();
