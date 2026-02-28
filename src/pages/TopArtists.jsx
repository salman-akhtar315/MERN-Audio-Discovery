import React from 'react';

import { ArtistCard, Error, Loader } from '../components';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';

const TopArtists = () => {
  const { data, isFetching, error } = useGetTopChartsQuery();

  if (isFetching) return <Loader title="Loading top artists..." />;

  if (error) return <Error title="Failed to load top artists" />;

  // Usually top charts return songs → we extract unique artists
  const source = data || data?.data || [];
  const list = Array.isArray(source) ? source : source.data || [];
  const artists = list.length ? [...new Map(list.map(s => [s.attributes?.artistName, s])).values()] : [];

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Top Artists</h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {artists.map((track) => (
          <ArtistCard
            key={track.id || track.attributes?.isrc || Math.random()}
            track={track}
          />
        ))}
      </div>
    </div>
  );
};

export default TopArtists;



// import React from 'react';

// import { ArtistCard, Error, Loader } from '../components';
// import { useGetTopChartsQuery } from '../redux/services/shazamCore';

// const TopArtists = () => {
//   const { data, isFetching, error } = useGetTopChartsQuery();

//   if (isFetching) return <Loader title="Loading artists..." />;

//   if (error) return <Error />;

//   return (
//     <div className="flex flex-col">
//       <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Top artists</h2>

//       <div className="flex flex-wrap sm:justify-start justify-center gap-8">
//         {data?.map((track) => <ArtistCard key={track.key} track={track} />)}
//       </div>
//     </div>
//   );
// };

// export default TopArtists;