import { NavLink } from "react-router-dom";
import "../utils/Blog1.logic.js";

export default function Blog1() {
  // 🔹 Obtenemos los datos del blog desde la lógica externa
  const blog = window.Blog1Logic.obtenerContenidoBlog();

  return (
    <main className="blog-detalle">
      <h1 className="titulo-blog">{blog.titulo}</h1>

      <div className="blog-contenido">
        <img
          src={require(`../assets/${blog.imagen}`)}
          alt={blog.alt}
          className="blog-imagen"
        />
        <div className="blog-texto">
          {blog.parrafos.map((texto, index) => (
            <p key={index}>{texto}</p>
          ))}
        </div>
      </div>

      <NavLink to={blog.rutaVolver} className="btn-volver">
        ⬅ Volver a Blogs
      </NavLink>
    </main>
  );
}
