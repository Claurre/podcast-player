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
      .catch((_error) => {
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

  if (loading) {
    return <div>Cargando podcasts...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  
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

