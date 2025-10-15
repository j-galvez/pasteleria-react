import { NavLink } from "react-router-dom";
import cheesecake from '../assets/Cheesecake.webp';
export default function Blog2() {
    return(

        <main className="blog-detalle">
    <h1 className="titulo-blog">El cheesecake es el postre más popular del mundo, según el internet</h1>
    <div className="blog-contenido">
      <img src={cheesecake} alt="Cheesecake clásico" className="blog-imagen" />
      <div className="blog-texto">
        <p>
          El cheesecake, o pastel de queso, es considerado por muchos como el postre más popular del mundo. 
          Su origen se remonta a la Antigua Grecia, donde ya se preparaban versiones sencillas de este pastel con queso fresco, miel y harina. 
          Sin embargo, su fama internacional se consolidó con las variantes modernas que se popularizaron en Estados Unidos, 
          en especial el icónico <em>New York Cheesecake</em>.
        </p>
        <p>
          Hoy en día existen infinitas versiones: desde el clásico horneado hasta los cheesecakes fríos, veganos o sin gluten. 
          Además, la versatilidad del cheesecake lo convierte en un postre que se adapta a todo tipo de ingredientes: 
          chocolate, frutas, galletas, caramelo, matcha, entre muchos otros.
        </p>
        <p>
          Internet ha sido clave para posicionarlo como el favorito global, con miles de recetas compartidas en redes sociales, 
          convirtiéndose en tendencia y en un infaltable de las celebraciones alrededor del mundo.
        </p>
      </div>
    </div>
    <NavLink to="/blogs" className="btn-volver">⬅ Volver a Blogs</NavLink>
  </main>
    );
}