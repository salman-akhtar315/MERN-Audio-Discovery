import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { useGetArtistDetailsQuery } from '../redux/services/shazamCore';

const ArtistDetails = () => {
  const { id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const dispatch = useDispatch();

  const {
    data: artistData,
    isFetching: isFetchingArtist,
    error: artistError,
  } = useGetArtistDetailsQuery(artistId);

  if (isFetchingArtist) return <Loader title="Loading artist details..." />;

  if (artistError) return <Error />;

  const songs = artistData?.tracks || [];
  const artistInfo = artistData?.artist || null;

  const handlePauseClick = () => dispatch(playPause(false));

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data: songs, i }));
    dispatch(playPause(true));
  };

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} artistData={artistInfo} />

      <RelatedSongs
        data={songs}
        activeSong={activeSong}
        isPlaying={isPlaying}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  );
};

export default ArtistDetails;



// import React from 'react';
// import { useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';

// import { useGetArtistDetailsQuery } from '../redux/services/shazamCore';

// const ArtistDetails = () => {
//   const { id: artistId } = useParams();
//   const { activeSong, isPlaying } = useSelector((state) => state.player);
//   const { data: artistData, isFetching: isFetchingArtistDetails, error } = useGetArtistDetailsQuery(artistId);

//   if (isFetchingArtistDetails) return <Loader title="Loading artist details..." />;

//   if (error) return <Error />;

//   return (
//     <div className="flex flex-col">
//       <DetailsHeader
//         artistId={artistId}
//         artistData={artistData?.data[0]}
//       />

//       <RelatedSongs
//         data={artistData?.data[0].views['top-songs']?.data}
//         artistId={artistId}
//         isPlaying={isPlaying}
//         activeSong={activeSong}
//       />
//     </div>
//   );
// };

// export default ArtistDetails;