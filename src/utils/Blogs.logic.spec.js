// src/utils/Blogs.logic.spec.js
// ------------------------------------------------------
// Tests automáticos para BlogsLogic usando Jasmine.
// ------------------------------------------------------

describe("BlogsLogic", function() {
  // -------- obtenerListaDeBlogs --------
  it("debe devolver un arreglo con al menos 2 blogs", function() {
    const lista = window.BlogsLogic.obtenerListaDeBlogs();
    expect(Array.isArray(lista)).toBeTrue();
    expect(lista.length).toBeGreaterThanOrEqual(2);
  });

  it("debe contener un blog con ruta /blog1", function() {
    const lista = window.BlogsLogic.obtenerListaDeBlogs();
    const blog = lista.find((b) => b.ruta === "/blog1");
    expect(blog).toBeDefined();
    expect(blog.titulo).toContain("Egipto");
  });

  it("debe contener un blog con ruta /blog2", function() {
    const lista = window.BlogsLogic.obtenerListaDeBlogs();
    const blog = lista.find((b) => b.ruta === "/blog2");
    expect(blog).toBeDefined();
    expect(blog.titulo).toContain("cheesecake");
  });

  // -------- obtenerBlogPorRuta --------
  it("debe devolver el blog correcto al pasar /blog1", function() {
    const blog = window.BlogsLogic.obtenerBlogPorRuta("/blog1");
    expect(blog.titulo).toContain("Egipto");
  });

  it("debe devolver null si la ruta no existe", function() {
    const blog = window.BlogsLogic.obtenerBlogPorRuta("/blogX");
    expect(blog).toBeNull();
  });

  it("debe devolver null si el parámetro es inválido", function() {
    const blog = window.BlogsLogic.obtenerBlogPorRuta(123);
    expect(blog).toBeNull();
  });

  // -------- esRutaValida --------
  it("debe devolver true si la ruta existe (/blog2)", function() {
    const result = window.BlogsLogic.esRutaValida("/blog2");
    expect(result).toBeTrue();
  });

  it("debe devolver false si la ruta no existe", function() {
    const result = window.BlogsLogic.esRutaValida("/inexistente");
    expect(result).toBeFalse();
  });

  it("debe devolver false si el parámetro es null o vacío", function() {
    const result = window.BlogsLogic.esRutaValida("");
    expect(result).toBeFalse();
  });
});
