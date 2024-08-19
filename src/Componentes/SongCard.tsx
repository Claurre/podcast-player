import React from 'react';
import './ArtistCard.css';  

export default function SongCard({ nombre, imagen, artist, album }) {
  return (
    <li className="song-card">
      <h2>{nombre}</h2>
      <img src={imagen} alt={nombre}/>
      <p>{artist}</p>
      <p>{album}</p>
    </li>
  );
}


