// src/utils/Login.logic.spec.js
// Pruebas unitarias Jasmine para Login.logic.js
// Asegúrate de importar Login.logic.js antes de este archivo en karma.conf.js

describe("LoginLogic", function () {
  beforeAll(function () {
    expect(window.LoginLogic).toBeDefined();
  });

  // 🧩 Pruebas para validateCorreoFormat
  describe("validateCorreoFormat", function () {
    it("✅ reconoce un correo válido (entrada válida)", function () {
      expect(window.LoginLogic.validateCorreoFormat("user@test.com")).toBeTrue();
    });

    it("❌ devuelve false si no es string (entrada incorrecta)", function () {
      expect(window.LoginLogic.validateCorreoFormat(null)).toBeFalse();
    });

    it("⚠️ devuelve false si no contiene @ o . (caso borde)", function () {
      expect(window.LoginLogic.validateCorreoFormat("usuario")).toBeFalse();
    });
  });

  // 🧩 Pruebas para findUser
  describe("findUser", function () {
    const usuarios = [
      { correo: "juan@test.com", password: "1234" },
      { correo: "ana@test.com", password: "abcd" },
    ];

    it("✅ encuentra usuario válido (entrada válida)", function () {
      const result = window.LoginLogic.findUser(usuarios, "juan@test.com", "1234");
      expect(result).not.toBeNull();
      expect(result.correo).toBe("juan@test.com");
    });

    it("❌ devuelve null si lista inválida (entrada incorrecta)", function () {
      const result = window.LoginLogic.findUser(null, "x@test.com", "1234");
      expect(result).toBeNull();
    });

    it("⚠️ devuelve null si usuario no existe (caso borde)", function () {
      const result = window.LoginLogic.findUser(usuarios, "no@test.com", "0000");
      expect(result).toBeNull();
    });
  });

  // 🧩 Pruebas para handleSubmit
  describe("handleSubmit", function () {
    it("✅ login exitoso devuelve ok:true y llama navigate (entrada válida)", function (done) {
      const usuarios = [{ correo: "user@test.com", password: "1234" }];
      const deps = {
        obtenerUsuarios: () => usuarios,
        guardarUsuarioLogueado: () => {},
        setSuccess: (v) => expect(v).toBeTrue(),
        setError: (v) => expect(v).toBeFalse(),
        navigate: (ruta) => {
          expect(ruta).toBe("/");
          done();
        },
        timeoutFn: (fn) => fn(),
      };
      const res = window.LoginLogic.handleSubmit(
        { preventDefault: () => {} },
        "user@test.com",
        "1234",
        deps
      );
      expect(res.ok).toBeTrue();
    });

    it("❌ datos inválidos devuelve invalid_input (entrada incorrecta)", function () {
      const deps = { setError: (v) => expect(v).toBeTrue(), setSuccess: () => {} };
      const res = window.LoginLogic.handleSubmit(null, "correo", "1", deps);
      expect(res.ok).toBeFalse();
      expect(res.reason).toBe("invalid_input");
    });

    it("⚠️ usuario no encontrado devuelve not_found (caso borde)", function () {
      const deps = {
        obtenerUsuarios: () => [],
        setError: (v) => expect(v).toBeTrue(),
        setSuccess: (v) => expect(v).toBeFalse(),
      };
      const res = window.LoginLogic.handleSubmit(null, "no@test.com", "1234", deps);
      expect(res.ok).toBeFalse();
      expect(res.reason).toBe("not_found");
    });
  });
});
