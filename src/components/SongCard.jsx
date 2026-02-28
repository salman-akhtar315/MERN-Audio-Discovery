import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

const SongCard = ({ song, isPlaying, activeSong, data, i }) => {
  const dispatch = useDispatch();

  // Extract useful fields – fallback for different possible structures
  const title = song?.attributes?.name || song?.title || 'Unknown Title';
  const artist = song?.attributes?.artistName || song?.subtitle || 'Unknown Artist';
  const coverArt = song?.attributes?.artwork?.url
    ? song.attributes.artwork.url.replace('{w}x{h}', '400x400').replace('440x440bb.jpg', '400x400bb.jpg')
    : song?.images?.coverart || "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'><rect width='100%' height='100%' fill='%23333'/><text x='50%' y='50%' fill='%23fff' font-size='20' text-anchor='middle' dominant-baseline='middle'>No%20Cover</text></svg>";
  const songKeyOrId = song?.id || song?.key || `song-${i}`;

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  const isActive = (activeSong?.attributes?.name || activeSong?.title) === title;

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
            isActive ? 'flex bg-black bg-opacity-70' : 'hidden'
          }`}
        >
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        <img alt="song cover" src={coverArt} className="w-full h-full rounded-lg object-cover" />
      </div>

      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          <Link to={`/songs/${songKeyOrId}`}>{title}</Link>
        </p>
        <p className="text-sm truncate text-gray-300 mt-1">
          <Link to={`/artists/${song?.attributes?.artistId || 'top-artists'}`}>
            {artist}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;

// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useDispatch } from 'react-redux';

// import PlayPause from './PlayPause';
// import { playPause, setActiveSong } from '../redux/features/playerSlice';

// const SongCard = ({ song, isPlaying, activeSong, data, i }) => {
//   const dispatch = useDispatch();

//   const handlePauseClick = () => {
//     dispatch(playPause(false));
//   };

//   const handlePlayClick = () => {
//     dispatch(setActiveSong({ song, data, i }));
//     dispatch(playPause(true));
//   };

//   return (
//     <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
//       <div className="relative w-full h-56 group">
//         <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${activeSong?.title === song.title ? 'flex bg-black bg-opacity-70' : 'hidden'}`}>
//           <PlayPause
//             isPlaying={isPlaying}
//             activeSong={activeSong}
//             song={song}
//             handlePause={handlePauseClick}
//             handlePlay={handlePlayClick}
//           />
//         </div>
//         <img alt="song_img" src={song.images?.coverart} className="w-full h-full rounded-lg" />
//       </div>

//       <div className="mt-4 flex flex-col">
//         <p className="font-semibold text-lg text-white truncate">
//           <Link to={`/songs/${song?.key}`}>
//             {song.title}
//           </Link>
//         </p>
//         <p className="text-sm truncate text-gray-300 mt-1">
//           <Link to={song.artists ? `/artists/${song?.artists[0]?.adamid}` : '/top-artists'}>
//             {song.subtitle}
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SongCard;