import React from 'react';
import './FormularioPlaylist.css';


interface FormularioPlaylistProps {
  nuevaPlaylist: { titulo: string; descripcion: string; imagen: string };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAgregarPlaylist: () => void;
}

const FormularioPlaylist: React.FC<FormularioPlaylistProps> = ({
  nuevaPlaylist,
  onInputChange,
  onAgregarPlaylist,
}) => {
  const esFormularioValido = nuevaPlaylist.titulo && nuevaPlaylist.descripcion && nuevaPlaylist.imagen;

  return (
    <form className="formulario-playlist">
      <input
        type="text"
        name="titulo"
        placeholder="Título de la playlist"
        value={nuevaPlaylist.titulo}
        onChange={onInputChange}
      />
      <input
        type="text"
        name="descripcion"
        placeholder="Descripción de la playlist"
        value={nuevaPlaylist.descripcion}
        onChange={onInputChange}
      />
      <input
        type="text"
        name="imagen"
        placeholder="URL de la imagen"
        value={nuevaPlaylist.imagen}
        onChange={onInputChange}
      />
      <button type="button" onClick={onAgregarPlaylist} disabled={!esFormularioValido}>
        Añadir Playlist
      </button>
    </form>
  );
};

export default FormularioPlaylist;

