import React from 'react';
import '../styles/navbarFooter.css'; // Asegúrate de importar tu archivo CSS
import cards from "../assets/cards.webp"

function Footer() {
  return (

    <footer className="footer-custom mt-auto py-4 px-4">
      <div className="container-fluid">
        <div className="d-flex flex-column flex-md-row justify-content-start align-items-start">
          
          <div className="footer-left">
            <h2 className="mb-3">Mil Sabores</h2> 
            <div className="logos">

              <img 
                src={cards}
                alt="cards" 
                className="img-fluid custom-logo-width me-2" 
              />
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;