// src/utils/Login.logic.js
// Lógica pura para el componente Login.
// Todas las funciones se agrupan en window.LoginLogic
// para poder ser testeadas y reutilizadas sin dependencias de React.

(function () {
  if (!window) return;

  // ✅ Función: validateCorreoFormat
  // Verifica si un correo electrónico tiene un formato válido.
  function validateCorreoFormat(correo) {
    if (typeof correo !== "string") return false;
    return correo.includes("@") && correo.includes(".");
  }

  // ✅ Función: findUser
  // Busca un usuario en una lista que coincida con correo y contraseña.
  function findUser(usuarios, correo, password) {
    if (!Array.isArray(usuarios)) return null;
    return usuarios.find(
      (u) => u && u.correo === correo && u.password === password
    ) || null;
  }

  // ✅ Función: handleSubmit
  // Contiene la lógica principal del login sin dependencias de React.
  // Recibe evento, correo, password y dependencias inyectadas (mockeables en test).
  function handleSubmit(event, correo, password, deps) {
    if (event && typeof event.preventDefault === "function")
      event.preventDefault();

    deps = deps || {};
    const obtenerUsuarios =
      deps.obtenerUsuarios ||
      function () {
        try {
          return JSON.parse(localStorage.getItem("usuarios")) || [];
        } catch {
          return [];
        }
      };

    const guardarUsuarioLogueado =
      deps.guardarUsuarioLogueado ||
      function (usuario) {
        localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));
      };

    const setSuccess = deps.setSuccess || function () {};
    const setError = deps.setError || function () {};
    const navigate = deps.navigate || function () {};
    const timeoutFn = deps.timeoutFn || function (fn, ms) { setTimeout(fn, ms); };

    // Validación básica
    if (!validateCorreoFormat(correo) || typeof password !== "string" || password.length < 4) {
      setError(true);
      setSuccess(false);
      return { ok: false, reason: "invalid_input" };
    }

    const usuarios = obtenerUsuarios();
    const usuario = findUser(usuarios, correo, password);

    if (usuario) {
      guardarUsuarioLogueado(usuario);
      setSuccess(true);
      setError(false);
      timeoutFn(() => navigate("/"), 1500);
      return { ok: true, usuario };
    } else {
      setError(true);
      setSuccess(false);
      return { ok: false, reason: "not_found" };
    }
  }

  // 🔒 Registro seguro en el espacio global
  if (!window.LoginLogic) window.LoginLogic = {};
  window.LoginLogic.validateCorreoFormat = validateCorreoFormat;
  window.LoginLogic.findUser = findUser;
  window.LoginLogic.handleSubmit = handleSubmit;
})();
