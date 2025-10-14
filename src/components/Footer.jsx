import cards from '../assets/cards.webp';

export default function Footer() {
  return (
    <footer>
        <div className="footer-left">
            <small>© {new Date().getFullYear()} Mil Sabores</small>
            <img src={cards} alt="Cards" style={{ height: "2.5rem", width: "auto" }} />
        </div>
    </footer>
  );
}