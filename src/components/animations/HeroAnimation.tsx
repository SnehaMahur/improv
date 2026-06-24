function Star({ d, delay }: { d: string; delay: string }) {
  return (
    <g style={{ animation: 'hero-twinkle 2.6s ease-in-out infinite', animationDelay: delay }}>
      <path d={d} fill="black" stroke="none" />
    </g>
  )
}

function Phone({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x={-19} y={-35} width={38} height={70} rx={8} fill="black" stroke="black" strokeWidth="2" />
      <line x1={-11} y1={-17} x2={11} y2={-17} stroke="white" strokeWidth="1.2" opacity="0.55" />
      <line x1={-11} y1={-9} x2={7} y2={-9} stroke="white" strokeWidth="1.2" opacity="0.55" />
      <rect x={-5} y={26} width={10} height={2.6} rx={1.3} fill="white" opacity="0.6" />
    </g>
  )
}

export default function HeroAnimation() {
  return (
    <div className="select-none">
      <style>{`
        /* Pure opacity blink — stars never move or change size, just fade in and out in place. */
        @keyframes hero-twinkle {
          0%, 100% { opacity: 0.15; }
          50%      { opacity: 1; }
        }
        @keyframes hero-sleep-breathe {
          0%, 100% { transform: scale(1, 1); }
          50%      { transform: scale(1.02, 0.98); }
        }
        .hero-orbit-1 {
          offset-path: path('M330,150 C330,196.9 271.8,235 200,235 C128.2,235 70,196.9 70,150 C70,103.1 128.2,65 200,65 C271.8,65 330,103.1 330,150 Z');
          animation: hero-orbit 7s linear infinite;
        }
        .hero-orbit-2 {
          offset-path: path('M330,150 C330,196.9 271.8,235 200,235 C128.2,235 70,196.9 70,150 C70,103.1 128.2,65 200,65 C271.8,65 330,103.1 330,150 Z');
          animation: hero-orbit 7s linear infinite;
          animation-delay: 2.3s;
        }
        .hero-orbit-3 {
          offset-path: path('M330,150 C330,196.9 271.8,235 200,235 C128.2,235 70,196.9 70,150 C70,103.1 128.2,65 200,65 C271.8,65 330,103.1 330,150 Z');
          animation: hero-orbit 7s linear infinite;
          animation-delay: 4.6s;
        }
        @keyframes hero-orbit {
          0%   { offset-distance: 0%; }
          100% { offset-distance: 100%; }
        }
      `}</style>

      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm mx-auto">
        {/* Stars — fixed in place, only their opacity blinks */}
        <g transform="translate(20,4) scale(0.34)">
          <g transform="translate(0,1086) scale(0.1,-0.1)">
            <Star delay="0s" d="M7490 7670 c0 -33 4 -60 10 -60 6 0 10 27 10 60 0 33 -4 60 -10 60 -6 0 -10 -27 -10 -60z" />
            <Star delay="0s" d="M7343 7568 c2 -8 22 -13 52 -13 30 0 50 5 53 13 3 9 -12 12 -53 12 -41 0 -56 -3 -52 -12z" />
            <Star delay="0s" d="M7552 7568 c5 -15 50 -22 84 -14 43 11 25 26 -32 26 -40 0 -55 -4 -52 -12z" />
            <Star delay="0s" d="M7490 7460 c0 -33 4 -60 9 -60 14 0 16 15 13 70 -5 70 -22 63 -22 -10z" />
            <Star delay="0.6s" d="M4748 6652 c-23 -14 -28 -24 -28 -58 0 -36 4 -43 34 -59 33 -18 34 -18 65 4 43 31 43 78 1 109 -34 25 -36 26 -72 4z m64 -29 c25 -22 23 -47 -6 -62 -48 -26 -96 41 -48 68 24 14 33 13 54 -6z" />
            <Star delay="1.2s" d="M9311 6374 c-40 -33 -40 -66 -2 -93 36 -26 42 -26 75 0 34 27 33 61 -1 94 -34 31 -34 31 -72 -1z m64 -24 c18 -20 18 -21 -3 -43 -18 -17 -26 -19 -40 -11 -24 16 -27 45 -6 61 24 17 28 17 49 -7z" />
            <Star delay="0.3s" d="M10464 4956 c-9 -22 0 -101 11 -99 14 4 19 113 5 113 -6 0 -13 -6 -16 -14z" />
            <Star delay="0.3s" d="M10568 4823 c-56 -6 -46 -23 13 -23 35 0 49 4 47 12 -5 14 -12 16 -60 11z" />
            <Star delay="0.3s" d="M10320 4810 c0 -5 25 -10 55 -10 30 0 55 5 55 10 0 6 -25 10 -55 10 -30 0 -55 -4 -55 -10z" />
            <Star delay="0.3s" d="M10466 4763 c-3 -3 -6 -30 -6 -60 0 -40 4 -53 15 -53 11 0 15 13 15 54 0 51 -9 74 -24 59z" />
            <Star delay="1.8s" d="M3737 4463 c-3 -5 -7 -24 -9 -43 -2 -27 1 -35 15 -38 14 -3 17 4 17 37 0 37 -13 61 -23 44z" />
            <Star delay="1.8s" d="M3663 4373 c-32 -6 -28 -19 7 -26 35 -7 62 1 57 17 -4 12 -30 16 -64 9z" />
            <Star delay="1.8s" d="M3774 4366 c-9 -24 -1 -28 40 -21 38 8 50 25 17 25 -11 0 -26 3 -35 6 -10 4 -18 0 -22 -10z" />
            <Star delay="1.8s" d="M3732 4294 c2 -27 8 -48 13 -46 15 3 12 85 -3 90 -10 3 -12 -8 -10 -44z" />
            <Star delay="2.2s" d="M8482 3297 c-31 -33 -28 -62 9 -88 l31 -22 26 20 c35 26 39 59 11 89 -28 30 -50 30 -77 1z m63 -17 c18 -20 18 -21 -3 -42 -17 -18 -23 -19 -36 -8 -19 15 -21 41 -4 58 16 16 22 15 43 -8z" />
          </g>
        </g>

        {/* Oval loop — the story passing all the way around, through both phones */}
        <path
          d="M330,150 C330,196.9 271.8,235 200,235 C128.2,235 70,196.9 70,150 C70,103.1 128.2,65 200,65 C271.8,65 330,103.1 330,150 Z"
          fill="none"
          stroke="black"
          strokeWidth="1.2"
          strokeDasharray="3 5"
          opacity="0.3"
        />

        {/* Traveling marks — lines of the story orbiting through each phone */}
        <g className="hero-orbit-1"><rect x="-3.2" y="-3.2" width="6.4" height="6.4" fill="black" /></g>
        <g className="hero-orbit-2"><circle r="3.4" fill="none" stroke="black" strokeWidth="1.3" /></g>
        <g className="hero-orbit-3"><path d="M0,-4.6 L4.6,0 L0,4.6 L-4.6,0 Z" fill="black" /></g>

        {/* Two phones, two strangers, placed diagonally on the loop, upright */}
        <Phone x={108} y={90} />
        <Phone x={292} y={210} />

        {/* The story itself, dreamed up in the middle — exact uploaded artwork, bigger now.
            Three layers: position (attribute transform) -> unit conversion (attribute
            transform) -> breathing (CSS transform). A CSS transform on the same element
            as an SVG transform attribute would otherwise wipe out the attribute entirely. */}
        <g transform="translate(-27.55,-11.25) scale(0.30)">
          <g transform="translate(0,1086) scale(0.1,-0.1)">
            <g
              fill="#000000"
              stroke="none"
              style={{ transformOrigin: '7570px 5500px', animation: 'hero-sleep-breathe 4.2s ease-in-out infinite' }}
            >
              <path d="M6690 5942 c-40 -43 -106 -164 -140 -259 l-22 -62 -57 -6 c-96 -10 -226 -43 -294 -73 l-65 -30 -53 45 c-83 68 -179 129 -231 147 -80 26 -121 -3 -139 -100 -14 -76 -5 -213 25 -368 l24 -121 -20 -75 c-28 -104 -34 -265 -14 -359 21 -99 65 -190 120 -249 l46 -49 -20 -38 c-61 -119 28 -199 220 -199 96 0 179 17 227 46 33 19 33 19 59 -1 50 -39 134 -62 259 -72 163 -12 902 -11 1101 1 291 18 547 78 672 160 120 77 197 196 232 357 53 250 25 530 -74 739 -53 112 -89 165 -168 249 -322 345 -864 411 -1372 169 -27 -13 -50 -23 -51 -21 -1 1 -15 22 -30 47 -66 106 -125 160 -176 160 -13 0 -38 -17 -59 -38z m140 -49 c65 -68 152 -229 200 -372 23 -68 44 -108 78 -151 141 -174 215 -388 192 -553 -17 -119 -86 -251 -159 -305 -26 -19 -27 -19 -141 4 -154 31 -256 38 -372 25 -153 -17 -243 -58 -304 -137 l-31 -41 -24 18 c-37 29 -144 59 -208 59 -31 -1 -81 -9 -111 -20 l-55 -19 -38 37 c-53 52 -112 174 -127 263 -16 93 -8 238 19 339 l20 75 -25 122 c-46 238 -42 404 12 440 22 14 28 14 69 -1 54 -21 205 -127 245 -172 l29 -34 73 35 c94 44 213 74 308 78 l74 3 9 40 c12 59 112 260 146 294 16 17 37 30 47 30 10 0 43 -26 74 -57z m966 2 c235 -38 421 -136 573 -301 184 -201 275 -514 242 -827 -37 -341 -168 -485 -515 -567 -197 -47 -274 -52 -833 -57 -694 -6 -817 5 -901 82 -33 30 -37 39 -37 83 0 64 39 116 118 155 137 68 326 74 597 17 254 -53 402 -44 491 30 28 22 48 57 87 149 53 124 59 141 43 141 -15 0 -28 -23 -70 -130 -23 -57 -50 -113 -59 -123 -47 -53 -171 -83 -294 -72 -43 4 -78 9 -78 12 0 3 11 14 24 24 37 29 97 125 122 198 33 93 33 246 1 358 -27 95 -111 250 -173 321 -32 36 -51 72 -70 128 -13 42 -40 111 -59 152 -20 41 -34 77 -32 78 2 2 34 18 73 35 136 62 248 94 434 122 62 10 233 6 316 -8z m-1630 -1500 c75 -21 118 -54 125 -95 3 -19 10 -43 14 -53 6 -14 -2 -21 -36 -36 -146 -64 -375 -41 -403 40 -21 63 22 118 118 149 64 20 93 20 182 -5z" />
              <path d="M6860 4915 c-28 -46 -72 -68 -119 -61 -75 11 -84 11 -88 -1 -6 -18 51 -43 97 -43 23 0 58 7 77 17 39 18 88 85 79 108 -9 24 -23 18 -46 -20z" />
              <path d="M6235 4714 c-25 -30 -38 -37 -78 -41 -39 -5 -54 -2 -76 15 -21 15 -31 18 -40 9 -17 -17 -14 -26 22 -47 63 -39 165 -18 211 43 17 24 17 57 -1 57 -4 0 -21 -17 -38 -36z" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  )
}
