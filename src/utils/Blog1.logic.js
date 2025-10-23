// src/utils/Blog1.logic.js
// ------------------------------------------------------
// Lógica pura del componente Blog1
// No depende de React ni del DOM. Contiene funciones reutilizables.
// ------------------------------------------------------

window.Blog1Logic = {
  /**
   * Obtiene la información completa del blog "Los primeros registros de la repostería fueron en Egipto".
   * @returns {Object} Datos del blog (título, contenido, imagen, alt, rutaVolver)
   */
  obtenerContenidoBlog: function() {
    return {
      titulo: "Los primeros registros de la repostería fueron en Egipto",
      parrafos: [
        "La historia de la repostería comienza en el Antiguo Egipto, donde ya se elaboraban los primeros panes dulces y postres a base de miel, dátiles, frutos secos y cereales. Estas recetas no solo eran parte de la vida cotidiana, sino que también tenían un fuerte carácter ceremonial, pues eran ofrecidas a los dioses y compartidas en celebraciones importantes.",
        "Con el tiempo, estas tradiciones se expandieron a través de Grecia y Roma, quienes adoptaron y perfeccionaron muchas de estas técnicas. Ingredientes como la miel, las nueces y la leche comenzaron a formar parte de un sinfín de preparaciones que hoy podemos reconocer como el origen de la pastelería moderna.",
        "Gracias a este legado, hoy disfrutamos de una repostería diversa y rica en sabores, que mezcla tradición e innovación, conservando siempre esa esencia de compartir dulzura en momentos especiales."
      ],
      imagen: "egipto.webp",
      alt: "Repostería en Egipto",
      rutaVolver: "/blogs"
    };
  },

  /**
   * Devuelve el número de párrafos en el contenido del blog.
   * @param {Object} blogData - Objeto con los datos del blog.
   * @returns {number} Cantidad de párrafos.
   */
  contarParrafos: function(blogData) {
    if (!blogData || !Array.isArray(blogData.parrafos)) return 0;
    return blogData.parrafos.length;
  },

  /**
   * Valida que los datos del blog estén completos.
   * @param {Object} blogData - Datos del blog.
   * @returns {boolean} true si todos los campos requeridos existen.
   */
  validarContenido: function(blogData) {
    if (!blogData) return false;
    const { titulo, parrafos, imagen, alt, rutaVolver } = blogData;
    return (
      typeof titulo === "string" &&
      Array.isArray(parrafos) &&
      parrafos.length > 0 &&
      typeof imagen === "string" &&
      typeof alt === "string" &&
      typeof rutaVolver === "string"
    );
  }
};
