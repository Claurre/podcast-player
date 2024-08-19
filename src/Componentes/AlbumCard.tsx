import "./ListenAgain.css"

export default function SongCard({ album, imagen, artist}) {
    return (
      <li className="song-card">
        <img src={imagen} alt={album}/>
        <h3>{album}</h3>
        <p>{artist}</p>
      </li>
    );
}
