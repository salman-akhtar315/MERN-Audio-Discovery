import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Error, Loader, SongCard } from '../components';
import { useGetSongsBySearchQuery } from '../redux/services/shazamCore';

const Search = () => {
  const { searchTerm } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsBySearchQuery(searchTerm || '');

  // Most likely structure from shazam-core search: data?.tracks?.hits?.map(hit => hit.track)
  // But many responses now return { data: [...] } like your example
  // Accept server responses that return an array, or the original shazam-core shape
  const songs = data || data?.data || data?.tracks?.hits?.map(hit => hit.track) || [];

  if (isFetching) return <Loader title={`Searching "${searchTerm}"...`} />;

  if (error) return <Error title="Something went wrong during search" />;

  if (songs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-20">
        <h2 className="text-white text-2xl font-bold">No results found for "{searchTerm}"</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Showing results for <span className="font-black">{searchTerm}</span>
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songs.map((song, i) => (
          <SongCard
            key={song.id || song.key || `search-${i}`}
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

export default Search;



