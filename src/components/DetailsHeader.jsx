import React from 'react';
import { Link } from 'react-router-dom';

const DetailsHeader = ({ artistId, artistData, songData }) => {
  if (artistId) {
    // Artist view
    const name = artistData?.attributes?.name || 'Unknown Artist';
    const genre = artistData?.attributes?.genreNames?.[0] || 'Unknown Genre';
    const artwork = artistData?.attributes?.artwork?.url
      ?.replace('{w}', '500')
      ?.replace('{h}', '500') || 'https://via.placeholder.com/500?text=Artist';

    const safeArtwork = artwork && !artwork.startsWith('http') && !artwork.startsWith('data:')
      ? `https://${artwork}`
      : artwork;

    return (
      <div className="relative w-full flex flex-col">
        <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28" />
        <div className="absolute inset-0 flex items-center px-4">
          <img
            alt="artist"
            src={safeArtwork}
            className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black"
          />
          <div className="ml-5">
            <p className="font-bold sm:text-3xl text-xl text-white">{name}</p>
            <p className="text-base text-gray-400 mt-2">{genre}</p>
          </div>
        </div>
        <div className="w-full sm:h-44 h-24" />
      </div>
    );
  }

  // Song view
  const title = songData?.attributes?.name || songData?.title || 'Unknown Title';
  const artist = songData?.attributes?.artistName || songData?.subtitle || 'Unknown Artist';
  const cover = songData?.attributes?.artwork?.url
    ?.replace('{w}', '500')
    ?.replace('{h}', '500') || songData?.images?.coverart || 'https://via.placeholder.com/500';

  return (
    <div className="relative w-full flex flex-col">
      <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28" />
      <div className="absolute inset-0 flex items-center px-4">
        <img
          alt="song cover"
          src={cover}
          className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black"
        />
        <div className="ml-5">
          <p className="font-bold sm:text-3xl text-xl text-white">{title}</p>
          <Link to={`/artists/${songData?.attributes?.artistId || 'top-artists'}`}>
            <p className="text-base text-gray-400 mt-2">{artist}</p>
          </Link>
          <p className="text-base text-gray-400 mt-1">
            {songData?.attributes?.genreNames?.[0] || songData?.genres?.primary || 'Unknown'}
          </p>
        </div>
      </div>
      <div className="w-full sm:h-44 h-24" />
    </div>
  );
};

export default DetailsHeader;


// import React from 'react';
// import { Link } from 'react-router-dom';

// const DetailsHeader = ({ artistId, artistData, songData }) => (
//   <div className="relative w-full flex flex-col">
//     <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28" />

//     <div className="absolute inset-0 flex items-center">
//       <img
//         alt="profile"
//         src={
//           artistId ? artistData?.attributes?.artwork?.url
//             .replace('{w}', '500')
//             .replace('{h}', '500')
//             : songData?.images?.coverart
// }
//         className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black"
//       />

//       <div className="ml-5">
//         <p className="font-bold sm:text-3xl text-xl text-white">
//           {artistId ? artistData?.attributes?.name : songData?.title}
//         </p>
//         {!artistId && (
//           <Link to={`/artists/${songData?.artists[0]?.adamid}`}>
//             <p className="text-base text-gray-400 mt-2">{songData?.subtitle}</p>
//           </Link>
//         )}

//         <p className="text-base text-gray-400 mt-2">
//           {artistId
//             ? artistData?.attributes?.genreNames[0]
//             : songData?.genres?.primary}
//         </p>
//       </div>
//     </div>

//     <div className="w-full sm:h-44 h-24" />
//   </div>
// );

// export default DetailsHeader;