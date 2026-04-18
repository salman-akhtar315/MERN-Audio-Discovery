import React from 'react';
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';

const PlayPause = ({ isPlaying, activeSong, song, handlePause, handlePlay }) => {
  // Make comparison more robust
  const songTitle = song?.attributes?.name || song?.title;
  const activeTitle = activeSong?.attributes?.name || activeSong?.title;

  return isPlaying && activeTitle === songTitle ? (
    <FaPauseCircle size={35} className="text-gray-300 cursor-pointer" onClick={handlePause} />
  ) : (
    <FaPlayCircle size={35} className="text-gray-300 cursor-pointer" onClick={handlePlay} />
  );
};

export default PlayPause;



// import React from 'react';
// import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';

// const PlayPause = ({ isPlaying, activeSong, song, handlePause, handlePlay }) => (isPlaying && activeSong?.title === song.title ? (
//   <FaPauseCircle
//     size={35}
//     className="text-gray-300"
//     onClick={handlePause}
//   />
// ) : (
//   <FaPlayCircle
//     size={35}
//     className="text-gray-300"
//     onClick={handlePlay}
//   />
// ));

// export default PlayPause;