// src/utils/Blog1.logic.spec.js
// ------------------------------------------------------
// Tests automáticos para Blog1Logic usando Jasmine.
// ------------------------------------------------------

describe("Blog1Logic", function() {
  // -------- obtenerContenidoBlog --------
  it("debe devolver un objeto con los campos principales", function() {
    const blog = window.Blog1Logic.obtenerContenidoBlog();
    expect(blog.titulo).toContain("repostería");
    expect(Array.isArray(blog.parrafos)).toBeTrue();
    expect(blog.imagen).toBe("egipto.webp");
  });

  it("debe contener al menos 3 párrafos", function() {
    const blog = window.Blog1Logic.obtenerContenidoBlog();
    expect(blog.parrafos.length).toBeGreaterThanOrEqual(3);
  });

  it("debe tener una ruta de retorno válida", function() {
    const blog = window.Blog1Logic.obtenerContenidoBlog();
    expect(blog.rutaVolver).toBe("/blogs");
  });

  // -------- contarParrafos --------
  it("debe contar correctamente los párrafos", function() {
    const blog = window.Blog1Logic.obtenerContenidoBlog();
    const count = window.Blog1Logic.contarParrafos(blog);
    expect(count).toBe(3);
  });

  it("debe devolver 0 si el objeto está vacío", function() {
    const count = window.Blog1Logic.contarParrafos({});
    expect(count).toBe(0);
  });

  it("debe devolver 0 si el parámetro es nulo", function() {
    const count = window.Blog1Logic.contarParrafos(null);
    expect(count).toBe(0);
  });

  // -------- validarContenido --------
  it("debe devolver true si el contenido es válido", function() {
    const blog = window.Blog1Logic.obtenerContenidoBlog();
    const valido = window.Blog1Logic.validarContenido(blog);
    expect(valido).toBeTrue();
  });

  it("debe devolver false si falta algún campo obligatorio", function() {
    const invalido = { titulo: "Blog sin imagen" };
    const valido = window.Blog1Logic.validarContenido(invalido);
    expect(valido).toBeFalse();
  });

  it("debe devolver false si el parámetro es nulo", function() {
    const valido = window.Blog1Logic.validarContenido(null);
    expect(valido).toBeFalse();
  });
});
