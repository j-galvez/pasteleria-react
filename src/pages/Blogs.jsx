import { NavLink } from "react-router-dom";
import egipto from "../assets/egipto.webp";
import cheesecake from "../assets/Cheesecake.webp";

export default function Blogs() {
    return(
         <main class="blogs-lista">
    <h1 class="titulo-blogs">Noticias Importantes</h1>

    <section class="blog-card">
      <div class="blog-texto">
        <h2>Los primeros registros de la repostería fueron en Egipto</h2>
        <p>
          La repostería tiene sus raíces en el Antiguo Egipto, donde se comenzaron a elaborar panes dulces y
          postres con miel, frutos secos y dátiles. Estas preparaciones eran ofrecidas en rituales y
          celebraciones, sentando las bases de lo que hoy conocemos como pastelería.
        </p>
        <NavLink to="/blog1" className="btn-leer">Leer más</NavLink>
      </div>
      <div class="blog-img">
        <img src={egipto} alt="Repostería en Egipto"/>
      </div>
    </section>

    <section class="blog-card">
      <div class="blog-texto">
        <h2>El cheesecake es el postre más popular del mundo</h2>
        <p>
          Según la mayoría de las búsquedas en internet, el cheesecake se posiciona como el postre favorito a
          nivel global. Su textura cremosa y su versatilidad en sabores lo convierten en un clásico que nunca
          pasa de moda en la repostería internacional.
        </p>
        <NavLink to="/blog2" className="btn-leer">Leer más</NavLink>
      </div>
      <div class="blog-img">
        <img src={cheesecake} alt="Cheesecake"/>
      </div>
    </section>
  </main>
    );
}