import React from 'react';
import './Header.css'; 

export default function Header() {
  return (
    <header className="header">
      <div className="logo-container">
        <img src="https://via.placeholder.com/50" alt="Logo" className="logo" />
      </div>
      
      <div className="search-container">
        <input type="text" placeholder="Buscar..." className="search-input" />
      </div>
      
      <div className="profile-container">
        <img src="https://via.placeholder.com/40" alt="Perfil" className="profile" />
      </div>
    </header>
  );
}

