// src/utils/Blogs.logic.js
// ------------------------------------------------------
// Lógica pura del componente Blogs
// No depende de React ni del DOM, solo contiene funciones reutilizables.
// ------------------------------------------------------

window.BlogsLogic = {
  /**
   * Obtiene la lista de blogs que se muestran en la página.
   * @returns {Array} Lista de objetos {titulo, descripcion, ruta, imagen, alt}
   */
  obtenerListaDeBlogs: function() {
    return [
      {
        titulo: "Los primeros registros de la repostería fueron en Egipto",
        descripcion:
          "La repostería tiene sus raíces en el Antiguo Egipto, donde se elaboraban panes dulces y postres con miel, frutos secos y dátiles.",
        ruta: "/blog1",
        imagen: "egipto.webp",
        alt: "Repostería en Egipto"
      },
      {
        titulo: "El cheesecake es el postre más popular del mundo",
        descripcion:
          "Según la mayoría de las búsquedas en internet, el cheesecake se posiciona como el postre favorito a nivel global.",
        ruta: "/blog2",
        imagen: "Cheesecake.webp",
        alt: "Cheesecake"
      }
    ];
  },

  /**
   * Devuelve los datos de un blog específico por su ruta.
   * @param {string} ruta - Ruta del blog (por ejemplo '/blog1').
   * @returns {Object|null} Blog encontrado o null si no existe.
   */
  obtenerBlogPorRuta: function(ruta) {
    if (!ruta || typeof ruta !== "string") return null;
    const lista = window.BlogsLogic.obtenerListaDeBlogs();
    return lista.find((b) => b.ruta === ruta) || null;
  },

  /**
   * Valida si una ruta corresponde a un blog existente.
   * @param {string} ruta - Ruta a validar.
   * @returns {boolean} true si la ruta existe, false si no.
   */
  esRutaValida: function(ruta) {
    if (!ruta || typeof ruta !== "string") return false;
    const blog = window.BlogsLogic.obtenerBlogPorRuta(ruta);
    return blog !== null;
  }
};
