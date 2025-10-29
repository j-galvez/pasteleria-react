import './App.css';
import { BrowserRouter, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import NavbarAdmin from './components/NavbarAdmin';
import Footer from './components/Footer';
import { Routes } from 'react-router-dom';
import Index from './pages/Index';
import Blogs from './pages/Blogs';
import Blog1 from './pages/Blog1';
import Blog2 from './pages/Blog2';
import Contacto from './pages/Contacto';
import Tortas from './pages/Tortas';
import Postres from './pages/Postres';
import Carrito from './pages/Carrito';
import Nosotros from './pages/Nosotros';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Pago from './pages/Pago';
import Producto from './pages/admin/Producto';
import Usuario from './pages/admin/Usuario';
import Admin from './pages/admin/Admin';

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/administrador');

  return (
    <>
      {isAdmin ? <NavbarAdmin /> : <Navbar />}
      <Routes>
        {/* Admin Routes */}
        <Route path="/administrador" element={<Admin/>} />
        <Route path="/administrador/producto" element={<Producto />} />
        <Route path="/administrador/usuario" element={<Usuario />} />

        {/* Public Routes */}
        <Route path="/" element={<Index/>} />
        <Route path="/index" element={<Index />} />
        <Route path="/tortas" element={<Tortas/>}/>
        <Route path="/postres" element={<Postres />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/pago" element={<Pago />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog1" element={<Blog1 />} />
        <Route path="/blog2" element={<Blog2 />} />
        <Route path="/contacto" element={<Contacto />} />
        
        <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
