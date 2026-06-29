import { Link } from 'react-router-dom'
import HeroAnimation from '../components/animations/HeroAnimation'

/** Grows to soak up extra space on tall screens, capped so it can never
    balloon into the huge dead gaps `justify-between` produced before. */
function Spacer({ maxH }: { maxH: string }) {
  return <div className={`flex-1 min-h-2 ${maxH}`} />
}

export default function Home() {
  return (
    <main
      className="flex-1 flex flex-col items-center px-6 py-6 text-center"
      style={{ paddingTop: 'calc(env(safe-area-inset-top) + 1.5rem)' }}
    >
      {/* Top: title + subtitle */}
      <div className="w-full max-w-sm">
        <h1 className="font-aileron font-semibold uppercase text-3xl mb-2 tracking-tight text-black">Improv</h1>
        <p className="font-mono font-light text-sm text-black tracking-wide">
          Stories written by strangers
        </p>
      </div>

      <Spacer maxH="max-h-16" />

      {/* Middle: animation */}
      <div className="w-full max-w-sm">
        <HeroAnimation />
      </div>

      <Spacer maxH="max-h-16" />

      {/* Tagline */}
      <div className="max-w-xs">
        <p className="font-mono font-light text-sm leading-relaxed mb-2 text-black">
          Write a line. Pass it on.<br />
          See what the world creates together.
        </p>
        <p className="font-mono font-light text-xs text-black/60">
          No AI, just imagination.
        </p>
      </div>

      <Spacer maxH="max-h-12" />

      {/* CTAs */}
      <div className="flex gap-2 w-full max-w-xs">
        <Link to="/start" className="btn-primary flex-1 !px-2 text-[10px] tracking-normal uppercase py-3 whitespace-nowrap">
          Start a Story
        </Link>
        <Link to="/continue" className="btn-secondary flex-1 !px-2 text-[10px] tracking-normal uppercase py-3 whitespace-nowrap">
          Continue One
        </Link>
      </div>

      <Spacer maxH="max-h-8" />

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
