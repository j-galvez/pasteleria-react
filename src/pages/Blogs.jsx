import { NavLink } from "react-router-dom";
import "../utils/Blogs.logic.js"; // <-- Importa la lógica antes de usarla

export default function Blogs() {
  // 🔹 Obtenemos la lista de blogs desde la lógica externa
  const blogs = window.BlogsLogic.obtenerListaDeBlogs();

  return (
    <main className="blogs-lista">
      <h1 className="titulo-blogs">Noticias Importantes</h1>

      {/* 🔹 Render dinámico de los blogs */}
      {blogs.map((blog) => (
        <section key={blog.ruta} className="blog-card">
          <div className="blog-texto">
            <h2>{blog.titulo}</h2>
            <p>{blog.descripcion}</p>
            <NavLink to={blog.ruta} className="btn-leer">
              Leer más
            </NavLink>
          </div>
          <div className="blog-img">
            {/* Carga dinámica de las imágenes desde /assets */}
            <img
              src={require(`../assets/${blog.imagen}`)}
              alt={blog.alt}
            />
          </div>
        </section>
      ))}
    </main>
  );
}
