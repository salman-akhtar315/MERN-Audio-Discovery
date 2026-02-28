/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useEffect } from 'react';

const Player = ({ activeSong, isPlaying, volume, seekTime, onEnded, onTimeUpdate, onLoadedData, repeat }) => {
  const ref = useRef(null);
  
  // Log for debugging
  useEffect(() => {
    if (activeSong?.id) {
      console.log('Playing stream for track ID:', activeSong.id, 'Title:', activeSong.title);
    } else {
      console.log('No track ID in activeSong', activeSong);
    }
  }, [activeSong?.id]);

  // eslint-disable-next-line no-unused-expressions
  if (ref.current) {
    if (isPlaying) {
      ref.current.play().catch(err => console.error('Play error:', err));
    } else {
      ref.current.pause();
    }
  }

  useEffect(() => {
    if (ref.current) ref.current.volume = volume;
  }, [volume]);
  // updates audio element only on seekTime change (and not on each rerender):
  useEffect(() => {
    if (ref.current) ref.current.currentTime = seekTime;
  }, [seekTime]);

  const handleError = (e) => {
    console.error('Audio error:', e.target.error);
  };

  return (
    <audio
      src={activeSong?.id ? `/api/stream?track_id=${activeSong.id}` : activeSong?.hub?.actions[1]?.uri}
      ref={ref}
      loop={repeat}
      onEnded={onEnded}
      onTimeUpdate={onTimeUpdate}
      onLoadedData={onLoadedData}
      onError={handleError}
      crossOrigin="anonymous"
    />
  );
};

export default Player;