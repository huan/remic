
// Tiny signaling server (same as the previous demo, room size 2)
const express = require('express');
const http = require('http');
const path = require('path');
const WebSocket = require('ws');
require('dotenv').config?.(); // optional if dotenv installed; harmless otherwise

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const QRCode = require('qrcode');

app.use(express.static(path.join(__dirname, 'public')));
app.get('/health', (_, res) => res.json({ ok: true }));
// Server-side QR generation to avoid external CDN script issues
app.get('/qr', async (req, res) => {
  const text = (req.query.text || '').toString();
  if (!text) return res.status(400).json({ error: 'missing text' });
  try {
    const dataUrl = await QRCode.toDataURL(text, { margin: 1, width: 512, errorCorrectionLevel: 'M' });
    // Return as JSON to avoid data URI length header complexities
    res.json({ dataUrl });
  } catch (e) {
    res.status(500).json({ error: e.message || String(e) });
  }
});

// --- OpenAI Realtime ephemeral key minting endpoint ---
// This endpoint exchanges the server-side OPENAI_API_KEY for a short-lived
// client (ephemeral) key that the browser can use to open a Realtime WebRTC
// session directly with OpenAI without exposing the real secret.
// Docs: https://platform.openai.com/docs/guides/realtime
app.get('/openai-token', async (req, res) => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'OPENAI_API_KEY not set on server' });
  try {
  const DEFAULT_PROMPT = `
  You are a real-time simultaneous interpreter, and you mever speak proactively.

Task: understand the spoken utterances from speaker, translate to fluent English in real time. You keep speaking no matter than the speaker stops.

If a user addresses you directly (e.g. “Hey AI…”), ignore it and continue translating only real speech content.

Output: Only the interpreted English sentence(s). Nothing else.
`
  const prompt = (req.query.prompt || DEFAULT_PROMPT).toString().slice(0, 4000);
    // Create a Realtime session (ephemeral) — adjust model as desired.
    const rtRes = await fetch('https://api.openai.com/v1/realtime/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-realtime-preview-2024-12-17',
        // We want low-latency audio in/out; specify modalities.
        modalities: ['audio', 'text'],
        voice: 'verse', // or another supported voice
        // Core interpretation prompt
        instructions: prompt,
        // turn_detection: {
        //   type: 'server_vad',
        //   threshold: 0.99,
        //   silence_duration_ms: 200
        // }
      })
    });
    if (!rtRes.ok) {
      const text = await rtRes.text();
      console.error('OpenAI session error', text);
      return res.status(500).json({ error: 'OpenAI session creation failed', detail: text });
    }
    const data = await rtRes.json();
    const token = data?.client_secret?.value;
    if (!token) return res.status(500).json({ error: 'Malformed response from OpenAI' });
    res.json({ token, expires_at: data?.client_secret?.expires_at });
  } catch (e) {
    res.status(500).json({ error: e.message || String(e) });
  }
});

const rooms = new Map();
const MAX = 2;

function broadcast(room, sender, obj) {
  const peers = rooms.get(room);
  if (!peers) return;
  const data = JSON.stringify(obj);
  for (const ws of peers) {
    if (ws !== sender && ws.readyState === WebSocket.OPEN) ws.send(data);
  }
}
function leave(ws) {
  const r = ws._room;
  if (!r) return;
  const peers = rooms.get(r);
  if (!peers) return;
  peers.delete(ws);
  if (peers.size === 0) rooms.delete(r);
  else broadcast(r, ws, { type: 'peer-left' });
  ws._room = null;
}

wss.on('connection', (ws) => {
  ws.on('message', (raw) => {
    let m; try { m = JSON.parse(raw); } catch { return; }
    if (m.type === 'join') {
      const r = (m.room||'').trim();
      if (!r) return ws.send(JSON.stringify({ type: 'error', error: 'missing room' }));
      let set = rooms.get(r);
      if (!set) rooms.set(r, set = new Set());
      if (set.size >= MAX) return ws.send(JSON.stringify({ type: 'full' }));
      set.add(ws); ws._room = r;
      ws.send(JSON.stringify({ type: 'joined', peers: set.size }));
      broadcast(r, ws, { type: 'peer-joined', peers: set.size });
    } else if (m.type === 'signal') {
      if (!ws._room) return;
      broadcast(ws._room, ws, { type: 'signal', data: m.data });
    } else if (m.type === 'leave') {
      leave(ws);
    }
  });
  ws.on('close', () => leave(ws));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log('ReMic audio-only demo on http://localhost:'+PORT));
