import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT || 5000;


const app = express();
app.use(cors());
app.use(express.json());

let accessToken = null;

// 🔐 Get SoundCloud Token
const getAccessToken = async () => {
  const response = await axios.post(
    "https://secure.soundcloud.com/oauth/token",
    new URLSearchParams({
      grant_type: "client_credentials"
    }),
    {
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            process.env.CLIENT_ID +
              ":" +
              process.env.CLIENT_SECRET
          ).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  accessToken = response.data.access_token;
};

// 🔍 Search Tracks
app.get("/api/search", async (req, res) => {
  try {
    if (!accessToken) await getAccessToken();

    const { query } = req.query;

    const response = await axios.get(
      `https://api.soundcloud.com/tracks`,
      {
        headers: {
          Authorization: `OAuth ${accessToken}`,
        },
        params: {
          q: query,
          access: "playable",
          limit: 10,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// 🔐 Proxy geo lookup (uses server-side API key)
app.get('/api/geo', async (req, res) => {
  try {
    const response = await axios.get(
      `https://geo.ipify.org/api/v2/country?apiKey=${process.env.GEO_API_KEY}`
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Geo lookup failed' });
  }
});

// Get track details by SoundCloud track id
app.get('/api/track/details', async (req, res) => {
  try {
    const { track_id } = req.query;
    if (!track_id) return res.status(400).json({ error: 'track_id required' });

    if (!accessToken) await getAccessToken();

    const response = await axios.get(
      `https://api.soundcloud.com/tracks/${track_id}`,
      {
        headers: {
          Authorization: `OAuth ${accessToken}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch track details' });
  }
});

// Get related tracks (best-effort) by searching for same artist or title
app.get('/api/track/related', async (req, res) => {
  try {
    const { track_id } = req.query;
    if (!track_id) return res.status(400).json({ error: 'track_id required' });

    if (!accessToken) await getAccessToken();

    // first get the track to extract artist/title
    const detailResp = await axios.get(`https://api.soundcloud.com/tracks/${track_id}`, {
      headers: { Authorization: `OAuth ${accessToken}` },
    });

    const track = detailResp.data;
    const q = track.title || track.user?.username || '';

    const searchResp = await axios.get('https://api.soundcloud.com/tracks', {
      headers: { Authorization: `OAuth ${accessToken}` },
      params: {
        q,
        limit: 10,
        access: 'playable',
      },
    });

    // Filter out the original track
    const related = (searchResp.data || []).filter((t) => String(t.id) !== String(track_id));

    res.json({ related });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch related tracks' });
  }
});

// Get artist details and their tracks
app.get('/api/artist/details', async (req, res) => {
  try {
    const { artist_id, artist_name } = req.query;

    if (!artist_id && !artist_name) return res.status(400).json({ error: 'artist_id or artist_name required' });

    if (!accessToken) await getAccessToken();

    let artist;

    if (artist_id) {
      const artistResp = await axios.get(`https://api.soundcloud.com/users/${artist_id}`, {
        headers: { Authorization: `OAuth ${accessToken}` },
      });
      artist = artistResp.data;
    } else {
      // search by name (take first match)
      const searchResp = await axios.get('https://api.soundcloud.com/users', {
        headers: { Authorization: `OAuth ${accessToken}` },
        params: { q: artist_name, limit: 1 },
      });
      artist = (searchResp.data && searchResp.data[0]) || null;
      if (!artist) return res.status(404).json({ error: 'Artist not found' });
    }

    // fetch artist tracks
    const tracksResp = await axios.get(`https://api.soundcloud.com/users/${artist.id}/tracks`, {
      headers: { Authorization: `OAuth ${accessToken}` },
      params: { limit: 50, access: 'playable' },
    });

    res.json({ artist, tracks: tracksResp.data });
  } catch (error) {
    console.error('Artist details error:', error.message);
    res.status(500).json({ error: 'Failed to fetch artist details' });
  }
});

// Proxy and stream SoundCloud track audio so browser can play without needing Authorization header
app.get('/api/stream', async (req, res) => {
  try {
    const { track_id } = req.query;
    if (!track_id) return res.status(400).json({ error: 'track_id required' });

    if (!accessToken) await getAccessToken();

    // Get track to find stream URL
    const trackResp = await axios.get(`https://api.soundcloud.com/tracks/${track_id}`, {
      headers: { Authorization: `OAuth ${accessToken}` },
    });

    const streamUrl = trackResp.data.stream_url || trackResp.data.stream_url;
    if (!streamUrl) return res.status(404).json({ error: 'No stream available' });

    // Fetch the stream and pipe it to the client
    const streamResp = await axios.get(streamUrl, {
      headers: { Authorization: `OAuth ${accessToken}` },
      responseType: 'stream',
    });

    // Forward relevant headers and set CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Accept-Ranges', 'bytes');
    if (streamResp.headers['content-type']) res.setHeader('Content-Type', streamResp.headers['content-type']);
    if (streamResp.headers['content-length']) res.setHeader('Content-Length', streamResp.headers['content-length']);

    streamResp.data.pipe(res);
  } catch (error) {
    console.error('Stream error:', error.message);
    res.status(500).json({ error: 'Failed to stream track' });
  }
});