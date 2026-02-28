# Lyrics React App

This repository contains a music discovery web application built with **React**, **Vite**, and an **Express** backend proxy that communicates with the SoundCloud API. It allows users to browse top tracks, search by genre or keyword, view song details, play audio streams, and explore artist information.

---

## 🛠️ Technologies Used

- Frontend: React, Redux Toolkit Query, Vite, Tailwind CSS
- Backend: Express, Axios (proxy for SoundCloud and geo services)
- Development tooling: ESLint, PostCSS, Vite dev server with proxy

---

## 🚀 Getting Started

### 1. Prerequisites

- Node.js (v16+ recommended)
- npm (comes with Node.js)

### 2. Clone the repository

\`\`\`bash
git clone https://github.com/your-username/lyrics.git
cd lyrics
\`\`\`

### 3. Install dependencies

There are two separate `package.json` files:

- root (client) dependencies
- `server/` dependencies for the backend proxy

Install both:

\`\`\`bash
# client
npm install

# server
cd server
npm install
cd ..
\`\`\`

### 4. Environment variables

Create a `.env` file in the `server/` directory with the following keys:

\`\`\`env
CLIENT_ID=your_soundcloud_client_id
CLIENT_SECRET=your_soundcloud_client_secret
GEO_API_KEY=your_ipify_geo_api_key
PORT=5000        # optional, defaults to 5000 if omitted
\`\`\`

The server uses these to obtain OAuth tokens from SoundCloud and to perform geo lookups.

### 5. Development

Start the backend, then the frontend. The frontend is configured with a Vite proxy so requests to `/api/*` are forwarded to the Express server running on port 5000.

\`\`\`bash
# in one terminal (backend)
cd server
npm start

# in another terminal (frontend)
npm run dev
\`\`\`

Visit http://localhost:5173 (or the port shown by Vite) to use the app.

### 6. Production build

Build the frontend with:

\`\`\`bash
npm run build
\`\`\`

You can serve the `dist/` folder with any static server. The backend can be deployed separately (e.g., Heroku, Vercel serverless functions) and the `vite.config.js` proxy removed or reconfigured.

---

## 🧩 Project Structure

\`\`\`
.
├── public/             # static assets
├── src/                # React source code
│   ├── components/     # UI components
│   ├── pages/          # routed pages
│   ├── redux/          # RTK Query API and store
│   └── assets/         # images, constants
├── server/             # Express proxy server
│   ├── server.js       # main express app
│   └── package.json
├── package.json        # client dependencies/scripts
├── vite.config.js      # dev server proxy configuration
└── README.md
\`\`\`

---

## 🔧 Common Issues

- **404 errors on `/api/search` or `/api/stream`**: ensure the backend is running and `vite.config.js` proxy is active. The client must use `/api/*` paths (not `http://localhost:5000/...`).
- **Audio playback errors**: not all SoundCloud tracks provide a `stream_url`; the server will return 404 if the track has no playable stream. Check server logs for debug output.


---

*Happy coding!*