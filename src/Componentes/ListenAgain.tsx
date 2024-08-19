import React from "react";
import { useRef } from "react";
import SongCard from "./SongCard.tsx";
import "./ListenAgain.css";


const Musicas = [
    { nombre:'In Tenebris', imagen:'https://upload.wikimedia.org/wikipedia/en/5/59/Rhapsody_power_of_the_dragonflame.jpg', artist:'Rhapsody', album:'Power of the dragonflame'},
    { nombre:'Warrior of Ice', imagen:'https://upload.wikimedia.org/wikipedia/en/b/bb/Rhapsody_-_Legendary_Tales_Front_Cover.jpg', artist:'Rhapsody', album:'Legendary Tales'},
    { nombre: 'Rise of the Chaos Wizards', imagen: 'https://upload.wikimedia.org/wikipedia/en/0/06/Gloryhammer_-_Space_1992.jpg', artist: 'Gloryhammer', album:'Space 1992: Rise of the Chaos Wizards'},
    { nombre:'Land of Immortals', imagen:'https://upload.wikimedia.org/wikipedia/en/b/bb/Rhapsody_-_Legendary_Tales_Front_Cover.jpg', artist:'Rhapsody', album:'Legendary Tales'},
    { nombre: 'Deep Silent Complete', imagen: 'https://upload.wikimedia.org/wikipedia/en/e/ef/Nightwish_Wishmaster.jpg', artist: 'Nightwish', album:'Wishmaster'},
    { nombre:'Power of the Dragonflame', imagen:'https://upload.wikimedia.org/wikipedia/en/5/59/Rhapsody_power_of_the_dragonflame.jpg', artist:'Rhapsody', album:'Power of the dragonflame'},
    { nombre:'Lord of the Thunder', imagen:'https://upload.wikimedia.org/wikipedia/en/b/bb/Rhapsody_-_Legendary_Tales_Front_Cover.jpg', artist:'Rhapsody', album:'Legendary Tales'},
    { nombre: 'Descent of the Archangel', imagen: 'https://upload.wikimedia.org/wikipedia/en/f/f3/Kamelot_epica.jpg', artist: 'Kamelot', album:'Epica'},
    { nombre:'Agony Is My Name', imagen:'https://upload.wikimedia.org/wikipedia/en/5/59/Rhapsody_power_of_the_dragonflame.jpg', artist:'Rhapsody', album:'Power of the dragonflame'},
    { nombre: 'Into the Heart of Danger', imagen: 'https://upload.wikimedia.org/wikipedia/en/5/57/Battle_Beast_self_titled.jpg', artist: 'Battle Beast', album:'Battle Beast'},
    { nombre:'Gargoyles, Angels of Darkness', imagen:'https://upload.wikimedia.org/wikipedia/en/5/59/Rhapsody_power_of_the_dragonflame.jpg', artist:'Rhapsody', album:'Power of the dragonflame'},
    { nombre: 'Dark New World', imagen: 'https://upload.wikimedia.org/wikipedia/en/a/aa/Dark_Connection.jpg', artist: 'Beast in Black', album:'Dark Connection'},
    { nombre:'Legendary Tales', imagen:'https://upload.wikimedia.org/wikipedia/en/b/bb/Rhapsody_-_Legendary_Tales_Front_Cover.jpg', artist:'Rhapsody', album:'Legendary Tales'},
]

export default function ListenAgain() {
    const scrollRef = useRef(null);
  
    const scroll = (direction: string) => {
      if (scrollRef.current) {
        const scrollAmount = direction === 'left' ? -300 : 300;
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    };
  
    return (
      <div className="music-container">
        <div className="scrolling-buttons-container">
            <button className="scroll-button left" onClick={() => scroll('left')}>👈</button>
            <button className="scroll-button right" onClick={() => scroll('right')}>👉</button>
        </div>
        <h2>Escucha de nuevo</h2>
        <div className="scroll-container">
          <button className="scroll-button left" onClick={() => scroll('left')}>👈</button>
          <ul className="songs-list" ref={scrollRef}>
            {Musicas.map((Musica) => (
              <SongCard
                key={Musica.nombre}
                nombre={Musica.nombre}
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
  