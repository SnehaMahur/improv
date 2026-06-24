import { useEffect } from 'react'

const DURATION_MS = 2600

export default function BirdDropAnimation({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, DURATION_MS)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center" style={{ backgroundColor: '#f5ede8' }}>
      <style>{`
        @keyframes bird-fly {
          0%   { transform: translate(-90px, -10px); }
          55%  { transform: translate(70px, -40px); }
          70%  { transform: translate(70px, -40px); }
          100% { transform: translate(180px, -70px); opacity: 0; }
        }
        @keyframes bird-flap {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-18deg); }
        }
        @keyframes paper-carry {
          0%   { transform: translate(-90px, 20px) rotate(-4deg); opacity: 1; }
          55%  { transform: translate(70px, 28px) rotate(-4deg); opacity: 1; }
          70%  { transform: translate(70px, 70px) rotate(8deg); opacity: 1; }
          85%  { transform: translate(70px, 92px) rotate(2deg); opacity: 1; }
          100% { transform: translate(70px, 92px) rotate(2deg); opacity: 0; }
        }
        @keyframes lid-close {
          0%, 65%   { transform: rotate(-28deg); }
          85%, 100% { transform: rotate(0deg); }
        }
        @keyframes fade-in {
          from { opacity: 0; } to { opacity: 1; }
        }
      `}</style>

      <svg viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg" className="w-64" style={{ animation: 'fade-in 0.3s ease' }}>
        {/* Archive box */}
        <g transform="translate(150, 130)">
          <rect x="-40" y="0" width="80" height="55" fill="white" stroke="black" strokeWidth="1.8" />
          <line x1="-40" y1="22" x2="40" y2="22" stroke="black" strokeWidth="1.2" opacity="0.4" />
          {/* lid */}
          <g style={{ transformOrigin: '-40px 0px', animation: 'lid-close 2.6s ease forwards' }}>
            <rect x="-40" y="-6" width="80" height="6" fill="white" stroke="black" strokeWidth="1.8" />
          </g>
        </g>

        {/* Bird carrying the paper */}
        <g style={{ animation: 'bird-fly 2.6s ease forwards' }}>
          <g transform="translate(150, 90)">
            {/* wing */}
            <path
              d="M -2 0 Q -22 -14 -34 2 Q -16 -2 -2 6 Z"
              fill="black"
              style={{ transformOrigin: '-2px 0px', animation: 'bird-flap 0.5s ease-in-out infinite' }}
            />
            {/* body */}
            <path d="M -18 4 Q 0 -10 20 -2 Q 14 2 16 6 L 8 6 Q 2 12 -10 10 Q -16 9 -18 4 Z" fill="black" />
            {/* beak */}
            <path d="M 18 -3 L 27 -1 L 18 2 Z" fill="black" />
            {/* eye */}
            <circle cx="10" cy="-3" r="1.3" fill="white" />
          </g>
        </g>

        {/* Paper / story being carried */}
        <g style={{ animation: 'paper-carry 2.6s ease forwards' }}>
          <g transform="translate(150, 90)">
            <rect x="-10" y="0" width="22" height="16" fill="white" stroke="black" strokeWidth="1.4" />
            <line x1="-7" y1="5" x2="9" y2="5" stroke="black" strokeWidth="1" opacity="0.5" />
            <line x1="-7" y1="9" x2="6" y2="9" stroke="black" strokeWidth="1" opacity="0.5" />
          </g>
        </g>
      </svg>

      <p className="font-mono font-light text-xs text-black/50 mt-4">Tucking your story into the archive…</p>
    </div>
  )
}
