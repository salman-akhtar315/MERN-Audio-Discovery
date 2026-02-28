import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
import { setActiveSong, playPause } from '../redux/features/playerSlice';
import { useGetSongDetailsQuery, useGetSongRelatedQuery } from '../redux/services/shazamCore';

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid } = useParams(); // ← artistId not needed here
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data: songData, isFetching: isFetchingSongDetails, error: songError } = useGetSongDetailsQuery({ songid });
  const { data: relatedData, isFetching: isFetchingRelated, error: relatedError } = useGetSongRelatedQuery({ songid });

  if (isFetchingSongDetails || isFetchingRelated) {
    return <Loader title="Loading song details..." />;
  }

  if (songError || relatedError) {
    return <Error title="Failed to load song information" />;
  }

  // Most common structure from shazam-core /tracks/details
  const lyricsSection = songData?.sections?.find(s => s.type === 'LYRICS');

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data: relatedData?.data || [], i }));
    dispatch(playPause(true));
  };

  return (
    <div className="flex flex-col">
      <DetailsHeader
        songData={songData}
        // artistId={artistId}   ← usually not needed in song details
      />

      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold mt-10">Lyrics</h2>

        <div className="mt-5 text-gray-400">
          {lyricsSection?.text?.length > 0 ? (
            lyricsSection.text.map((line, idx) => (
              <p key={`lyric-${idx}`} className="my-1 text-base">
                {line}
              </p>
            ))
          ) : (
            <p className="text-base my-1">Sorry, no lyrics found for this song.</p>
          )}
        </div>
      </div>

      <RelatedSongs
        data={relatedData?.data || []}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  );
};

export default SongDetails;


// import React from 'react';
// import { useParams } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';

// import { setActiveSong, playPause } from '../redux/features/playerSlice';
// import { useGetSongDetailsQuery, useGetSongRelatedQuery } from '../redux/services/shazamCore';

// const SongDetails = () => {
//   const dispatch = useDispatch();
//   const { songid, id: artistId } = useParams();
//   const { activeSong, isPlaying } = useSelector((state) => state.player);

//   const { data, isFetching: isFetchinRelatedSongs, error } = useGetSongRelatedQuery({ songid });
//   const { data: songData, isFetching: isFetchingSongDetails } = useGetSongDetailsQuery({ songid });

//   if (isFetchingSongDetails && isFetchinRelatedSongs) return <Loader title="Searching song details" />;

//   console.log(songData);

//   if (error) return <Error />;

//   const handlePauseClick = () => {
//     dispatch(playPause(false));
//   };

//   const handlePlayClick = (song, i) => {
//     dispatch(setActiveSong({ song, data, i }));
//     dispatch(playPause(true));
//   };

//   return (
//     <div className="flex flex-col">
//       <DetailsHeader
//         artistId={artistId}
//         songData={songData}
//       />

//       <div className="mb-10">
//         <h2 className="text-white text-3xl font-bold">Lyrics:</h2>

//         <div className="mt-5">
//           {songData?.sections[1].type === 'LYRICS'
//             ? songData?.sections[1]?.text.map((line, i) => (
//               <p key={`lyrics-${line}-${i}`} className="text-gray-400 text-base my-1">{line}</p>
//             ))
//             : (
//               <p className="text-gray-400 text-base my-1">Sorry, No lyrics found!</p>
//             )}
//         </div>
//       </div>

//       <RelatedSongs
//         data={data}
//         artistId={artistId}
//         isPlaying={isPlaying}
//         activeSong={activeSong}
//         handlePauseClick={handlePauseClick}
//         handlePlayClick={handlePlayClick}
//       />

//     </div>
//   );
// };

// export default SongDetails;