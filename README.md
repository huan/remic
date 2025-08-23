# ReMic 🎙️🔊  
**Real-time bilingual conversation translator with style filters**  
YC Agents Hackathon (Aug 22–23, 2025) @ Y Combinator HQ

## Pitch (90 seconds)

Hi, I’m Huan. My mom loves making friends in the U.S., but she doesn’t speak English. Phone translators help, but they’re clunky—you lose the moment.
This is ReMic. One toggle, one button. When they speak English, my mom’s AirPods whisper Chinese in near real time. When she speaks Chinese, the phone speaks fluent English to the room.
It’s powered by realtime speech-to-speech with a twist: style filters. For this demo I’ll pick YC Pitch—confident and concise. (toggle)
Live demo: (judge speaks EN → your AirPods ZH) … (you speak ZH → phone speaks EN to the room)
That’s it. No fiddling, no passing phones back and forth. Conversations feel natural again.
We built an iOS app with low-latency streaming, bilingual routing, transcripts, and style presets—shipped in 24 hours.
Who’s it for? Immigrants, clinics, schools, and local businesses.
Why now? Realtime multimodal models finally make this feel instant.
Next: group diarization and shared phrasebooks.
ReMic brings back the human part of conversation—with one toggle and one button. Thank you.


## 🚀 Overview

**ReMic** solves a simple but painful problem:  
Immigrants struggle with in-person conversations because existing translation apps are clunky and break the flow.  

**ReMic** makes it natural again:
- One toggle, one button.  
- **When *they* speak English → Mom’s AirPods whisper Chinese.**  
- **When *she* speaks Chinese → The phone speaks fluent English to the room.**  
- Add **style filters** (e.g., *YC Pitch*, *Neutral Pro*, *Warm & Slow*) to adapt tone for different contexts.  

---

## ✨ Hackathon Narrative

- **Problem:** Existing phone translators are awkward. You pass devices back and forth, lose rhythm, and fail to connect.  
- **Insight:** People already carry an iPhone and AirPods. That’s a natural duplex channel for conversation.  
- **Solution:** ReMic enables near real-time, fluent translation with a single tap.  
- **Demo:** Two-way bilingual conversation live on stage, showing style filter output.  
- **Who benefits:** Immigrants (personal use), clinics, schools, local businesses.  
- **Why now:** Realtime multimodal models + solid iPhone audio routing + affordable cloud APIs.  

---

## 🛠️ Tech Stack

- **Client:** iOS app (Swift, AVAudioEngine, AVAudioSession)  
- **Realtime API:** OpenAI Realtime WebSocket API (speech→text→translate→speech)  
- **Audio Routing:**  
  - EN→ZH: iPhone mic → translated audio → AirPods output  
  - ZH→EN: iPhone mic → translated audio → iPhone speaker output  
- **UI:** SwiftUI single-screen interface with toggle, PTT button, style chips, transcript drawer  
- **Logging:** latency (press→first audio out), completion status  

---

## 🎨 UI / UX

**Single screen:**
- **Direction toggle** (EN→ZH vs ZH→EN)  
- **One large PTT button** (hold to capture, release to stop)  
- **Style filter chips:** YC Pitch / Neutral Pro / Warm & Slow  
- **Status strip:** Listening / Translating / Speaking, plus latency ms & connection pill  
- **Transcript drawer:** two-column (source | translated), swipe up to reveal  

Design goal: **clean, obvious, immigrant-friendly**.  

---

## 🎤 Demo Plan

1. **EN→ZH (they speak):**  
   Judge speaks English into iPhone → Mom’s AirPods speak Mandarin <1.5s later.  

2. **ZH→EN (she speaks):**  
   Mom speaks Chinese near iPhone → Phone speaker outputs fluent English.  

3. **Style filter switch:**  
   Toggle to *YC Pitch* → Same sentence is re-rendered in confident, concise “startup pitch” tone.  

4. **Transcript view:**  
   Show bilingual transcript to prove accuracy.  

---

## ⏱️ Build Timeline (Hackathon)

- **Fri 6:30–8:30** — Scaffold app, audio routing, PTT loopback  
- **Fri 8:30–11:00** — Integrate OpenAI Realtime streaming  
- **Fri 11:00–1:30** — Style presets, transcripts, polish UI  
- **Fri 1:30–2:00** — Record backup demo video  
- **Sat AM** — Edge handling (disconnects, latency logs), design polish  
- **Sat PM** — Final rehearsals, repo submission, live demo  

---

## 🔑 Style Presets (MVP)

- **YC Pitch** — Concise, confident, energetic; no hedging  
- **Neutral Pro** — Clear, natural, professional cadence  
- **Warm & Slow** — Kind tone, slower pacing, simple wording  

---

## 📱 Devices & Setup

- iPhone 13 mini (demo device)  
- 1 × AirPods (model A2564)  
- MacBook M2 (dev)  
- Network: venue Wi-Fi or fallback hotspot  

---

## 📊 Metrics

- **Latency target:** <1.5s round-trip  
- **Logging:** timestamps for press-down → first audio out  
- **Analytics (MVP):** latency, completion rate  

---

## ⚖️ Hackathon Rules Compliance

- Repo initialized **after hackathon start (6:30 PM, Aug 22)**  
- All commits public; no pre-existing code used  
- >⅔ of submission built during event  
- Public repo required for judging  
- Backup demo video recorded in case of Wi-Fi issues  

---

## 🙋 Team

![ReMic Team Members](remic-team.jpg)

- **Lead:** Huan Li (@huan) – Builder, coder, founder
- **Designer & Frontend:** Oliver Cingl - Founder, hacker, builder
- **Open roles:** 1 × Designer (UI/UX polish), optional 1 × Audio/WebRTC wrangler  

---

## 📽️ Backup Demo Video

- 90s clip showing:  
  - EN→ZH translation to AirPods  
  - ZH→EN translation to phone speaker  
  - Style filter switch (YC Pitch)  

---

## 🧭 Future Directions

- Multi-speaker diarization (group conversations)  
- User-trained voice cloning (output matches speaker’s own voice)  
- Phrasebook shortcuts for recurring use cases  
- Enterprise use cases (clinics, schools, front desk interpretation)  

---

## 📜 License

TBD

---

## 🙏 Credits

- OpenAI Realtime API  
- Anthropic, Vercel, Convex, Vapi (hackathon sponsors)  
- YC Agents Hackathon organizers  

---
