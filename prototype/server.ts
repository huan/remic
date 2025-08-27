// Node 18+ (uses global fetch). Minimal endpoints:
//  - POST /api/log           : capture client logs
//  - GET  /api/speech-token  : STS token for Speech SDK (STT/TTS)
//  - GET  /api/realtime/ephemeral : mint Realtime ephemeral key for browser WebRTC

import 'dotenv/config';
import express from 'express';
import { readFileSync } from 'node:fs';
// server.ts

const app = express();
app.use(express.json({ limit: '1mb' }));

// ---- Config (set via env)
const PORT = Number(process.env.PORT || 8787);

// Azure OpenAI (Realtime)
const AOAI_ENDPOINT = process.env.AZURE_OPENAI_ENDPOINT!; // e.g. https://remic-openai.openai.azure.com
const AOAI_KEY = process.env.AZURE_OPENAI_API_KEY!;
const AOAI_DEPLOYMENT = process.env.AZURE_OPENAI_REALTIME_DEPLOYMENT || 'gpt-4o-mini-realtime-preview';
const AOAI_API_VERSION = process.env.AZURE_OPENAI_API_VERSION || '2025-04-01-preview';
// IMPORTANT: Realtime WebRTC lives at region.realtimeapi-preview.ai.azure.com (eastus2 / swedencentral)
const AOAI_REALTIME_REGION = process.env.AZURE_OPENAI_REALTIME_REGION || 'eastus2'; // <- set to eastus2 or swedencentral

// Azure Speech (STS token for JS SDK)
const SPEECH_KEY = process.env.SPEECH_KEY!;
const SPEECH_REGION = process.env.SPEECH_REGION!; // e.g. westus3

// ---- Logging (browser → server)
app.post('/api/log', (req, res) => {
  // In real life, push to a proper log sink. For MVP, just print.
  console.log('[client-log]', JSON.stringify(req.body));
  res.json({ ok: true });
});

// ---- Speech STS token (for JS SDK in browser)
app.get('/api/speech-token', async (_req, res) => {
  try {
    const url = `https://${SPEECH_REGION}.api.cognitive.microsoft.com/sts/v1.0/issueToken`;
    const r = await fetch(url, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': SPEECH_KEY,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    if (!r.ok) throw new Error(await r.text());
    const token = await r.text();
    res.json({ token, region: SPEECH_REGION });
  } catch (err: any) {
    console.error('speech-token error', err);
    res.status(500).json({ error: String(err) });
  }
});

// ---- Mint Realtime ephemeral key (browser uses this to auth WebRTC)
// Docs: POST {resource}/openai/realtimeapi/sessions?api-version=2025-04-01-preview
// Body: { "model": "<deployment>" } → returns client_secret.value (ephemeral key ~1 minute)
app.get('/api/realtime/ephemeral', async (_req, res) => {
  try {
    // Guard region (WebRTC endpoint lives only in specific regions)
    const okRegion = ['eastus2', 'swedencentral'].includes(AOAI_REALTIME_REGION.toLowerCase());
    if (!okRegion) {
      return res.status(400).json({
        error: `AOAI_REALTIME_REGION must be eastus2 or swedencentral for WebRTC (got "${AOAI_REALTIME_REGION}").`
      });
    }

    const sessionsUrl =
      `${AOAI_ENDPOINT.replace(/\/$/, '')}/openai/realtimeapi/sessions?api-version=${AOAI_API_VERSION}`;
    const resp = await fetch(sessionsUrl, {
      method: 'POST',
      headers: {
        'api-key': AOAI_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: AOAI_DEPLOYMENT,
        // voice: 'none', // we're text-only; we’ll set modalities on session.update
      })
    });
    if (!resp.ok) throw new Error(`${resp.status} ${resp.statusText}: ${await resp.text()}`);

    const json = await resp.json();
    const ephemeralKey = json?.client_secret?.value;
    if (!ephemeralKey) throw new Error('No ephemeral key returned');

    const webrtcUrl = `https://${AOAI_REALTIME_REGION}.realtimeapi-preview.ai.azure.com/v1/realtimertc`;
    const result = { ephemeralKey, webrtcUrl }
    console.log(result)
    res.json(result);
  } catch (err: any) {
    console.error('ephemeral error', err);
    res.status(500).json({ error: String(err) });
  }
});

app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.get('/', (_req, res) => {
  const html = readFileSync('./index.html')
    res.send(html.toString());
});

app.listen(PORT, () => {
  console.log(`ReMic MVP server on http://localhost:${PORT}`);
  console.log(`Realtime sessions via ${AOAI_ENDPOINT}/openai/realtimeapi/sessions?api-version=${AOAI_API_VERSION}`);
  console.log(`WebRTC region: ${AOAI_REALTIME_REGION} (must be eastus2 or swedencentral)`);
});