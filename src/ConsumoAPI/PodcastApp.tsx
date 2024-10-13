import React, { useEffect, useState } from 'react';
import './PodcastApp.css'; 
import ReproductorBar from './ReproductorBar';

interface Episode {
  title: string;
  urls: { high_mp3: string };
  channel: { urls: { logo_image: { original: string } } };
}


const PodcastApp: React.FC = () => {
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);
  
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [playingUrl, setPlayingUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPodcast, setSelectedPodcast] = useState<{
    audioSrc: string;
    podcastImage: string;
    podcastTitle: string;
  } | null>(null);

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

  const handleCardClick = (episode: Episode) => {
    setCurrentEpisode(episode); 
  };

  const handleStop = () => {
    console.log('Podcast detenido');
    setCurrentEpisode(null);
  };

  const handlePodcastClick = (audioSrc: string, podcastImage: string, podcastTitle: string) => {
    setSelectedPodcast({
      audioSrc,
      podcastImage,
      podcastTitle,
    });
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
    <div>
      <div className="podcast-grid">
        {episodes.map((episode, index) => (
          <div
            key={index}
            className="podcast-card"
            onClick={() => handleCardClick(episode)}
          >
            <img src={episode.channel.urls.logo_image.original} alt={episode.title} />
            <h3>{episode.title}</h3>
          </div>
        ))}
      </div>
      {currentEpisode && (
        <ReproductorBar
          audioSrc={currentEpisode.urls.high_mp3}
          podcastImage={currentEpisode.channel.urls.logo_image.original}
          podcastTitle={currentEpisode.title}
          onStop={handleStop}
        />
      )}
    </div>
  );

  
};

export default PodcastApp;

