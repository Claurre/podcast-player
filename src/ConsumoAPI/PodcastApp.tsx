import React, { useEffect, useState } from 'react';
import './PodcastApp.css'; 
import ReproductorBar from './ReproductorBar';

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
  const [currentEpisode, setCurrentEpisode] = useState<number>(0);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [playingUrl, setPlayingUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://api.allorigins.win/get?url=https://api.audioboom.com/audio_clips')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la respuesta de la API');
        }
        return response.json();
      })
      .then((data) => {
        const parsedData = JSON.parse(data.contents); 
        setEpisodes(parsedData.body.audio_clips);
        setLoading(false);
      })
      .catch((error) => {
        setError('Hubo un error al cargar los episodios.');
        setLoading(false);
      });
  }, []);

  const handleNext = () => {
    setCurrentEpisode((prev) => (prev + 1) % episodes.length);
  };

  const handlePrevious = () => {
    setCurrentEpisode((prev) => (prev - 1 + episodes.length) % episodes.length);
  };

  const handleStop = () => {
    console.log('Podcast detenido');
  };

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



  if (loading) {
    return <div>Cargando podcasts...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const truncateText = (text: string | undefined, maxLength: number) => {
    if (!text) return 'No hay descripción disponible'; 
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };
  
  return (
    <div className="podcast-app">
      <h1>Soy una sidebar</h1>
      <div className="podcasts-container">
        {episodes.map((episode) => (
          <div
            key={episode.id}
            className="podcast-card"
            onClick={() => handlePlayPause(episode.urls.high_mp3)} 
          >
            <img
              src={episode.channel?.urls?.logo_image?.original || 'fallback_image_url.jpg'}
              alt={episode.title || 'Sin título'}
              className="podcast-image"
            />
            <div className="podcast-details">
              <h2>{truncateText(episode.title, 50)}</h2>
              <p>{truncateText(episode.description, 100)}</p>
              <div className="podcast-status">
                {playingUrl === episode.urls.high_mp3 && isPlaying ? 'Reproduciendo...' : 'Haga clic para reproducir'}
              </div>
            </div>
            <ReproductorBar
        audioSrc={episodes[currentEpisode]?.urls.high_mp3}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onStop={handleStop}
        />
          </div>
          
        ))}
        
      </div>
    </div>
  );
  
};

export default PodcastApp;

