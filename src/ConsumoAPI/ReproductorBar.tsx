import React, { useState, useEffect, useRef } from 'react';
import './ReproductorBar.css';

interface ReproductorBarProps {
  audioSrc: string;
  podcastImage: string;
  podcastTitle: string;
  onStop: () => void;
}

const ReproductorBar: React.FC<ReproductorBarProps> = ({ audioSrc, podcastImage, podcastTitle, onStop }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = audioSrc;
      audioRef.current.load();
      audioRef.current.play(); 
      setIsPlaying(true);
    }
  }, [audioSrc]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleLoadedMetadata = () => setDuration(audio.duration);
      const handleTimeUpdate = () => setCurrentTime(audio.currentTime);

      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('timeupdate', handleTimeUpdate);

      return () => {
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, []);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setCurrentTime(0);
    }
    onStop();
  };

  const handleProgressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(event.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
    setProgress(newTime);
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(event.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      setProgress((currentTime / duration) * 100 || 0);
    }
  }, [currentTime, duration]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleStopAndHide = () => {
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0;
    }
    setIsPlaying(false);
    onStop();
  };

  const handleForward = () => {
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.currentTime = Math.min(audioElement.currentTime + 3, audioElement.duration);
    }
  };

  const handleRewind = () => {
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.currentTime = Math.max(audioElement.currentTime - 3, 0);
    }
  };


  return (
    <div className="reproductor-bar">
      <img src={podcastImage} alt={podcastTitle} className="podcast-image" />
      <div className="controls">
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleProgressChange}
          className="progress-slider"
        />
        <span className="timer">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
        <button className="stop-button" onClick={handleStopAndHide}>❌</button>
        <div className="bottom-controls">
          <span className="podcast-title">{podcastTitle}</span>
          <button className="rewind-button" onClick={handleRewind}>⏪</button>
          <button onClick={togglePlayPause} className="play-pause-button">
            {isPlaying ? '⏸︎' : '►'}
          </button>
          <button className="forward-button" onClick={handleForward}>⏩</button>
          <div className="volume-control">
          <span role="img" aria-label="volume">🔊</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="volume-slider"
          />
          </div>
        </div>
      </div>
      <audio ref={audioRef} />
    </div>
  );
};

export default ReproductorBar;

