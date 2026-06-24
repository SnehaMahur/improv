import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const LOADING_MS = 900
const REVEAL_MS = 7000
const MESSAGE = 'Yay! The story is live.'
const TYPE_START_MS = 2100
const TYPE_INTERVAL_MS = 45

function TypewriterLine() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const start = setTimeout(() => {
      const interval = setInterval(() => {
        setCount(c => {
          if (c >= MESSAGE.length) {
            clearInterval(interval)
            return c
          }
          return c + 1
        })
      }, TYPE_INTERVAL_MS)
    }, TYPE_START_MS)
    return () => clearTimeout(start)
  }, [])

  return (
    <p className="font-mono font-medium text-xl text-black mt-6 min-h-[1.75rem]">
      {MESSAGE.slice(0, count)}
      {count < MESSAGE.length && <span className="animate-pulse">|</span>}
    </p>
  )
}

function LoadingDots() {
  return (
    <div className="flex items-center gap-2">
      {[0, 1, 2].map(i => (
        <span
          key={i}
          className="w-2.5 h-2.5 rounded-full bg-black"
          style={{ animation: 'loading-bounce 0.9s ease-in-out infinite', animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  )
}

const CONFETTI = [
  { left: '4%', delay: '0s', drift: '30px', shape: 'rect' },
  { left: '12%', delay: '0.15s', drift: '-20px', shape: 'circle' },
  { left: '20%', delay: '0.05s', drift: '40px', shape: 'diamond' },
  { left: '28%', delay: '0.25s', drift: '-35px', shape: 'rect' },
  { left: '36%', delay: '0.1s', drift: '15px', shape: 'circle' },
  { left: '44%', delay: '0.3s', drift: '-25px', shape: 'diamond' },
  { left: '52%', delay: '0s', drift: '35px', shape: 'rect' },
  { left: '60%', delay: '0.2s', drift: '-15px', shape: 'circle' },
  { left: '68%', delay: '0.08s', drift: '25px', shape: 'diamond' },
  { left: '76%', delay: '0.28s', drift: '-40px', shape: 'rect' },
  { left: '84%', delay: '0.12s', drift: '20px', shape: 'circle' },
  { left: '92%', delay: '0.22s', drift: '-30px', shape: 'diamond' },
]

function Confetto({ left, delay, drift, shape }: { left: string; delay: string; drift: string; shape: string }) {
  const style: React.CSSProperties = {
    left,
    '--drift': drift,
    animation: `confetti-fall 2.2s ease-in forwards`,
    animationDelay: delay,
  } as React.CSSProperties
  if (shape === 'circle') {
    return <span className="absolute top-0 w-2.5 h-2.5 rounded-full bg-black" style={style} />
  }
  if (shape === 'diamond') {
    return <span className="absolute top-0 w-2.5 h-2.5 bg-black" style={{ ...style, clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
  }
  return <span className="absolute top-0 w-2 h-3.5 bg-black" style={style} />
}

const LEFT_CAT_BODY = `M5567 6722 c-58 -39 -145 -195 -192 -345 -21 -65 -32 -87 -45 -87
-45 0 -184 -45 -278 -90 l-104 -50 -82 49 c-293 176 -449 205 -502 93 -39 -82
-26 -290 30 -517 28 -109 31 -136 22 -165 -17 -59 -13 -295 7 -378 20 -85 54
-177 91 -250 l26 -52 -108 -108 c-173 -172 -281 -328 -367 -532 -116 -276
-127 -558 -29 -752 36 -72 137 -168 215 -207 140 -68 402 -109 637 -98 149 6
219 25 270 72 l37 33 30 -25 c17 -14 55 -37 85 -51 48 -24 67 -27 155 -27 83
1 109 5 153 24 29 13 56 30 61 38 7 13 16 11 58 -11 130 -65 341 -57 422 17
80 74 63 211 -35 279 l-46 33 6 80 c10 117 40 250 96 425 28 85 60 196 72 247
20 80 26 93 46 98 57 14 224 101 327 169 263 176 456 417 544 681 72 219 59
392 -35 475 -46 40 -107 56 -162 41 -72 -19 -117 -57 -183 -155 -122 -178
-223 -295 -308 -355 -30 -22 -33 -22 -27 -5 16 51 23 168 15 249 -11 112 -53
232 -114 332 -60 96 -200 239 -277 283 -36 20 -58 39 -58 49 0 58 -203 396
-276 460 -62 55 -126 66 -177 33z m102 -36 c78 -41 241 -284 296 -442 21 -60
27 -68 78 -98 170 -103 314 -294 362 -481 55 -214 4 -438 -132 -585 -39 -42
-53 -64 -46 -71 8 -8 17 -8 31 0 33 18 113 113 140 167 14 28 37 58 51 67 100
59 244 212 353 376 90 135 134 171 210 171 201 0 211 -339 21 -667 -100 -173
-254 -335 -430 -452 -102 -68 -271 -151 -323 -158 -33 -5 -41 -10 -46 -32 -26
-112 -52 -207 -94 -339 -60 -183 -77 -254 -95 -392 -22 -159 -22 -156 33 -189
26 -17 56 -44 66 -62 24 -41 25 -106 2 -141 -50 -77 -249 -95 -382 -34 -51 24
-53 26 -48 58 8 49 -11 108 -47 148 l-32 34 6 106 c4 58 10 143 13 189 7 78 6
83 -12 79 -23 -4 -29 -34 -43 -238 l-10 -155 28 -30 c39 -41 51 -67 51 -112 0
-69 -43 -105 -147 -124 -111 -21 -236 23 -297 104 -37 49 -60 114 -80 227 -10
52 -20 113 -24 135 -9 48 -35 55 -40 11 -3 -27 23 -213 35 -242 4 -11 -2 -11
-32 2 -20 8 -49 14 -64 12 -44 -5 -30 -30 29 -49 57 -18 100 -58 100 -92 0
-33 -61 -83 -115 -95 -140 -30 -366 -23 -569 19 -233 47 -368 157 -428 349
-33 107 -31 284 5 422 69 263 211 500 426 712 86 86 91 89 115 77 38 -21 51
-5 26 32 -128 194 -187 466 -149 684 10 58 9 74 -15 166 -35 137 -56 284 -56
390 0 149 33 190 136 167 59 -13 274 -118 364 -179 l61 -40 45 31 c82 55 300
128 384 128 16 0 20 6 20 34 0 98 141 381 203 406 30 12 34 12 66 -4z`

const LEFT_CAT_EYES = [
  `M6017 5730 c-99 -78 -62 -243 59 -266 72 -13 134 37 142 115 9 101
-34 162 -120 169 -44 3 -58 0 -81 -18z`,
  `M5421 5509 c-131 -28 -165 -211 -55 -296 104 -79 245 -5 246 129 1
115 -85 190 -191 167z`,
]

const RIGHT_CAT_BODY = `M8979 6711 c-25 -15 -67 -53 -94 -84 -65 -73 -179 -256 -211 -339
-26 -65 -29 -68 -109 -117 -102 -62 -223 -188 -284 -296 -91 -159 -135 -346
-115 -493 6 -39 7 -72 3 -72 -11 0 -112 101 -168 169 -29 35 -86 115 -128 178
-56 86 -86 122 -120 143 -114 73 -237 34 -294 -92 -35 -77 -32 -237 5 -361
100 -333 362 -629 723 -813 l112 -58 10 -61 c6 -33 40 -166 75 -295 56 -209
72 -292 90 -473 2 -23 -5 -33 -40 -57 -47 -33 -94 -115 -94 -165 0 -17 10 -51
23 -75 55 -110 276 -143 449 -67 l53 23 34 -23 c122 -83 339 -64 443 39 33 34
35 34 44 15 18 -41 78 -77 154 -93 140 -30 475 -8 650 42 222 63 362 207 406
417 24 109 14 312 -20 442 -70 262 -236 542 -422 714 l-76 70 42 97 c23 54 53
139 68 189 23 81 26 107 27 275 1 169 3 193 28 275 42 145 60 253 61 370 1
130 -13 167 -72 192 -31 13 -47 14 -102 4 -76 -14 -243 -83 -352 -145 l-77
-44 -83 43 c-79 41 -162 72 -255 95 -40 10 -42 12 -49 58 -19 127 -100 308
-165 367 -51 46 -104 48 -170 6z m132 -34 c63 -42 159 -274 159 -384 0 -43 10
-53 55 -53 60 0 330 -108 350 -140 11 -17 33 -11 90 26 86 54 210 112 317 146
116 36 149 31 168 -28 16 -47 14 -167 -5 -274 -15 -85 -66 -277 -79 -299 -4
-6 -2 -55 4 -110 24 -204 -44 -466 -170 -657 -19 -29 -19 -32 -4 -45 14 -11
19 -10 36 11 l20 25 103 -107 c260 -268 408 -604 408 -923 1 -175 -39 -290
-136 -392 -89 -95 -214 -148 -420 -179 -153 -24 -402 -24 -478 -1 -72 22 -109
55 -109 100 0 42 32 74 91 91 25 8 44 19 44 27 0 20 -47 23 -90 5 -35 -15 -37
-15 -30 1 7 20 35 207 35 241 0 15 -6 22 -19 22 -16 0 -21 -9 -26 -47 -45
-336 -96 -421 -274 -453 -97 -17 -202 7 -241 58 -36 45 -17 155 32 185 15 10
18 25 17 97 0 47 -6 137 -12 200 -11 104 -14 115 -32 115 -23 0 -22 17 -5
-219 l11 -149 -25 -26 c-37 -38 -58 -97 -54 -150 l3 -46 -60 -24 c-123 -49
-307 -38 -364 23 -24 26 -37 81 -27 120 9 36 55 87 94 103 l35 14 -6 97 c-9
140 -29 242 -91 457 -29 105 -61 235 -71 290 -9 55 -19 103 -22 108 -2 4 -13
5 -23 2 -23 -7 -143 52 -257 127 -281 184 -475 439 -552 728 -30 109 -27 253
5 315 28 54 75 85 132 85 77 0 113 -29 206 -169 105 -159 197 -266 290 -339
53 -41 80 -71 98 -107 29 -58 103 -154 124 -162 9 -3 20 -1 26 5 7 7 -4 28
-37 68 -102 126 -140 246 -132 415 4 84 12 126 36 195 70 201 208 369 376 459
50 27 59 36 74 80 56 157 241 414 324 450 43 19 49 19 88 -8z`

const RIGHT_CAT_EYES = [
  `M8480 5743 c-71 -37 -104 -123 -76 -198 53 -138 232 -98 252 56 13
104 -89 187 -176 142z`,
  `M9074 5491 c-95 -58 -118 -178 -48 -260 55 -66 163 -66 225 -1 79 83
68 205 -24 260 -41 26 -112 26 -153 1z`,
]

function Star({ d, delay }: { d: string; delay: string }) {
  return (
    <g style={{ animation: 'hf-twinkle 2.4s ease-in-out infinite', animationDelay: delay }}>
      <path d={d} />
    </g>
  )
}

interface ArmRect {
  x: number
  y: number
  w: number
  h: number
}

/**
 * Splits one fused cat silhouette into a static "body" layer and an animated
 * "arm" layer using a clip-path rectangle measured (via canvas pixel-sampling
 * against the source artwork) to bound just the raised arm/paw. Both layers
 * render the identical full path; the clip regions exactly partition the
 * canvas, so at rest they reconstruct the original art with no seam. Only the
 * arm layer's <g> gets the tap animation, so the body never moves.
 */
function CatHighFive({
  id,
  bodyPath,
  eyePaths,
  rect,
  pivot,
  animation,
}: {
  id: string
  bodyPath: string
  eyePaths: string[]
  rect: ArmRect
  pivot: { x: number; y: number }
  animation: string
}) {
  const armClipId = `hf-arm-clip-${id}`
  const bodyClipId = `hf-body-clip-${id}`
  return (
    <>
      <defs>
        <clipPath id={armClipId}>
          <rect x={rect.x} y={rect.y} width={rect.w} height={rect.h} />
        </clipPath>
        <clipPath id={bodyClipId}>
          <path
            fillRule="evenodd"
            d={`M0,0 H14480 V10860 H0 Z M${rect.x},${rect.y} H${rect.x + rect.w} V${rect.y + rect.h} H${rect.x} Z`}
          />
        </clipPath>
      </defs>
      <g clipPath={`url(#${bodyClipId})`}>
        <path d={bodyPath} />
        {eyePaths.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
      <g clipPath={`url(#${armClipId})`} style={{ transformOrigin: `${pivot.x}px ${pivot.y}px`, animation }}>
        <path d={bodyPath} />
      </g>
    </>
  )
}

export default function HighFiveAnimation({ onComplete }: { onComplete: () => void }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const toReveal = setTimeout(() => setLoading(false), LOADING_MS)
    const finish = setTimeout(onComplete, LOADING_MS + REVEAL_MS)
    return () => {
      clearTimeout(toReveal)
      clearTimeout(finish)
    }
  }, [onComplete])

  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center overflow-hidden px-10 text-center" style={{ backgroundColor: '#f5ede8' }}>
      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes loading-bounce {
          0%, 100% { transform: translateY(0); opacity: 0.3; }
          50%      { transform: translateY(-6px); opacity: 1; }
        }
        @keyframes high-five-pop {
          0%   { transform: scale(0.4); opacity: 0; }
          60%  { transform: scale(1.08); opacity: 1; }
          80%  { transform: scale(0.97); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes confetti-fall {
          0%   { transform: translate(0, 0) rotate(0deg); opacity: 1; }
          100% { transform: translate(var(--drift), 280px) rotate(540deg); opacity: 0; }
        }
        @keyframes hf-tap-left {
          0%   { transform: rotate(20deg); }
          55%  { transform: rotate(0deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes hf-tap-right {
          0%   { transform: rotate(-20deg); }
          55%  { transform: rotate(0deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes hf-spark {
          0%   { opacity: 0; transform: scale(0.5); }
          55%  { opacity: 1; transform: scale(1.3); }
          100% { opacity: 0.9; transform: scale(1); }
        }
        @keyframes hf-twinkle {
          0%, 100% { opacity: 0.15; }
          50%      { opacity: 1; }
        }
      `}</style>

      {loading ? (
        <LoadingDots />
      ) : (
        <>
          <div className="relative w-full h-56 mb-2">
            {CONFETTI.map((c, i) => (
              <Confetto key={i} {...c} />
            ))}
          </div>

          <svg
            viewBox="0 0 1448 1086"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[34rem] -mt-60"
            style={{ animation: 'high-five-pop 0.7s cubic-bezier(0.34,1.56,0.64,1) forwards', opacity: 0 }}
          >
            <g transform="translate(0,1086) scale(0.1,-0.1)" fill="#000000" stroke="none">
              {/* Ambient background stars — pure opacity blink, fixed in place. */}
              <Star delay="0s" d="M3593 7659 l-53 -31 0 -62 0 -62 54 -29 53 -29 54 31 54 30 3 56 3
57 -55 35 c-30 19 -56 35 -58 35 -2 0 -27 -14 -55 -31z m93 -40 c47 -29 47
-68 0 -104 l-34 -26 -36 22 c-31 18 -36 26 -36 57 0 30 6 40 28 54 36 22 39
21 78 -3z" />
              <Star delay="0.4s" d="M11510 7490 c0 -63 2 -70 20 -70 18 0 20 7 20 70 0 63 -2 70 -20 70
-18 0 -20 -7 -20 -70z" />
              <Star delay="0.4s" d="M11352 7373 c3 -15 14 -18 63 -18 49 0 60 3 63 18 3 15 -5 17 -63 17
-58 0 -66 -2 -63 -17z" />
              <Star delay="0.4s" d="M11576 7381 c-12 -18 24 -32 76 -29 41 2 54 7 56 21 3 15 -5 17 -62
17 -36 0 -67 -4 -70 -9z" />
              <Star delay="0.4s" d="M11517 7324 c-4 -4 -7 -36 -7 -71 0 -57 2 -63 20 -63 19 0 21 5 18
67 -3 61 -14 84 -31 67z" />
              <Star delay="0.9s" d="M11824 4808 c-26 -18 -47 -36 -46 -40 1 -5 2 -29 2 -56 0 -46 2 -48
47 -76 l48 -29 52 29 53 28 0 57 0 56 -51 32 c-28 17 -52 31 -54 31 -1 0 -24
-15 -51 -32z m86 -33 c25 -13 30 -22 30 -50 0 -29 -6 -39 -31 -54 -29 -18 -33
-18 -60 -2 -23 13 -29 23 -29 52 0 27 6 41 23 52 28 20 32 20 67 2z" />
              <Star delay="1.3s" d="M2674 4737 c-3 -8 -4 -39 -2 -68 2 -40 7 -54 18 -54 20 0 22 126 3
132 -7 3 -15 -2 -19 -10z" />
              <Star delay="1.3s" d="M2522 4573 c2 -14 15 -19 58 -21 30 -1 61 2 69 7 27 18 -1 31 -65 31
-57 0 -65 -2 -62 -17z" />
              <Star delay="1.3s" d="M2732 4573 c3 -15 14 -18 63 -18 49 0 60 3 63 18 3 15 -5 17 -63 17
-58 0 -66 -2 -63 -17z" />
              <Star delay="1.3s" d="M2672 4463 c2 -53 6 -68 18 -68 12 0 16 15 18 68 3 62 1 67 -18 67
-19 0 -21 -5 -18 -67z" />
              <Star delay="1.7s" d="M4627 2523 c-30 -21 -37 -33 -37 -59 0 -26 8 -38 41 -63 31 -22 46
-28 58 -21 73 43 83 101 27 144 -19 14 -38 26 -43 26 -5 0 -25 -12 -46 -27z
m75 -30 c24 -22 23 -41 -4 -63 -20 -16 -25 -16 -45 -3 -27 18 -29 40 -6 65 20
22 31 23 55 1z" />

              <CatHighFive
                id="left"
                bodyPath={LEFT_CAT_BODY}
                eyePaths={LEFT_CAT_EYES}
                rect={{ x: 4350, y: 5100, w: 3050, h: 1850 }}
                pivot={{ x: 4500, y: 5100 }}
                animation="hf-tap-left 0.5s ease-out 1"
              />
              <CatHighFive
                id="right"
                bodyPath={RIGHT_CAT_BODY}
                eyePaths={RIGHT_CAT_EYES}
                rect={{ x: 8200, y: 5600, w: 2200, h: 1450 }}
                pivot={{ x: 10250, y: 5600 }}
                animation="hf-tap-right 0.5s ease-out 1"
              />

              {/* High-five impact spark, between the two raised paws — flashes on contact. */}
              <g style={{ transformOrigin: '7250px 6550px', animation: 'hf-spark 0.5s ease-out 1', animationDelay: '0.7s' }}>
                <path d="M7307 6664 c-10 -10 -9 -342 1 -348 4 -2 13 -1 20 3 9 6 12 51 10
176 -3 158 -9 191 -31 169z" />
                <path d="M6824 6485 c-3 -8 -2 -20 2 -26 24 -39 167 -219 173 -219 5 0 13 6
19 13 8 9 -12 42 -79 130 -50 64 -95 117 -100 117 -5 0 -12 -7 -15 -15z" />
                <path d="M7701 6381 c-50 -66 -91 -124 -91 -130 0 -20 29 -18 48 2 51 55 162
213 160 226 -7 35 -32 14 -117 -98z" />
              </g>
            </g>
          </svg>

          <TypewriterLine />

          <Link
            to="/continue"
            className="btn-primary mt-8 text-[11px] tracking-wide uppercase py-4 px-8"
            style={{ animation: 'fade-in 0.5s ease 3.4s forwards', opacity: 0 }}
          >
            Continue a Story
          </Link>
        </>
      )}
    </main>
  )
}
