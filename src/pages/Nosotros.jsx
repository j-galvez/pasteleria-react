import brownie from '../assets/brownie.jpg'
export default function Nosotros() {
    return(
          <main className="nosotros">
        <h1>El dulce sueño hecho realidad</h1>
        <article className="entrada-nosotros">
        <p>
            Dicen que los sueños se construyen con esfuerzo, amor y perseverancia… y así nació nuestra pastelería.
            Todo comenzó con el anhelo de una madre que, entre recetas familiares y largas horas de dedicación, soñaba
            con tener su propio espacio donde compartir el sabor de la repostería con el mundo.
        </p>
        <p>
            Tras años de trabajo, sacrificio y pasión, ese sueño se convirtió en realidad: una pastelería que combina lo
            mejor de las <strong>tortas y postres tradicionales</strong> con propuestas modernas e internacionales que sorprenden
            a cada bocado.
        </p>
        <p>
            Uno de nuestros grandes orgullos es el <strong>brownie sin gluten</strong>: rico, denso y lleno de sabor. Creado especialmente
            para quienes necesitan evitar el gluten, pero no quieren renunciar al placer de un buen postre. Un verdadero
            ejemplo de que la repostería puede ser inclusiva y deliciosa al mismo tiempo.
        </p>
        <p>
            Nuestra misión es endulzar momentos especiales, acompañar celebraciones y llevar alegría en cada porción.
            Porque en cada torta y en cada postre, no solo hay ingredientes, sino también la historia de un sueño que se
            hizo realidad.
        </p>
        <figure>
            <img src={brownie} alt="Brownie sin gluten" className="img-blog" />
            <figcaption>Brownie sin gluten: nuestro favorito de la casa</figcaption>
        </figure>
    </article>

    </main>
    );
}