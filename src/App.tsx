import { useEffect, useRef, useState } from 'react'
import { useTypewriter } from './hooks/useTypewriter'

function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const targetTime = useRef(0)
  const seeking = useRef(false)

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const video = videoRef.current
      if (!video || !video.duration) return

      const cursorRatio = event.clientX / window.innerWidth
      const videoRatio = 1 - cursorRatio
      targetTime.current = Math.max(0, Math.min(videoRatio * video.duration, video.duration))

      if (!seeking.current && Math.abs(video.currentTime - targetTime.current) > 0.001) {
        video.currentTime = targetTime.current
        seeking.current = true
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleSeeked = () => {
    const video = videoRef.current
    if (!video) return

    if (Math.abs(video.currentTime - targetTime.current) > 0.001) {
      video.currentTime = targetTime.current
    } else {
      seeking.current = false
    }
  }

  return (
    <video
      ref={videoRef}
      className="fixed inset-0 z-0 h-full w-full object-cover"
      style={{ objectPosition: '70% center' }}
      src="/Green_frog_turns_head_202608261141.mp4"
      muted
      playsInline
      preload="auto"
      onSeeked={handleSeeked}
    />
  )
}

function Navbar() {
  const [open, setOpen] = useState(false)
  const links = ['Esplora il lago','Vivi il Lago']

  return (
    <>
      <header className="fixed left-0 top-0 z-10 w-full px-5 py-4 sm:px-8 sm:py-5">
        <nav className="flex items-center justify-between">
          <a
            href="#"
            className="flex items-center animate-fade-in-up"
            style={{ animationDelay: '0s' }}
          >
            <img
              src="/logo-lago-fondi.svg"
              alt="Logo"
              className="h-[9.5rem] w-auto"
            />
          </a>

          <div className="hidden items-center gap-1 text-[23px] text-white md:flex">
            {links.map((link, index) => (
              <span key={link} className="inline-flex items-center">
                <a
                  href="#"
                    className="transition-opacity hover:opacity-60 hover:text-orange-800 animate-fade-in-up"
                  style={{ animationDelay: `${(index + 1) * 0.1}s` }}
                >
                  {link}
                </a>
                {index < links.length - 1 && <span className="mx-1">|</span>}
              </span>
            ))}
          </div>

          <a
            href="#"
            className="hidden bg-orange-500 rounded-full px-8 py-3 text-[23px] text-white underline underline-offset-2 transition-opacity hover:opacity-60 md:inline animate-fade-in-up"
            style={{ animationDelay: '0.5s' }}
          >
            COMPRA TICKET
          </a>

          <button
            type="button"
            className="flex flex-col gap-[5px] md:hidden animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <span
              className={`h-[2px] w-6 bg-black transition-transform duration-300 ${
                open ? 'translate-y-[7px] rotate-45' : ''
              }`}
            />
            <span
              className={`h-[2px] w-6 bg-black transition-opacity duration-300 ${
                open ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`h-[2px] w-6 bg-black transition-transform duration-300 ${
                open ? '-translate-y-[7px] -rotate-45' : ''
              }`}
            />
          </button>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-[9] flex flex-col justify-center items-start px-8 gap-8 bg-white/95 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {links.map((link) => (
          <a
            key={link}
            href="#"
            className="text-[32px] font-medium text-black transition-opacity hover:opacity-60"
          >
            {link}
          </a>
        ))}
        <a
          href="#"
          className="text-[32px] font-medium text-black underline underline-offset-2 transition-opacity hover:opacity-60"
        >
          Get in touch
        </a>
      </div>
    </>
  )
}

function Hero() {
  const fullText = 'Vivi il Lago'
  const lagoIndex = fullText.indexOf('Lago')
  const { displayed } = useTypewriter(fullText, 60, 1000)

  const whitePills = [
    'Esplora i Percorsi',
    'Vivi il Lago',
    // 'Send a brief hello',
    // 'See how we operate',
  ]

  const copyEmail = () => {
    navigator.clipboard.writeText('sim_uxui@protom.me')
  }

  const prefix = displayed.slice(0, lagoIndex)
  const lago = displayed.slice(lagoIndex)

  return (
    <section className="relative z-[1] flex h-screen flex-col justify-end overflow-hidden pb-12 px-5 sm:px-8 md:justify-center md:pb-0 md:px-10">
      <div className="relative z-10 max-w-xl">
        {/* <p
          className="pointer-events-none select-none mb-5 text-black sm:mb-6"
          style={{
            fontSize: 'clamp(18px, 4vw, 26px)',
            lineHeight: 1.3,
            fontWeight: 400,
            filter: 'blur(4px)',
          }}
        >
          Hey there, meet A.R.I.A,
          <br />
          Mainframe&apos;s Adaptive Response Interface Agent
        </p> */}

        <p
          className="mb-5 animate-fade-in-up text-white sm:mb-6 md:mb-8"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(48px, 14vw, 80px)',
            lineHeight: 1.0,
            fontWeight: 800,
            letterSpacing: '0.9rem',
            minHeight: '1.2em',
            animationDelay: '0.2s',
          }}
        >
          {prefix}
          <span
            style={{
              fontFamily: 'var(--font-accent)',
              fontStyle: 'italic',
              fontWeight: 500,
              lineHeight: 1.0,
            }}
          >
            {lago}
          </span>
          {/* {!done && (
            <span
              className="ml-[2px] inline-block h-[1.1em] w-[2px] cursor-blink bg-black align-middle"
              aria-hidden="true"
            />
          )} */}
          <p className="font-light text-xs mt-2 leading-tight animate-fade-in-up" style={{ letterSpacing: '0.3rem', fontSize: '1.50rem', fontWeight: 300, fontFamily: 'var(--font-body)', animationDelay: '0.4s' }}>Let's build something amazing together.  </p>
        </p>

        <div
          className="flex flex-wrap gap-y-1 animate-fade-in-up"
          style={{ animationDelay: '1.1s' }}
        >
          {whitePills.map((label) => (
            <button
              key={label}
              type="button"
              className="mx-[0.2em] mb-[0.4em] inline-flex items-center justify-center whitespace-nowrap rounded-full border border-black/10 bg-orange-500 px-4 py-[0.3em] text-[13px] text-black transition-colors duration-200 hover:bg-black hover:text-white sm:px-5 sm:text-[15px]"
            >
              {label}
            </button>
          ))}

          <button
            type="button"
            onClick={copyEmail}
            className="mx-[0.2em] mb-[0.4em] inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white bg-transparent px-4 py-[0.3em] text-[13px] text-white transition-colors duration-200 hover:bg-white hover:text-black sm:px-5 sm:gap-3 sm:text-[15px]"
          >
            <span>
              Reach us:{' '}
              <span className="underline underline-offset-1">sim_uxui@proton.me</span>
            </span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

function App() {
  return (
    <>
      <VideoBackground />
      <Navbar />
      <Hero />
    </>
  )
}

export default App
