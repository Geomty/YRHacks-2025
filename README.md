# YRHacks 2025
In The Node is a browser-based tool that allows users to recursively generate a tree of learning prerequisites from a link about a specific topic.

This project was built using Tailwind CSS, Vite, websockets, and Gemini API.
## Setup
```bash
git clone https://github.com/Geomty/YRHacks-2025
npm install
npm run dev
```
In a separate cmd:
```bash
node ./backend/ws_server.cjs
```
Set the contents of `.env` to:
```
API_KEY=YOUR_GEMINI_API_KEY
```
Then go to `localhost:1024` in your browser.
