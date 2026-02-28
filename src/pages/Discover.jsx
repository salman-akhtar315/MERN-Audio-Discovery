import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Error, Loader, SongCard } from '../components';
import { selectGenreListId } from '../redux/features/playerSlice';
import { useGetSongsByGenreQuery } from '../redux/services/shazamCore';
import { genres } from '../assets/constants';

const Discover = () => {
  const dispatch = useDispatch();
  const { genreListId, activeSong, isPlaying } = useSelector(
    (state) => state.player
  );

  // Pass genre OR default to "POP" and always fetch on load
  const { data, isFetching, error } = useGetSongsByGenreQuery(
    genreListId || 'POP'
  );

  if (isFetching) return <Loader title="Loading songs..." />;
  if (error) return <Error />;

  const genreTitle =
    genres.find(({ value }) => value === genreListId)?.title || 'Pop';

  // Accept array responses from local server or the original shazam-core shape
  const songs = data || data?.data || [];

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">
          Discover {genreTitle}
        </h2>

        <select
          onChange={(e) => dispatch(selectGenreListId(e.target.value))}
          value={genreListId || 'POP'}
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {genres.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songs.map((song, i) => (
          <SongCard
            key={song.id || i}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={songs}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;

// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';

// import { Error, Loader, SongCard } from '../components';
// import { selectGenreListId } from '../redux/features/playerSlice';
// import { useGetSongsByGenreQuery } from '../redux/services/shazamCore';
// import { genres } from '../assets/constants';

// const Discover = () => {
//   const dispatch = useDispatch();
//   const { genreListId } = useSelector((state) => state.player);
//   const { activeSong, isPlaying } = useSelector((state) => state.player);
//   const { data, isFetching, error } = useGetSongsByGenreQuery(genreListId || 'POP');

//   if (isFetching) return <Loader title="Loading songs..." />;

//   if (error) return <Error />;

//   const genreTitle = genres.find(({ value }) => value === genreListId)?.title;

//   return (
//     <div className="flex flex-col">
//       <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
//         <h2 className="font-bold text-3xl text-white text-left">Discover {genreTitle}</h2>

//         <select
//           onChange={(e) => dispatch(selectGenreListId(e.target.value))}
//           value={genreListId || 'pop'}
//           className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
//         >
//           {genres.map((genre) => <option key={genre.value} value={genre.value}>{genre.title}</option>)}
//         </select>
//       </div>

//       <div className="flex flex-wrap sm:justify-start justify-center gap-8">
//         {data?.map((song, i) => (
//           <SongCard
//             key={song.key}
//             song={song}
//             isPlaying={isPlaying}
//             activeSong={activeSong}
//             data={data}
//             i={i}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Discover;