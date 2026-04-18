import React from 'react';
import { useNavigate } from 'react-router-dom';

const ArtistCard = ({ track }) => {
  const navigate = useNavigate();

  const artistName = track?.attributes?.artistName || track?.subtitle || 'Unknown Artist';
  const cover = track?.attributes?.artwork?.url
    ? track.attributes.artwork.url.replace('{w}x{h}', '400x400')
    : track?.images?.coverart || "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'><rect width='100%' height='100%' fill='%23333'/><text x='50%' y='50%' fill='%23fff' font-size='20' text-anchor='middle' dominant-baseline='middle'>Artist</text></svg>";

  // Prefer numeric artist id when present; fall back to name-based routing.
  const artistLinkId = track?.attributes?.artistId || null;

  const handleClick = () => {
    if (artistLinkId) {
      navigate(`/artists/${artistLinkId}`);
    } else {
      navigate(`/artists/${encodeURIComponent(artistName)}`);
    }
  };

  return (
    <div
      className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
      onClick={handleClick}
    >
      <img alt="artist" src={cover} className="w-full h-56 rounded-full object-cover" />
      <p className="mt-4 font-semibold text-lg text-white truncate text-center">
        {artistName}
      </p>
    </div>
  );
};

export default ArtistCard;


