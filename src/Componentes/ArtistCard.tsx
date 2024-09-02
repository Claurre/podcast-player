
import './ArtistCard.css';

export default function SongCard({ artist, imagen}) {
  return (
    <li className="artist-card">
      <img src={imagen} alt={artist}/>
      <h2>{artist}</h2>
    </li>
  );
}