import SongCard from './SongCard.tsx'
import './ArtistCard.css'; 
import { useRef } from 'react';

const Musicas = [
    { nombre:'In Tenebris', imagen:'https://upload.wikimedia.org/wikipedia/en/5/59/Rhapsody_power_of_the_dragonflame.jpg', artist:'Rhapsody', album:'Power of the dragonflame'},
    { nombre:'Warrior of Ice', imagen:'https://upload.wikimedia.org/wikipedia/en/b/bb/Rhapsody_-_Legendary_Tales_Front_Cover.jpg', artist:'Rhapsody', album:'Legendary Tales'},
    { nombre:'Land of Immortals', imagen:'https://upload.wikimedia.org/wikipedia/en/b/bb/Rhapsody_-_Legendary_Tales_Front_Cover.jpg', artist:'Rhapsody', album:'Legendary Tales'},
    { nombre:'Power of the Dragonflame', imagen:'https://upload.wikimedia.org/wikipedia/en/5/59/Rhapsody_power_of_the_dragonflame.jpg', artist:'Rhapsody', album:'Power of the dragonflame'},
    { nombre:'Lord of the Thunder', imagen:'https://upload.wikimedia.org/wikipedia/en/b/bb/Rhapsody_-_Legendary_Tales_Front_Cover.jpg', artist:'Rhapsody', album:'Legendary Tales'},
    { nombre:'Agony Is My Name', imagen:'https://upload.wikimedia.org/wikipedia/en/5/59/Rhapsody_power_of_the_dragonflame.jpg', artist:'Rhapsody', album:'Power of the dragonflame'},
    { nombre:'Gargoyles, Angels of Darkness', imagen:'https://upload.wikimedia.org/wikipedia/en/5/59/Rhapsody_power_of_the_dragonflame.jpg', artist:'Rhapsody', album:'Power of the dragonflame'},
    { nombre:'Legendary Tales', imagen:'https://upload.wikimedia.org/wikipedia/en/b/bb/Rhapsody_-_Legendary_Tales_Front_Cover.jpg', artist:'Rhapsody', album:'Legendary Tales'},
]


  
export default function ArtistCard() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="artist-card-container">
      <h1>Rhapsody</h1>
      <div className="scroll-container">
        <button className="scroll-button left" onClick={() => scroll('left')}>⟵</button>
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
        <button className="scroll-button right" onClick={() => scroll('right')}>⟶</button>
      </div>
    </div>
  );
}