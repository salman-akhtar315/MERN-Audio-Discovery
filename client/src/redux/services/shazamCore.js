import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamCoreApi = createApi({
  // reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    // baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
    prepareHeaders: (headers) => {
      // headers.set('x-rapidapi-key', import.meta.env.VITE_RAPIDAPI_KEY);
      // headers.set('x-rapidapi-host', 'shazam-core.p.rapidapi.com');
      // return headers;
    },
  }),
  endpoints: (builder) => ({
    // Use local server proxy for top charts and genre searches to avoid
    // requiring a RapidAPI key in local development.
    getTopCharts: builder.query({
      query: () => `/api/search?query=top`,
      keepUnusedDataFor: 600,
    }),

    getSongsByGenre: builder.query({
      query: (genre) =>
        `/api/search?query=${encodeURIComponent(genre || 'pop')}`,
      keepUnusedDataFor: 600,
    }),

    getSongsBySearch: builder.query({
      // Route search requests to the local proxy server
      query: (searchTerm) =>
        `/api/search?query=${encodeURIComponent(searchTerm)}`,
    }),

    getSongDetails: builder.query({
      // Use local server proxy for details
      query: ({ songid }) => `/api/track/details?track_id=${songid}`,
    }),

    getArtistDetails: builder.query({
      // Local proxy route added to fetch artist info and tracks
      // Accept either a numeric artist id or a name string.
      query: (artistParam) => {
        if (!artistParam) return `/api/artist/details`;
        const str = String(artistParam);
        const isNumeric = /^\d+$/.test(str);
        if (isNumeric) return `/api/artist/details?artist_id=${str}`;
        return `/api/artist/details?artist_name=${encodeURIComponent(str)}`;
      },
    }),

    getSongRelated: builder.query({
      // Use local server proxy for related tracks
      query: ({ songid }) => `/api/track/related?track_id=${songid}`,
    }),

    // ✅ Fix: global/popular tracks (simulating country charts)
    getSongsByCountry: builder.query({
      // Route country-based/popular tracks to local server
      query: (country) => `/api/search?query=top`,
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongsByGenreQuery,
  useGetSongsBySearchQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
  useGetArtistDetailsQuery,
  useGetSongsByCountryQuery, 
} = shazamCoreApi;


