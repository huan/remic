
# ReMic — Audio-only WebRTC (TURN-ready)

Minimal **audio-only** WebRTC demo tailored for realtime voice:
- Opus tuning for speech (mono, low bitrate, `ptime=10`, DTX/FEC on)
- Works on same or different networks by falling back to **TURN**
- Tiny Node.js signaling server, single static HTML client

## Quick start
```bash
npm i
npm start
# open http://localhost:3000 in two tabs/devices
```

## TURN setup (coturn)
- Install `coturn` and open UDP 3478 (plus TCP/5349 for TLS).
- In `public/index.html`, fill your TURN creds:
  ```js
  const iceServers = [
    { urls: ['stun:stun.l.google.com:19302'] },
    { urls: 'turn:YOUR_TURN_HOST:3478?transport=udp', username: 'USER', credential: 'PASS' },
    { urls: 'turn:YOUR_TURN_HOST:3478?transport=tcp', username: 'USER', credential: 'PASS' },
    { urls: 'turns:YOUR_TURN_HOST:5349', username: 'USER', credential: 'PASS' }
  ];
  ```
- On isolated/guest Wi‑Fi, host candidates are blocked; TURN ensures success.

## Opus tuning
- Mono, 48kHz, target **~16–24 kbps**.
- `ptime=10`, `useinbandfec=1`, `usedtx=1` for lower latency and bandwidth.
- SDP munging in client enforces these (see `tuneOpusSdp`).

## Why audio-only?
- Lower latency and battery.
- Fewer ICE candidates, faster connectivity.
- Ideal for ReMic's voice duplex.

## Files
```
reMic-audio-only/
├─ package.json
├─ server.js
└─ public/
   ├─ index.html
   └─ style.css
```

## OpenAI Realtime Interpretation (Experimental)

An optional audio conversion layer can now route your microphone through OpenAI's Realtime API, producing interpreted / reworded fluent English audio that is sent to the remote peer instead of your raw mic.

### Enable
1. Obtain an OpenAI API key with access to realtime preview models.
2. Create `.env` in project root:
  ```bash
  OPENAI_API_KEY=sk-...
  ```
3. `npm start` and open the app. When you click Start Call the browser will:
  - Fetch an ephemeral token from `/openai-token`.
  - Create a separate WebRTC session directly with OpenAI.
  - Send local mic upstream and receive interpreted audio downstream.
  - Substitute that audio track for the peer connection.

If anything fails (missing key, network error) it logs a warning and falls back to the original mic stream transparently.

### Prompt used
```
you are an native english simultaneous interpretation, your will interpretation as fast as possible, and rewording it in fluent english with high confidence.
```

You can edit this in `public/index.html` within `initializeRealtimeConversion`.

### Notes
- Model: `gpt-4o-realtime-preview-2024-12-17` (adjust as newer versions release).
- Voice: `verse` placeholder; change per API capabilities.
- Security: Only a short‑lived ephemeral key is exposed to the browser, never the root API key.
- Bandwidth: Two WebRTC peer connections now exist (peer <-> peer, and browser <-> OpenAI). Monitor CPU/network if on constrained devices.
