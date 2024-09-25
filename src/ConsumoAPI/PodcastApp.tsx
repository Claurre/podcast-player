import React, { useEffect, useState } from 'react';

interface Episode {
  id: number;
  title: string;
  description: string;
  urls: {
    high_mp3: string;
  };
  channel: {
    urls: {
      logo_image: {
        original: string;
      };
    };
  };
}

const PodcastApp: React.FC = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [playingUrl, setPlayingUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [loading, setLoading] = useState<boolean>(true);  // Para manejar el estado de carga
  const [error, setError] = useState<string | null>(null);  // Para manejar errores

  useEffect(() => {
    // Fetch de la API
    fetch('https://api.audioboom.com/audio_clips')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la respuesta de la API');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Datos de la API:', data);  // Log para inspeccionar
        setEpisodes(data.body.audio_clips);
        setLoading(false);  // Finaliza la carga
      })
      .catch((error) => {
        console.error('Error al obtener los episodios:', error);
        setError('Hubo un error al cargar los episodios.');  // Manejo de errores
        setLoading(false);
      });
  }, []);

  const handlePlayPause = (url: string) => {
    if (playingUrl === url) {
      if (isPlaying) {
        audio?.pause();
      } else {
        audio?.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      if (audio) {
        audio.pause();
      }
      const newAudio = new Audio(url);
      setAudio(newAudio);
      newAudio.play();
      setPlayingUrl(url);
      setIsPlaying(true);
    }
  };

  const truncateText = (text: string | undefined, maxLength: number) => {
    if (!text) return ''; // Si el texto es undefined o null, devuelve una cadena vacía
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };
  
  
  

  if (loading) {
    return <div>Cargando podcasts...</div>;  // Mostrar mientras carga
  }

  if (error) {
    return <div>{error}</div>;  // Mostrar si hay error
  }

  return (
    <div>
      <h1>Podcasts</h1>
      <div className="episodes-list">
        {episodes.map((episode) => (
          <div key={episode.id} className="episode">
            <img
              src={episode.channel?.urls?.logo_image?.original || 'fallback_image_url.jpg'} // Asegura que siempre haya una imagen o un fallback
              alt={episode.title || 'Sin título'}
              width="150"
            />
            <h2>{truncateText(episode.title, 50)}</h2>
            <p>{truncateText(episode.description, 100)}</p>
            <button onClick={() => handlePlayPause(episode.urls.high_mp3)}>
              {playingUrl === episode.urls.high_mp3 && isPlaying ? 'Pausar' : 'Reproducir'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PodcastApp;
