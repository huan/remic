import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ReMic — Near-Real-Time In-Person Translation with One Toggle & One Button',
  description: 'ReMic lets two people speak naturally across languages. One toggle, one button: near-real-time voice-to-voice translation with tone presets like \'YC Pitch\' or \'Warm & Slow\'.',
  themeColor: '#1f2937',
}

export default function Home() {
  return (
    <>
      <div className="w-full bg-gray-900 text-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-2 text-center text-sm">
          <strong>Early Access:</strong> Limited TestFlight seats for YC Hackathon demo. <a href="#cta" className="underline decoration-2 underline-offset-2">Join now →</a>
        </div>
      </div>

      {/* Navbar */}
      <header className="border-b border-gray-200 sticky top-0 z-40 bg-white/90 backdrop-blur">
        <nav className="mx-auto max-w-7xl px-4">
          <div className="flex h-16 items-center justify-between">
            <a href="#" className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gray-900 text-white">R</span>
              <span className="text-lg font-semibold">ReMic</span>
            </a>
            <div className="hidden md:flex items-center gap-8">
              <a href="#how" className="text-sm hover:text-gray-700">How it works</a>
              <a href="#features" className="text-sm hover:text-gray-700">Features</a>
              <a href="#proof" className="text-sm hover:text-gray-700">Proof</a>
              <a href="#faq" className="text-sm hover:text-gray-700">FAQ</a>
              <a href="/app" className="text-sm hover:text-gray-700">Try App</a>
              <a href="#cta" className="inline-flex items-center rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">Get Early Access</a>
            </div>
            <button data-collapse-toggle="mobile-menu" type="button" className="md:hidden inline-flex items-center rounded-lg p-2 text-gray-700 hover:bg-gray-100" aria-controls="mobile-menu" aria-expanded="false">
              <span className="sr-only">Open menu</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 5h14a1 1 0 110 2H3a1 1 0 010-2zm0 4h14a1 1 0 110 2H3a1 1 0 010-2zm0 4h14a1 1 0 110 2H3a1 1 0 010-2z" clipRule="evenodd"/></svg>
            </button>
          </div>
          <div className="hidden" id="mobile-menu">
            <ul className="space-y-2 pb-4 pt-2">
              <li><a href="#how" className="block rounded-lg px-3 py-2 hover:bg-gray-100">How it works</a></li>
              <li><a href="#features" className="block rounded-lg px-3 py-2 hover:bg-gray-100">Features</a></li>
              <li><a href="#proof" className="block rounded-lg px-3 py-2 hover:bg-gray-100">Proof</a></li>
              <li><a href="#faq" className="block rounded-lg px-3 py-2 hover:bg-gray-100">FAQ</a></li>
              <li><a href="/app" className="block rounded-lg px-3 py-2 hover:bg-gray-100">Try App</a></li>
              <li><a href="#cta" className="block rounded-lg bg-gray-900 px-3 py-2 text-white hover:bg-gray-800">Get Early Access</a></li>
            </ul>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-20">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
                Speak naturally across languages.<br/>
                <span className="text-gray-600">One toggle. One button.</span>
              </h1>
              <p className="mt-5 text-lg text-gray-600">
                ReMic turns in-person conversations into near-real-time, voice-to-voice translation. You wear AirPods. They hold your iPhone. Tap to talk—both sides hear fluent speech in ~1–2 seconds.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a href="#cta" className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-5 py-3 text-white font-medium hover:bg-gray-800">Get TestFlight</a>
                <button data-modal-target="demo-modal" data-modal-toggle="demo-modal" className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-3 font-medium hover:bg-gray-50">
                  ▶︎ Watch 30-sec Demo
                </button>
              </div>
              <div className="mt-6 flex items-center gap-6 text-sm text-gray-500">
                <div><span className="font-semibold text-gray-900" data-countup data-target="1500">0</span> ms typical first-audio</div>
                <div>Style presets: YC Pitch · Neutral · Warm & Slow</div>
              </div>
            </div>

            {/* Visual / Phone card */}
            <div className="relative">
              <div className="glass rounded-3xl border border-gray-200 p-6 shadow-xl">
                <div className="mx-auto w-full max-w-sm rounded-2xl border border-gray-200 p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-lg bg-gray-900 text-white grid place-items-center">R</div>
                      <div className="font-semibold">ReMic</div>
                    </div>
                    <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs text-green-800">
                      <span className="h-2 w-2 rounded-full bg-green-500"></span> Connected • 620ms
                    </span>
                  </div>
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <button className="rounded-xl bg-gray-900 px-3 py-4 text-white">
                      EN → ZH<br/><span className="text-xs text-gray-300">他们说给我听</span>
                    </button>
                    <button className="rounded-xl bg-gray-100 px-3 py-4">
                      ZH → EN<br/><span className="text-xs text-gray-500">我说给TA听</span>
                    </button>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                    <span className="rounded-full border px-3 py-1 text-center">YC Pitch</span>
                    <span className="rounded-full border px-3 py-1 text-center bg-gray-900 text-white">Neutral</span>
                    <span className="rounded-full border px-3 py-1 text-center">Warm & Slow</span>
                  </div>
                  <button className="mt-6 w-full rounded-full bg-gray-900 py-4 text-white font-semibold">Hold to Translate</button>
                  <div className="mt-4 text-xs text-gray-500">
                    Transcript:
                    <div className="mt-2 space-y-1">
                      <div className="flex justify-between"><span>EN:</span><span className="max-w-[70%] truncate">Welcome! Can I help you?</span></div>
                      <div className="flex justify-between"><span>ZH:</span><span className="max-w-[70%] truncate">欢迎光临，我能帮您吗？</span></div>
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-center text-sm text-gray-500">One screen. One button. Real conversation.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="border-y border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-80">
            <img src="https://dummyimage.com/100x24/cccccc/ffffff&text=YC+Hackathon" className="h-6" alt="YC Hackathon" />
            <img src="https://dummyimage.com/100x24/cccccc/ffffff&text=OpenAI+Realtime" className="h-6" alt="OpenAI Realtime" />
            <img src="https://dummyimage.com/100x24/cccccc/ffffff&text=Swift+AVAudio" className="h-6" alt="Swift AVAudio" />
            <img src="https://dummyimage.com/100x24/cccccc/ffffff&text=WebRTC" className="h-6" alt="WebRTC" />
            <img src="https://dummyimage.com/100x24/cccccc/ffffff&text=GitHub" className="h-6" alt="GitHub" />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-7xl px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight">How ReMic works</h2>
          <p className="mt-3 text-gray-600">A natural duplex channel: you wear AirPods, they hold your iPhone. Tap to talk—each side hears fluent speech in their language.</p>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 p-6">
            <div className="mb-3 h-10 w-10 rounded-lg bg-gray-900 text-white grid place-items-center">1</div>
            <h3 className="font-semibold">Pick direction</h3>
            <p className="mt-2 text-gray-600">EN→ZH or ZH→EN. Clear labels: <em>他们说给我听</em> / <em>我说给TA听</em>.</p>
          </div>
          <div className="rounded-2xl border border-gray-200 p-6">
            <div className="mb-3 h-10 w-10 rounded-lg bg-gray-900 text-white grid place-items-center">2</div>
            <h3 className="font-semibold">Hold to translate</h3>
            <p className="mt-2 text-gray-600">PTT captures speech and streams to realtime AI. First audio in ~700–1500ms.</p>
          </div>
          <div className="rounded-2xl border border-gray-200 p-6">
            <div className="mb-3 h-10 w-10 rounded-lg bg-gray-900 text-white grid place-items-center">3</div>
            <h3 className="font-semibold">Hear fluent output</h3>
            <p className="mt-2 text-gray-600">Phone speaker to the room; AirPods to the wearer. Optional style presets shape tone.</p>
          </div>
        </div>
      </section>

      {/* Benefits / Features */}
      <section id="features" className="bg-gray-50 border-y border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold">Why people love it</h2>
              <ul className="mt-6 space-y-4 text-gray-700">
                <li className="flex gap-3"><span className="mt-1 h-5 w-5 rounded-full bg-gray-900 text-white grid place-items-center">✓</span><span><strong>Feels human.</strong> No phone-passing or awkward delays—conversations stay in flow.</span></li>
                <li className="flex gap-3"><span className="mt-1 h-5 w-5 rounded-full bg-gray-900 text-white grid place-items-center">✓</span><span><strong>Near-real-time.</strong> First words under ~1s in good conditions; full sentence &lt; 2s typical.</span></li>
                <li className="flex gap-3"><span className="mt-1 h-5 w-5 rounded-full bg-gray-900 text-white grid place-items-center">✓</span><span><strong>Style presets.</strong> YC Pitch, Neutral Pro, or Warm & Slow—make speech fit the moment.</span></li>
                <li className="flex gap-3"><span className="mt-1 h-5 w-5 rounded-full bg-gray-900 text-white grid place-items-center">✓</span><span><strong>One screen UI.</strong> Big PTT, clear direction, simple status—ready for anyone.</span></li>
                <li className="flex gap-3"><span className="mt-1 h-5 w-5 rounded-full bg-gray-900 text-white grid place-items-center">✓</span><span><strong>Built for real life.</strong> Clinics, shops, schools, neighbors—help people connect.</span></li>
              </ul>
            </div>
            <div className="rounded-3xl border border-gray-200 bg-white p-6">
              <h3 className="font-semibold">Live stats (demo)</h3>
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="rounded-xl border p-4 text-center">
                  <div className="text-2xl font-bold" data-countup data-target="620">0</div>
                  <div className="mt-1 text-xs text-gray-500">ms first-audio</div>
                </div>
                <div className="rounded-xl border p-4 text-center">
                  <div className="text-2xl font-bold" data-countup data-target="2">0</div>
                  <div className="mt-1 text-xs text-gray-500">voices (EN⇄ZH)</div>
                </div>
                <div className="rounded-xl border p-4 text-center">
                  <div className="text-2xl font-bold" data-countup data-target="3">0</div>
                  <div className="mt-1 text-xs text-gray-500">style presets</div>
                </div>
              </div>
              <div className="mt-6 rounded-xl bg-gray-50 p-4 text-sm text-gray-600">
                <p className="font-medium text-gray-900">Founder story</p>
                ReMic started so my mom could chat with neighbors and cashiers—without friction. If it helps her, it helps millions.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proof / Demo */}
      <section id="proof" className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold">See it in action</h2>
            <p className="mt-3 text-gray-600">We&apos;ll demo live: EN→ZH to AirPods, then ZH→EN to room speakers. Flip styles on the fly—try &ldquo;YC Pitch.&rdquo;</p>
            <div className="mt-6 flex gap-3">
              <button data-modal-target="demo-modal" data-modal-toggle="demo-modal" className="inline-flex items-center rounded-lg bg-gray-900 px-5 py-3 text-white font-medium hover:bg-gray-800">▶︎ Play Demo</button>
              <a href="#" className="inline-flex items-center rounded-lg border border-gray-300 px-5 py-3 font-medium hover:bg-gray-50">View GitHub</a>
            </div>
            <ul className="mt-6 space-y-2 text-sm text-gray-600">
              <li>• Built with Swift + AVAudioEngine + realtime AI</li>
              <li>• Optimized for sub-1.5s round-trip</li>
              <li>• Fails soft to streaming ASR + TTS if needed</li>
            </ul>
          </div>
          <div className="relative">
            <div className="aspect-video w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 grid place-items-center">
              <button data-modal-target="demo-modal" data-modal-toggle="demo-modal" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 shadow">
                ▶︎ Watch 30-sec Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing / CTA */}
      <section id="cta" className="border-y border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-8">
              <h3 className="text-2xl font-bold">Join Early Access</h3>
              <p className="mt-2 text-gray-600">Be the first to try ReMic. We&apos;re prioritizing families, clinics, schools, and local shops.</p>
              <form className="mt-6 space-y-4" action="mailto:huan@chatie.io" method="post" encType="text/plain">
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900">Email</label>
                  <input required id="email" name="email" type="email" className="block w-full rounded-lg border border-gray-300 p-2.5 focus:border-gray-900 focus:ring-gray-900" placeholder="you@example.com" />
                </div>
                <div>
                  <label htmlFor="use" className="mb-2 block text-sm font-medium text-gray-900">How will you use ReMic?</label>
                  <input id="use" name="use" type="text" className="block w-full rounded-lg border border-gray-300 p-2.5" placeholder="e.g., Mom & neighbors, clinic intake, school office…" />
                </div>
                <button type="submit" className="w-full rounded-lg bg-gray-900 px-5 py-3 text-white font-medium hover:bg-gray-800">Request TestFlight</button>
                <p className="text-xs text-gray-500">No spam. We&apos;ll email a TestFlight link if selected.</p>
              </form>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-8">
              <h3 className="text-2xl font-bold">Try the App</h3>
              <p className="mt-2 text-gray-600">Experience the ReMic interface and functionality.</p>
              <div className="mt-6 flex items-end gap-2">
                <div className="text-4xl font-extrabold">Live</div>
                <div className="mb-1 text-sm text-gray-500">demo</div>
              </div>
              <ul className="mt-6 space-y-3 text-gray-700">
                <li className="flex gap-2"><span>✓</span> Interactive interface</li>
                <li className="flex gap-2"><span>✓</span> Start conversations</li>
                <li className="flex gap-2"><span>✓</span> Join conversations</li>
                <li className="flex gap-2"><span>✓</span> Real-time demo</li>
              </ul>
              <a href="/app" className="mt-8 inline-flex w-full items-center justify-center rounded-lg bg-gray-900 px-5 py-3 font-medium text-white hover:bg-gray-800">Go to App</a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section id="faq" className="mx-auto max-w-7xl px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold">FAQ</h2>
          <p className="mt-3 text-gray-600">Short, honest answers. Ask more on X.</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 p-6">
            <h3 className="font-semibold">Is it really &ldquo;real-time&rdquo;?</h3>
            <p className="mt-2 text-gray-600">We optimize for first audible words under ~700–1500ms and typical full sentence under ~2s with good network.</p>
          </div>
          <div className="rounded-2xl border border-gray-200 p-6">
            <h3 className="font-semibold">Which languages?</h3>
            <p className="mt-2 text-gray-600">MVP focuses on English⇄Chinese. More languages are planned based on demand.</p>
          </div>
          <div className="rounded-2xl border border-gray-200 p-6">
            <h3 className="font-semibold">Do I need AirPods?</h3>
            <p className="mt-2 text-gray-600">Recommended for the wearer&apos;s private audio. The iPhone speaker covers the other side.</p>
          </div>
          <div className="rounded-2xl border border-gray-200 p-6">
            <h3 className="font-semibold">Will it work at the clinic or a shop?</h3>
            <p className="mt-2 text-gray-600">Yes—the pattern is ideal: staff hold the phone; visitor wears AirPods. Tap to talk, no phone-passing.</p>
          </div>
        </div>
      </section>

      {/* Founder note */}
      <section className="bg-gray-50 border-y border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <h2 className="text-3xl font-bold">Why we&apos;re building ReMic</h2>
              <p className="mt-3 text-gray-600">My mom loves making friends in the U.S., but English is hard. Phone translators are clunky—you lose the moment. ReMic gives the moment back.</p>
              <div className="mt-6 flex gap-3">
                <a href="#" className="inline-flex items-center rounded-lg bg-gray-900 px-5 py-3 text-white font-medium hover:bg-gray-800">Get TestFlight</a>
                <a href="https://twitter.com/huan2024" target="_blank" className="inline-flex items-center rounded-lg border border-gray-300 px-5 py-3 font-medium hover:bg-gray-50">DM on X</a>
              </div>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <p className="text-sm text-gray-600">&ldquo;This lets my mom chat with any neighbor, cashier, or doctor—without friction. If it works for her, it&apos;ll work for millions.&rdquo;</p>
              <div className="mt-4 flex items-center gap-3">
                <img src="https://dummyimage.com/48x48/ddd/fff&text=H" className="h-12 w-12 rounded-full" alt="Huan" />
                <div>
                  <div className="font-semibold">Huan Li</div>
                  <div className="text-xs text-gray-500">Creator of Wechaty • GitHub Star</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex flex-col-reverse items-center justify-between gap-6 md:flex-row">
          <p className="text-sm text-gray-500">© <span id="year"></span> ReMic. All rights reserved.</p>
          <div className="flex items-center gap-5 text-sm">
            <a href="#" className="hover:text-gray-700">GitHub</a>
            <a href="https://twitter.com/huan2024" target="_blank" className="hover:text-gray-700">X / Twitter</a>
            <a href="#faq" className="hover:text-gray-700">FAQ</a>
          </div>
        </div>
      </footer>

      {/* Mobile sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/90 backdrop-blur md:hidden">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <a href="#cta" className="block w-full rounded-lg bg-gray-900 px-5 py-3 text-center font-medium text-white">Get TestFlight</a>
        </div>
      </div>

      {/* Demo Modal */}
      <div id="demo-modal" tabIndex={-1} aria-hidden="true" className="fixed inset-0 z-50 hidden items-center justify-center bg-black/70 p-4">
        <div className="relative w-full max-w-3xl rounded-2xl bg-white shadow-lg">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <h3 className="text-lg font-semibold">ReMic — 30-sec Demo</h3>
            <button type="button" className="text-gray-400 hover:text-gray-600" data-modal-hide="demo-modal">✕</button>
          </div>
          <div className="p-4">
            <video id="demoVideo" className="h-auto w-full rounded-lg" muted playsInline controls>
              <source src="demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="flex items-center justify-end gap-3 border-t px-4 py-3">
            <button data-modal-hide="demo-modal" className="rounded-lg border px-4 py-2 hover:bg-gray-50">Close</button>
            <a href="#cta" className="rounded-lg bg-gray-900 px-4 py-2 text-white hover:bg-gray-800">Get TestFlight</a>
          </div>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{
        __html: `
          // Simple count-up for KPIs
          document.addEventListener('DOMContentLoaded', () => {
            const els = document.querySelectorAll('[data-countup]');
            const io = new IntersectionObserver((entries) => {
              entries.forEach(e => {
                if (e.isIntersecting) {
                  const el = e.target;
                  const target = +el.dataset.target;
                  const dur = 900;
                  const start = performance.now();
                  const step = (t) => {
                    const p = Math.min(1, (t - start) / dur);
                    el.textContent = Math.floor(p * target).toLocaleString();
                    if (p < 1) requestAnimationFrame(step);
                  };
                  requestAnimationFrame(step);
                  io.unobserve(el);
                }
              });
            }, { threshold: 0.4 });
            els.forEach(el => io.observe(el));
          });

          // Play/pause video with modal open/close
          const modal = document.getElementById('demo-modal');
          const video = document.getElementById('demoVideo');
          document.querySelectorAll('[data-modal-toggle="demo-modal"]').forEach(btn=>{
            btn.addEventListener('click',()=> setTimeout(()=>{ video?.play?.(); }, 250));
          });
          document.querySelectorAll('[data-modal-hide="demo-modal"]').forEach(btn=>{
            btn.addEventListener('click',()=> { video?.pause?.(); video.currentTime = 0; });
          });
          document.getElementById('year').textContent = new Date().getFullYear();
        `
      }} />
    </>
  )
}
