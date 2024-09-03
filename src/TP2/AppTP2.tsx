import React, { useState } from 'react';
import Sidebar from './Sidebar';
import FormularioPlaylist from './FormularioPlaylist';
import VistaPreviaPlaylist from './VistaPreviaPlaylist';
import './AppTP2.css';


interface Playlist {
  titulo: string;
  descripcion: string;
  imagen: string;
}

const AppTP2: React.FC = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [nuevaPlaylist, setNuevaPlaylist] = useState<Playlist>({
    titulo: '',
    descripcion: '',
    imagen: '',
  });

  const [mostrarFormulario, setMostrarFormulario] = useState<boolean>(false); 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNuevaPlaylist({ ...nuevaPlaylist, [name]: value });
  };

  const handleAgregarPlaylist = () => {
    setPlaylists([...playlists, nuevaPlaylist]);
    setNuevaPlaylist({ titulo: '', descripcion: '', imagen: '' });
    setMostrarFormulario(false); 
  };

  const handleToggleFormulario = () => {
    setMostrarFormulario(!mostrarFormulario); 
  };

  return (
    <div className="app-tp2">
      <Sidebar playlists={playlists} onToggleFormulario={handleToggleFormulario} />
      <div className="content">
        {mostrarFormulario && (
          <>
            <FormularioPlaylist
              nuevaPlaylist={nuevaPlaylist}
              onInputChange={handleInputChange}
              onAgregarPlaylist={handleAgregarPlaylist}
            />
            <VistaPreviaPlaylist nuevaPlaylist={nuevaPlaylist} />
          </>
        )}
      </div>
    </div>
  );
};

export default AppTP2;
