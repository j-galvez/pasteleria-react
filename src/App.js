import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Routes } from 'react-router-dom';
import Index from './pages/Index';
import Blogs from './pages/Blogs';
import Blog1 from './pages/Blog1';
import Blog2 from './pages/Blog2';
import Contacto from './pages/Contacto';

// import Productos from './pages/Productos';
// import Tortas from './pages/Tortas';
// import Postres from './pages/Postres';
// import Carrito from './pages/Carrito';
import Nosotros from './pages/Nosotros';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/index" element={<Index/>} />
        {/*
        <Route path="/" element={<Home title="Mil Sabores" />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/tortas" element={<Tortas />} />
        <Route path="/postres" element={<Postres />} />
        <Route path="/carrito" element={<Carrito />} />
        */}

        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog1" element={<Blog1 />} />
        <Route path="/blog2" element={<Blog2 />} />
        <Route path="/contacto" element={<Contacto />} />
        
        <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
