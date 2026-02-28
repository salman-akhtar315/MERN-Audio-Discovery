import { configureStore } from '@reduxjs/toolkit';

import { shazamCoreApi } from './services/shazamCore';
import playerReducer from './features/playerSlice';

export const store = configureStore({
  reducer: {
    [shazamCoreApi.reducerPath]: shazamCoreApi.reducer,
    player: playerReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(shazamCoreApi.middleware),
});


// import { configureStore } from '@reduxjs/toolkit';

// import { shazamCoreApi } from './services/shazamCore';
// import { spotifyApi } from './services/spotify'; // Import Spotify
// import playerReducer from './features/playerSlice';

// export const store = configureStore({
//   reducer: {
//     [shazamCoreApi.reducerPath]: shazamCoreApi.reducer,
//     [spotifyApi.reducerPath]: spotifyApi.reducer, // Add Spotify Reducer
//     player: playerReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware()
//       .concat(shazamCoreApi.middleware)
//       .concat(spotifyApi.middleware), // Add Spotify Middleware
// });