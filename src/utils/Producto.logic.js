
(function () {
  if (!window) return;

  /**
   * Agrega un nuevo producto al array de productos existentes.
   * Si la imagen está vacía, asigna un placeholder.
   * Retorna el nuevo arreglo actualizado.
   */
  function agregarProducto(productos, formData) {
    if (!Array.isArray(productos)) productos = [];
    if (!formData) return productos;

    const imagenValue = formData.imagen ? formData.imagen : "/img/placeholder.png";
    const nuevoProducto = {
      ...formData,
      precio: Number(formData.precio) || 0,
      imagen: imagenValue,
    };

    return [...productos, nuevoProducto];
  }

  /**
   * Edita un producto existente en la posición `index`.
   * Devuelve un nuevo array con el producto actualizado.
   */
  function editarProducto(productos, formData, index) {
    if (!Array.isArray(productos) || index == null) return productos;
    return productos.map((prod, idx) =>
      idx === index ? { ...formData, precio: Number(formData.precio) || 0 } : prod
    );
  }

  /**
   * Elimina el producto indicado por el índice.
   * Devuelve el array filtrado.
   */
  function eliminarProducto(productos, index) {
    if (!Array.isArray(productos)) return [];
    if (index == null || index < 0 || index >= productos.length) return productos;
    return productos.filter((_, idx) => idx !== index);
  }

  /**
   * Actualiza el estado del formulario al cambiar un input.
   * Recibe formData actual y evento simulado { name, value }.
   */
  function actualizarFormData(formData, name, value) {
    return { ...formData, [name]: value };
  }

  /**
   * Reinicia el formulario a su estado inicial.
   */
  function limpiarForm() {
    return { categoria: "", nombre: "", precio: "", imagen: "" };
  }

  // Exponer funciones en window
  window.ProductoLogic = window.ProductoLogic || {};
  window.ProductoLogic.agregarProducto = agregarProducto;
  window.ProductoLogic.editarProducto = editarProducto;
  window.ProductoLogic.eliminarProducto = eliminarProducto;
  window.ProductoLogic.actualizarFormData = actualizarFormData;
  window.ProductoLogic.limpiarForm = limpiarForm;
})();
