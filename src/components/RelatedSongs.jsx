import React from 'react';

import SongBar from './SongBar';

const RelatedSongs = ({ data, artistId, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => {
  const songs = data?.data || data || [];

  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-3xl text-white mb-6">Related Songs</h1>

      <div className="w-full flex flex-col">
        {songs.map((song, i) => (
          <SongBar
            key={`${artistId || 'related'}-${song.id || song.key || i}`}
            song={song}
            i={i}
            artistId={artistId}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePauseClick={handlePauseClick}
            handlePlayClick={handlePlayClick}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedSongs;



// import React from 'react';

// import SongBar from './SongBar';

// const RelatedSongs = ({ data, artistId, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => (
//   <div className="flex flex-col">
//     <h1 className="font-bold text-3xl text-white">Related Songs:</h1>

//     <div className="mt-6 w-full flex flex-col">
//       {data?.map((song, i) => (
//         <SongBar
//           key={`${artistId}-${song.key}-${i}`}
//           song={song}
//           i={i}
//           artistId={artistId}
//           isPlaying={isPlaying}
//           activeSong={activeSong}
//           handlePauseClick={handlePauseClick}
//           handlePlayClick={handlePlayClick}
//         />
//       ))}
//     </div>
//   </div>
// );

// export default RelatedSongs;