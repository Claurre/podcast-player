import { useRef } from "react";
import SongCard from "./AlbumCard.tsx";
import "./ListenAgain.css";


const Musicas = [
    { nombre:'Warrior of Ice', imagen:'https://upload.wikimedia.org/wikipedia/en/b/bb/Rhapsody_-_Legendary_Tales_Front_Cover.jpg', artist:'Rhapsody', album:'Legendary Tales'},
    { nombre: 'Rise of the Chaos Wizards', imagen: 'https://upload.wikimedia.org/wikipedia/en/0/06/Gloryhammer_-_Space_1992.jpg', artist: 'Gloryhammer', album:'Space 1992: Rise of the Chaos Wizards'},
    { nombre: 'Deep Silent Complete', imagen: 'https://upload.wikimedia.org/wikipedia/en/e/ef/Nightwish_Wishmaster.jpg', artist: 'Nightwish', album:'Wishmaster'},
    { nombre: 'Descent of the Archangel', imagen: 'https://upload.wikimedia.org/wikipedia/en/f/f3/Kamelot_epica.jpg', artist: 'Kamelot', album:'Epica'},
    { nombre: 'Into the Heart of Danger', imagen: 'https://upload.wikimedia.org/wikipedia/en/5/57/Battle_Beast_self_titled.jpg', artist: 'Battle Beast', album:'Battle Beast'},
    { nombre:'Gargoyles, Angels of Darkness', imagen:'https://upload.wikimedia.org/wikipedia/en/5/59/Rhapsody_power_of_the_dragonflame.jpg', artist:'Rhapsody', album:'Power of the dragonflame'},
    { nombre: 'Dark New World', imagen: 'https://upload.wikimedia.org/wikipedia/en/a/aa/Dark_Connection.jpg', artist: 'Beast in Black', album:'Dark Connection'},
]

export default function RecomendenAlbum() {
    const scrollRef = useRef(null);
  
    const scroll = (direction: string) => {
      if (scrollRef.current) {
        const scrollAmount = direction === 'left' ? -300 : 300;
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    };
  
    return (
      <div className="music-container">
        <h1>Albumes recomendados</h1>
        <div className="scroll-container">
          <button className="scroll-button left" onClick={() => scroll('left')}>👈</button>
          <ul className="songs-list" ref={scrollRef}>
            {Musicas.map((Musica) => (
              <SongCard
                key={Musica.album}
                imagen={Musica.imagen}
                artist={Musica.artist}
                album={Musica.album}
              />
            ))}
          </ul>
          <button className="scroll-button right" onClick={() => scroll('right')}>👉</button>
        </div>
      </div>
    );
  }