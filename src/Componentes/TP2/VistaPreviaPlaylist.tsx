import React from 'react';
import './VistaPreviaPlaylist.css';


interface VistaPreviaPlaylistProps {
  nuevaPlaylist: { titulo: string; descripcion: string; imagen: string };
}

const VistaPreviaPlaylist: React.FC<VistaPreviaPlaylistProps> = ({ nuevaPlaylist }) => {
  return (
    <div className="vista-previa">
      <h2>Vista Previa</h2>
      {nuevaPlaylist.imagen && <img src={nuevaPlaylist.imagen} alt={nuevaPlaylist.titulo} className="imagen" />}
      <h3>{nuevaPlaylist.titulo}</h3>
      <p>{nuevaPlaylist.descripcion}</p>
    </div>
  );
};

export default VistaPreviaPlaylist;

