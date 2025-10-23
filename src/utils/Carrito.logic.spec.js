// src/utils/Carrito.logic.spec.js
// Tests automáticos para CarritoLogic usando Jasmine.

describe("CarritoLogic", function() {
  // -------- obtenerUsuarioLogueado --------
  it("debe devolver un objeto si el usuario existe en localStorage", function() {
    localStorage.setItem("usuarioLogueado", JSON.stringify({ nombre: "Ana" }));
    const usuario = window.CarritoLogic.obtenerUsuarioLogueado();
    expect(usuario.nombre).toBe("Ana");
  });

  it("debe devolver null si no hay usuario guardado", function() {
    localStorage.removeItem("usuarioLogueado");
    const usuario = window.CarritoLogic.obtenerUsuarioLogueado();
    expect(usuario).toBeNull();
  });

  it("debe manejar errores JSON inválidos", function() {
    localStorage.setItem("usuarioLogueado", "{invalido}");
    const usuario = window.CarritoLogic.obtenerUsuarioLogueado();
    expect(usuario).toBeNull();
  });

  // -------- calcularTotal --------
  it("debe calcular el total correctamente", function() {
    const total = window.CarritoLogic.calcularTotal([
      { precio: 1000, cantidad: 2 },
      { precio: 500, cantidad: 1 }
    ]);
    expect(total).toBe(2500);
  });

  it("debe devolver 0 si el carrito no es un array", function() {
    const total = window.CarritoLogic.calcularTotal(null);
    expect(total).toBe(0);
  });

  it("debe ignorar productos con datos inválidos", function() {
    const total = window.CarritoLogic.calcularTotal([{ precio: "x" }]);
    expect(total).toBe(0);
  });

  // -------- obtenerDescuentoYMensaje --------
  it("debe devolver 50% de descuento y mensaje correcto", function() {
    const usuario = { beneficios: { descuento: 0.5 } };
    const result = window.CarritoLogic.obtenerDescuentoYMensaje(usuario);
    expect(result.descuento).toBe(0.5);
    expect(result.mensajeBeneficio).toContain("50%");
  });

  it("debe devolver 10% si el descuento es distinto a 0.5", function() {
    const usuario = { beneficios: { descuento: 0.1 } };
    const result = window.CarritoLogic.obtenerDescuentoYMensaje(usuario);
    expect(result.descuento).toBe(0.1);
    expect(result.mensajeBeneficio).toContain("FELICES50");
  });

  it("debe devolver 0 si no hay beneficios", function() {
    const result = window.CarritoLogic.obtenerDescuentoYMensaje({});
    expect(result.descuento).toBe(0);
  });

  // -------- calcularTotalConDescuento --------
  it("debe aplicar correctamente el descuento", function() {
    const result = window.CarritoLogic.calcularTotalConDescuento(1000, 0.5);
    expect(result).toBe(500);
  });

  it("debe devolver total sin cambio si no hay descuento", function() {
    const result = window.CarritoLogic.calcularTotalConDescuento(1000, 0);
    expect(result).toBe(1000);
  });

  it("debe devolver 0 si el total no es válido", function() {
    const result = window.CarritoLogic.calcularTotalConDescuento("x", 0.5);
    expect(result).toBe(0);
  });
});
