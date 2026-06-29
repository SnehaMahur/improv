import { Link } from 'react-router-dom'
import HeroAnimation from '../components/animations/HeroAnimation'

export default function Home() {
  return (
    <main
      className="flex-1 flex flex-col items-center justify-center px-6 py-6 text-center"
      style={{ paddingTop: 'calc(env(safe-area-inset-top) + 1.5rem)' }}
    >

      {/* Top: title + subtitle */}
      <div className="w-full max-w-sm">
        <h1 className="font-aileron font-semibold uppercase text-3xl mb-2 tracking-tight text-black">Improv</h1>
        <p className="font-mono font-light text-sm text-black tracking-wide">
          Stories written by strangers
        </p>
      </div>

      {/* Middle: animation */}
      <div className="w-full max-w-sm my-4">
        <HeroAnimation />
      </div>

      {/* Tagline */}
      <div className="max-w-xs mb-4">
        <p className="font-mono font-light text-sm leading-relaxed mb-2 text-black">
          Write a line. Pass it on.<br />
          See what the world creates together.
        </p>
        <p className="font-mono font-light text-xs text-black/60">
          No AI, just imagination.
        </p>
      </div>

      {/* CTAs */}
      <div className="flex gap-2 w-full max-w-xs mb-2">
        <Link to="/start" className="btn-primary flex-1 !px-2 text-[10px] tracking-normal uppercase py-3 whitespace-nowrap">
          Start a Story
        </Link>
        <Link to="/continue" className="btn-secondary flex-1 !px-2 text-[10px] tracking-normal uppercase py-3 whitespace-nowrap">
          Continue One
        </Link>
      </div>

      {/* Plain text link below CTAs */}
      <p className="font-mono font-light text-xs text-black mb-3">
        Or go to <Link to="/archive" className="underline">archive</Link>.
      </p>

      {/* Footer credit */}
      <p className="font-mono font-light text-xs text-black">
        Designed &amp; built by{' '}
        <a
          href="https://www.instagram.com/designiverse.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          @Designiverse
        </a>{' '}
        with Claude
      </p>
    </main>
  )
}
