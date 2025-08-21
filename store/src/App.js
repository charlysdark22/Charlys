import React, { useState } from 'react';
import './App.css'; // Vamos a usar un archivo CSS para estilos limpios

function App() {
  const [language, setLanguage] = useState('ES');

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'ES' ? 'EN' : 'ES'));
  };

  return (
    <div className="App">
      {/* Header con menú */}
      <header className="header">
        <div className="logo">
          <h1>Stor</h1>
        </div>
        <nav className="nav-menu">
          <ul>
            <li className="nav-item">
              <a href="#inicio" className="nav-link">Inicio</a>
            </li>
            <li className="nav-item">
              <a href="#productos" className="nav-link">Productos</a>
            </li>
            <li className="nav-item">
              <a href="#sobre-nosotros" className="nav-link">Sobre Nosotros</a>
            </li>
            <li className="nav-item">
              <a href="#contacto" className="nav-link">Contacto</a>
            </li>
          </ul>
        </nav>
        <div className="auth-section">
          <button className="lang-btn" onClick={toggleLanguage}>
            {language === 'ES' ? 'EN' : 'ES'}
          </button>
          <a href="#login" className="auth-link">Login</a>
          <a href="#register" className="auth-link register">Registro</a>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="main-content">
        <h2>Bienvenido a Stor</h2>
        <p>Tu tienda en línea</p>
        <p>Tu mejor opción</p>
      </main>
    </div>
  );
}

export default App;