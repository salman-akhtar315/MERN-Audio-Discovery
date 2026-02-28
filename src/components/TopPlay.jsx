import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data, isFetching, error } = useGetTopChartsQuery();
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  if (isFetching) return <p className="text-white">Loading Top Songs...</p>;
  if (error) return <p className="text-red-500">Something went wrong</p>;

  // Accept array responses or shazam-core shaped responses
  const source = data || data?.data || [];
  const topSongs = (Array.isArray(source) ? source : source.data)?.slice(0, 5) || [];

  const handlePauseClick = () => dispatch(playPause(false));

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data: topSongs, i }));
    dispatch(playPause(true));
  };

  return (
    <div
      ref={divRef}
      className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col"
    >
      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">
            Top 5 Right Now
          </h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer hover:underline">
              See more
            </p>
          </Link>
        </div>

        <div className="mt-6 flex flex-col gap-4">
          {topSongs.map((song, i) => (
            <div
              key={song.id || `top-${i}`}
              className="flex flex-row items-center gap-4 hover:bg-[#4c426e] p-3 rounded-lg transition"
            >
              <p className="text-white font-bold text-lg min-w-[30px]">
                {i + 1}.
              </p>

              {(() => {
                const raw = song.attributes?.artwork?.url?.replace('{w}x{h}', '80x80') || "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'><rect width='100%' height='100%' fill='%23333'/><text x='50%' y='50%' fill='%23fff' font-size='12' text-anchor='middle' dominant-baseline='middle'>cover</text></svg>";
                const src = raw && !raw.startsWith('http') && !raw.startsWith('data:') ? `https://${raw}` : raw;
                return (
                  <img src={src} alt="cover" className="w-14 h-14 rounded-lg object-cover" />
                );
              })()}
              

              <div className="flex-1">
                <p className="text-white font-medium truncate">
                  {song.attributes?.name || 'Unknown'}
                </p>
                <p className="text-gray-400 text-sm truncate">
                  {song.attributes?.artistName || 'Unknown'}
                </p>
              </div>

              <PlayPause
                isPlaying={isPlaying}
                activeSong={activeSong}
                song={song}
                handlePause={handlePauseClick}
                handlePlay={() =>
                  handlePlayClick(song, i)
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopPlay;



// import React, { useEffect, useRef } from 'react';
// import { Link } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { FreeMode } from 'swiper/modules'; // ✅ Correct import
// import 'swiper/css';
// import 'swiper/css/free-mode';

// import PlayPause from './PlayPause';
// import { playPause, setActiveSong } from '../redux/features/playerSlice';
// import { useGetTopChartsQuery } from '../redux/services/shazamCore';

// // TopChartCard remains the same

// const TopPlay = () => {
//   const dispatch = useDispatch();
//   const { activeSong, isPlaying } = useSelector((state) => state.player);
//   const { data } = useGetTopChartsQuery();
//   const divRef = useRef(null);

//   useEffect(() => {
//     divRef.current.scrollIntoView({ behavior: 'smooth' });
//   }, []);

//   const topPlays = data?.slice(0, 5);

//   const handlePauseClick = () => dispatch(playPause(false));
//   const handlePlayClick = (song, i) => {
//     dispatch(setActiveSong({ song, data, i }));
//     dispatch(playPause(true));
//   };

//   return (
//     <div ref={divRef} className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col">
//       {/* Top Charts section (unchanged) */}

//       <div className="w-full flex flex-col mt-8">
//         <div className="flex flex-row justify-between items-center">
//           <h2 className="text-white font-bold text-2xl">Top Artists</h2>
//           <Link to="/top-artists">
//             <p className="text-gray-300 text-base cursor-pointer">See more</p>
//           </Link>
//         </div>

//         <Swiper
//           slidesPerView="auto"
//           spaceBetween={15}
//           freeMode
//           centeredSlides
//           centeredSlidesBounds
//           modules={[FreeMode]} // ✅ Pass modules here
//           className="mt-4"
//         >
//           {topPlays?.map((artist) => (
//             <SwiperSlide
//               key={artist?.key}
//               style={{ width: '25%', height: 'auto' }}
//               className="shadow-lg rounded-full animate-slideright"
//             >
//               <Link to={`/artists/${artist?.artists?.[0].adamid}`}>
//                 <img src={artist?.images?.background} alt="Name" className="rounded-full w-full object-cover" />
//               </Link>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </div>
//   );
// };

// export default TopPlay;
