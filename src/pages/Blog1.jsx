import { NavLink } from "react-router-dom";
import egipto from '../assets/egipto.webp';
export default function Blog1() {
    return(

        <main className="blog-detalle">
    <h1 className="titulo-blog">Los primeros registros de la repostería fueron en Egipto</h1>
    <div className="blog-contenido">
      <img src={egipto} alt="Repostería en Egipto" className="blog-imagen" />
      <div className="blog-texto">
        <p>
          La historia de la repostería comienza en el Antiguo Egipto, donde ya se elaboraban los primeros panes dulces y postres a base de miel,
          dátiles, frutos secos y cereales. Estas recetas no solo eran parte de la vida cotidiana, sino que también tenían un fuerte carácter
          ceremonial, pues eran ofrecidas a los dioses y compartidas en celebraciones importantes.
        </p>
        <p>
          Con el tiempo, estas tradiciones se expandieron a través de Grecia y Roma, quienes adoptaron y perfeccionaron muchas de estas técnicas.
          Ingredientes como la miel, las nueces y la leche comenzaron a formar parte de un sinfín de preparaciones que hoy podemos reconocer como
          el origen de la pastelería moderna.
        </p>
        <p>
          Gracias a este legado, hoy disfrutamos de una repostería diversa y rica en sabores, que mezcla tradición e innovación, conservando
          siempre esa esencia de compartir dulzura en momentos especiales.
        </p>
      </div>
    </div>
    <NavLink to="/blogs" className="btn-volver">⬅ Volver a Blogs</NavLink>
  </main>
    );
}