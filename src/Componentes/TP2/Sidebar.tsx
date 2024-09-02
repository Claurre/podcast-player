import React from 'react';
import './Sidebar.css';


interface SidebarProps {
  playlists: { titulo: string; descripcion: string; imagen: string }[];
  onToggleFormulario: () => void; 
}

const Sidebar: React.FC<SidebarProps> = ({ playlists, onToggleFormulario }) => {
  return (
    <div className="sidebar">
      <h2>Sidebar</h2>
      <button onClick={onToggleFormulario} className="crear-playlist-btn">
        Crear Playlist
      </button>
      <ul>
        {playlists.map((playlist, index) => (
          <li key={index} className="playlist-item">
            <img src={playlist.imagen} alt={playlist.titulo} className="playlist-imagen" />
            <div>
              <h3>{playlist.titulo}</h3>
              <p>{playlist.descripcion}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

