# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ReMic is a real-time bilingual conversation translator built as a Progressive Web App (PWA). It enables two people to have natural conversations in different languages through near-real-time voice translation with configurable style filters (YC Pitch, Neutral Pro, Warm & Slow).

Built for the YC Agents Hackathon (Aug 22-23, 2024), the project pivoted from a native iOS app to a web-first PWA architecture for instant distribution without app store approval.

## Development Commands

### Frontend (Next.js App)
```bash
npm install          # Install dependencies
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Build production bundle
npm start            # Start production server
npm run lint         # Run ESLint checks
```

### WebSocket Server
```bash
cd ws-server
npm install          # Install WebSocket server dependencies
npm start            # Start WebSocket server (port 8080)
```

## Architecture Overview

The application consists of three main components:

### 1. Frontend (Next.js 14 + React 18)
- **Location**: `/src/app/`
- **Framework**: Next.js App Router with TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **PWA Features**: Web App Manifest + Service Worker for native-like installation

### 2. WebSocket Server
- **Location**: `/ws-server/`
- **Runtime**: Node.js with ES modules
- **Purpose**: Handles session pairing, presence, and language synchronization
- **Protocol**: Simple WebSocket messaging for real-time state sync

### 3. Real-time Translation Pipeline
- **Audio Capture**: Web Audio API + MediaDevices getUserMedia
- **Translation**: OpenAI Realtime API integration (planned)
- **Audio Output**: Browser's native audio routing (AirPods/speakers)

## Key Application Flow

1. **Session Creation**: User creates conversation → generates short ID + QR code
2. **Session Joining**: Second user scans QR → both join WebSocket room
3. **Language Selection**: Each user picks their language → synchronized via WebSocket
4. **Translation**: Push-to-talk captures audio → streams to AI model → plays translated audio
5. **Style Filtering**: Configurable tone presets affect translation output

## File Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Landing page with marketing content
│   ├── app/page.tsx       # Main app interface
│   ├── conversation/[id]/ # Conversation room pages
│   ├── join-conversation/ # QR scanning/join flow
│   └── start-conversation/ # Session creation flow
├── components/ui/         # shadcn/ui components (Button, etc.)
└── lib/
    ├── socket.tsx         # WebSocket context provider
    └── utils.ts           # Utility functions

ws-server/
├── server.js             # WebSocket server implementation
├── package.json          # Server dependencies
└── Dockerfile            # Container configuration for deployment

public/
├── bg.jpg                # Background image
├── remic-logo.png        # App logo
└── *.html                # Static landing page iterations
```

## WebSocket Message Protocol

The WebSocket server handles these message types:

- `join`: Join a conversation room
  ```json
  { "type": "join", "payload": { "room": "ABC123" } }
  ```

- `set-language`: Broadcast language selection
  ```json
  { "type": "set-language", "payload": { "language": "en" } }
  ```

- `user-joined`: Notifies room when users connect
- `peer-language`: Broadcasts other user's language selection

## State Management

- **Client State**: React Context (`SocketProvider`) manages WebSocket connection and room state
- **Local Storage**: Persists language selections and host status per conversation
- **Server State**: In-memory room management with automatic cleanup

## Development Environment

- **Node.js**: Required for both frontend and WebSocket server
- **Browser Requirements**: Modern browsers with WebRTC, Web Audio API, and PWA support
- **Network**: WebSocket server typically runs on `ws://localhost:8080`
- **Environment Variables**: `NEXT_PUBLIC_WS_URL` for WebSocket server URL

## Key Technologies

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Real-time Communication**: WebSocket (ws library), planned OpenAI Realtime API
- **Audio Processing**: Web Audio API, MediaDevices API
- **PWA**: Web App Manifest, Service Worker for installability
- **UI Components**: Radix UI + class-variance-authority for accessible components
- **QR Codes**: qrcode + jsqr libraries for session pairing

## Deployment Architecture

- **Frontend**: Vercel deployment (Next.js optimized)
- **WebSocket Server**: Fly.io deployment (see `ws-server/fly.toml`)
- **Domain**: Production planned for `remic.app`

## Important Development Notes

- The project was built rapidly during a 24-hour hackathon, so code prioritizes speed over perfect organization
- Audio translation features are partially implemented - WebSocket infrastructure is complete
- The app currently shows mock conversation data; real-time translation integration is the next major milestone
- PWA installation prompts and offline functionality are basic implementations