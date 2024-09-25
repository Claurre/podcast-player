import React, { useState, useEffect, useRef } from 'react';
import './ReproductorBar.css';

interface ReproductorBarProps {
  audioSrc: string;
  onNext: () => void;
  onPrevious: () => void;
  onStop: () => void;
}

const ReproductorBar: React.FC<ReproductorBarProps> = ({ audioSrc, onNext, onPrevious, onStop }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = audioSrc;
      audioRef.current.load();
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
      onStop(); // Llamar la función onStop para cualquier acción adicional
    }
  };

  const handleProgressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(event.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
    setProgress(newTime);
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

  return (
    <div className="reproductor-bar">
      <button onClick={onPrevious}>{'<<'}</button>
      <button onClick={handleStop}>{'■'}</button>
      <button onClick={togglePlayPause}>{isPlaying ? '⏸︎' : '►'}</button>
      <button onClick={onNext}>{'>>'}</button>
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
      <audio ref={audioRef} />
    </div>
  );
};

export default ReproductorBar;
