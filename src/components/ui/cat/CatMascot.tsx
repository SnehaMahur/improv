import type { CSSProperties, ReactNode } from 'react'

export type CatPose =
  | 'sitting'
  | 'peeking'
  | 'peekingSide'
  | 'jumping'
  | 'sleeping'
  | 'pawing'
  | 'sittingEdge'
  | 'carrying'
  | 'walking'

export const CAT_VIEWBOX: Record<CatPose, { w: number; h: number }> = {
  sitting: { w: 64, h: 67 },
  peeking: { w: 120, h: 75 },
  peekingSide: { w: 68, h: 106 },
  jumping: { w: 70, h: 43 },
  sleeping: { w: 80, h: 46 },
  pawing: { w: 64, h: 58 },
  sittingEdge: { w: 64, h: 50 },
  carrying: { w: 76, h: 50 },
  walking: { w: 70, h: 46 },
}

// Some poses are sourced from a hand-authored SVG with its own native coordinate
// space; we display them at CAT_VIEWBOX size but keep the original viewBox so
// the artwork isn't redrawn or distorted.
const POSE_NATIVE_VIEWBOX: Partial<Record<CatPose, { w: number; h: number }>> = {
  peeking: { w: 1600, h: 1000 },
  sitting: { w: 711, h: 744 },
  jumping: { w: 360, h: 220 },
  walking: { w: 640, h: 420 },
  peekingSide: { w: 522, h: 815 },
}

interface Props {
  pose?: CatPose
  flip?: boolean
  blink?: boolean
  tailTwitch?: boolean
  peekIn?: boolean
  className?: string
  style?: CSSProperties
}

function FlipWrap({ w, flip, children }: { w: number; flip?: boolean; children: ReactNode }) {
  return flip ? <g transform={`translate(${w},0) scale(-1,1)`}>{children}</g> : <>{children}</>
}

const STROKE = 2.2

function Eyes({ x1, x2, y, blink }: { x1: number; x2: number; y: number; blink?: boolean }) {
  return (
    <g className={blink ? 'cat-anim-blink' : ''} style={{ transformOrigin: `${(x1 + x2) / 2}px ${y}px` }}>
      <ellipse cx={x1} cy={y} rx="2.6" ry="3.6" fill="black" />
      <ellipse cx={x2} cy={y} rx="2.6" ry="3.6" fill="black" />
    </g>
  )
}

/** Scalloped paw — a small mitten with three rounded toe bumps. */
function Paw({ x, y, rotate = 0 }: { x: number; y: number; rotate?: number }) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rotate})`}>
      <path
        d="M-5,-7 Q-5,1.5 -2.9,1.7 Q-3,-0.5 -1,-0.4 Q-1.2,2.2 1,2.2 Q3.2,2.2 3,-0.4 Q5,-0.5 4.9,1.7 Q5,1.5 5,-7 Z"
        fill="white"
        stroke="black"
        strokeWidth={STROKE - 0.3}
        strokeLinejoin="round"
      />
    </g>
  )
}

function GroundShadow({ cx, cy, rx = 15 }: { cx: number; cy: number; rx?: number }) {
  return <ellipse cx={cx} cy={cy} rx={rx} ry="2.6" fill="black" opacity="0.08" />
}

/* ── Sitting — exact uploaded artwork ─────────────────────────────────────── */
function SittingGroup({ blink }: { blink?: boolean; tailTwitch?: boolean }) {
  return (
    <g transform="translate(0,744) scale(0.1,-0.1)" fill="black" stroke="none">
      <path d="M4175 6417 c-102 -34 -205 -107 -354 -252 -96 -93 -274 -294 -326 -368 -14 -20 -16 -21 -87 -4 -132 30 -255 40 -438 33 -96 -3 -195 -10 -220 -16 -113 -26 -97 -33 -184 79 -150 192 -375 386 -533 458 -205 94 -346 61 -417 -97 -72 -160 -120 -476 -132 -870 l-6 -205 -59 -120 c-176 -359 -223 -740 -132 -1055 105 -365 343 -606 715 -725 l114 -37 -24 -91 c-46 -181 -64 -345 -64 -572 -1 -218 9 -333 43 -520 12 -60 23 -129 26 -152 l5 -41 -59 -30 c-141 -72 -235 -206 -237 -339 -1 -91 24 -160 81 -223 54 -60 138 -106 232 -126 122 -26 332 -16 473 23 l58 15 35 -31 c81 -71 181 -101 338 -101 163 0 291 36 427 121 l35 22 47 -32 c95 -64 107 -66 393 -65 510 1 919 52 1127 140 69 29 156 82 177 107 11 14 33 17 118 17 333 0 673 166 887 431 83 103 176 288 206 409 99 402 -60 802 -370 931 -166 70 -357 26 -450 -103 -45 -62 -70 -139 -70 -216 1 -99 15 -146 76 -254 69 -120 77 -171 44 -268 -12 -35 -33 -84 -48 -109 -31 -53 -124 -149 -169 -174 l-32 -17 -6 57 c-31 266 -148 592 -290 802 -159 237 -393 458 -622 587 l-82 46 58 48 c149 124 263 310 317 515 39 148 45 389 14 570 -26 152 -72 299 -129 414 l-42 82 -3 272 c-4 293 -13 403 -52 594 -45 226 -113 368 -201 420 -53 31 -147 40 -208 20z m154 -142 c112 -95 192 -541 177 -992 l-6 -192 35 -63 c97 -177 155 -400 162 -623 8 -254 -34 -429 -145 -601 -95 -145 -221 -249 -384 -315 -40 -17 -76 -35 -80 -42 -16 -26 -8 -66 17 -83 28 -18 50 -15 133 18 l53 22 57 -28 c93 -45 240 -146 347 -238 313 -267 495 -590 576 -1023 20 -105 17 -354 -4 -435 -67 -249 -199 -341 -575 -404 -280 -47 -910 -77 -1007 -48 -54 16 -95 60 -102 108 -4 32 3 54 39 124 47 91 88 130 140 130 40 0 68 17 68 40 0 10 -12 41 -26 67 -43 81 -27 159 99 463 33 80 62 158 64 173 10 54 -47 85 -94 52 -34 -24 -170 -362 -233 -582 -23 -81 -51 -143 -109 -248 -43 -77 -86 -161 -96 -188 -46 -121 -196 -190 -415 -191 -109 0 -120 2 -182 31 -71 34 -93 57 -103 115 -8 42 18 107 78 195 44 65 57 122 96 408 16 121 33 239 36 261 6 35 4 45 -14 63 -28 28 -76 28 -95 -1 -16 -26 -25 -76 -61 -352 -31 -231 -40 -265 -88 -338 -51 -77 -78 -141 -84 -205 -7 -65 -10 -67 -158 -90 -184 -28 -343 -5 -431 62 -102 78 -100 229 3 332 50 50 138 95 170 87 30 -8 63 20 63 54 0 13 -15 106 -34 206 -47 246 -58 359 -58 576 1 208 18 359 59 525 l28 110 49 -3 c65 -3 96 17 96 62 0 18 -6 38 -13 44 -7 6 -60 18 -117 28 -278 44 -475 138 -631 301 -87 91 -139 172 -185 289 -57 145 -69 219 -68 404 2 252 42 415 166 668 l69 143 4 207 c4 235 24 446 60 627 39 196 72 266 133 282 142 35 455 -188 670 -478 35 -46 73 -97 85 -113 l23 -30 105 23 c191 42 545 39 702 -5 28 -8 73 -18 98 -21 l47 -5 89 118 c199 263 396 455 535 519 71 33 127 33 167 0z m1711 -3272 c123 -59 240 -226 275 -389 19 -91 19 -256 -1 -352 -69 -337 -339 -625 -689 -735 -78 -24 -270 -56 -280 -45 -3 2 6 32 20 66 25 61 55 207 55 267 0 30 5 35 68 65 90 44 213 168 264 266 63 119 83 235 57 329 -6 22 -36 91 -67 153 -46 93 -57 124 -60 175 -3 53 0 70 25 116 31 59 59 85 119 107 54 20 145 11 214 -23z" />
      <g className={blink ? 'cat-anim-blink' : ''} style={{ transformOrigin: '2767px 4643px' }}>
        <path d="M2065 4646 c-86 -38 -143 -145 -152 -281 -14 -206 78 -348 226 -347 124 1 213 108 227 274 10 119 -22 234 -85 301 -56 62 -147 84 -216 53z" />
        <path d="M3469 4640 c-47 -25 -86 -71 -118 -140 -19 -43 -26 -76 -29 -146 -7 -142 26 -229 111 -298 34 -27 48 -31 110 -34 66 -3 76 -1 119 27 178 114 163 496 -23 592 -49 24 -123 24 -170 -1z" />
      </g>
    </g>
  )
}

/* ── Walking — exact hand-authored artwork ────────────────────────────────── */
function WalkingGroup() {
  return (
    <g stroke="#0B0B0B" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M165 186 C108 175 82 130 95 82 C104 49 150 50 158 84 C165 116 142 132 163 154 C179 171 209 176 236 183" />
      <path d="M237 184 C283 160 364 162 411 187" />
      <path d="M420 243 C372 271 291 274 238 249" />
      <path d="M235 249 C211 259 192 288 187 318 C184 337 202 351 222 343 C240 336 243 314 256 300" />
      <path d="M300 269 C292 289 299 319 318 332 C336 345 360 338 361 316 C361 296 343 284 347 269" />
      <path d="M401 263 C390 285 397 321 419 333 C439 344 464 334 462 311 C460 291 441 281 446 262" />
      <path d="M449 252 C466 271 494 294 518 294 C544 294 555 263 532 250 C510 238 498 221 489 204" />
      <path d="M412 186 C413 145 431 115 462 94 L503 138 L552 100 C574 122 589 160 584 201 C578 251 532 284 488 275 C455 268 433 246 421 220" />
      <ellipse cx="487" cy="190" rx="10" ry="18" fill="#0B0B0B" stroke="none" />
      <ellipse cx="542" cy="190" rx="10" ry="18" fill="#0B0B0B" stroke="none" />
      <path d="M513 235 C534 238 552 229 563 214" />
    </g>
  )
}

/* ── Sitting on an edge — legs dangle down over the ledge ─────────────────── */
function SittingEdgeGroup({ blink, tailTwitch }: { blink?: boolean; tailTwitch?: boolean }) {
  return (
    <>
      <path
        className={tailTwitch ? 'cat-anim-tail' : ''}
        style={{ transformOrigin: '46px 18px' }}
        d="M46 18 Q60 22 56 38"
        fill="none"
        stroke="black"
        strokeWidth={STROKE}
        strokeLinecap="round"
      />
      <path
        d="M12 30 Q6 30 6 22 Q6 14 14 11 Q12 6 16 2 Q19 7 24 6 Q28 1 32 1 Q36 1 40 6 Q45 7 48 2 Q52 6 50 11 Q58 14 58 22 Q58 30 50 30 Z"
        fill="white"
        stroke="black"
        strokeWidth={STROKE}
        strokeLinejoin="round"
      />
      <path d="M20 29 Q19 38 20 46" fill="none" stroke="black" strokeWidth={STROKE} strokeLinecap="round" />
      <path d="M40 29 Q41 39 40 48" fill="none" stroke="black" strokeWidth={STROKE} strokeLinecap="round" />
      <Paw x={20} y={49} rotate={4} />
      <Paw x={40} y={51} rotate={-4} />
      <Eyes x1={25} x2={39} y={18} blink={blink} />
    </>
  )
}

/* ── Peeking over a horizontal edge — exact hand-authored artwork ─────────── */
function PeekingGroup({ blink, tailTwitch }: { blink?: boolean; tailTwitch?: boolean }) {
  return (
    <>
      <g stroke="black" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round">
        {/* ledge */}
        <path d="M270 690 H1330" />

        {/* tail */}
        <path
          className={tailTwitch ? 'cat-anim-tail' : ''}
          style={{ transformOrigin: '1130px 690px' }}
          d="M1130 690 C1165 625 1090 560 1118 465 C1142 380 1236 350 1300 390 C1376 438 1334 528 1270 527 C1219 526 1206 572 1225 610 C1241 642 1275 658 1288 690"
          fill="none"
        />

        {/* head outline peeking over ledge */}
        <path
          d="M490 690 C487 622 499 574 525 535 C497 465 514 378 559 360 C606 341 652 437 702 462 C755 449 845 449 898 462 C948 437 994 341 1041 360 C1086 378 1103 465 1075 535 C1101 574 1113 622 1110 690"
          fill="#f5ede8"
        />

        {/* paws — negative space cut out of the head, revealing the page behind */}
        <path
          d="M412 690 C382 690 360 712 360 744 C360 775 384 794 414 790 C426 811 463 811 477 788 C498 810 535 800 541 772 C548 733 515 690 475 690 Z"
          fill="#f5ede8"
        />
        <path
          d="M1125 690 C1085 690 1052 733 1059 772 C1065 800 1102 810 1123 788 C1137 811 1174 811 1186 790 C1216 794 1240 775 1240 744 C1240 712 1218 690 1188 690 Z"
          fill="#f5ede8"
        />
      </g>

      {/* eyes */}
      <g className={blink ? 'cat-anim-blink' : ''} style={{ transformOrigin: '800px 645px' }}>
        <ellipse cx="670" cy="645" rx="27" ry="43" fill="black" />
        <ellipse cx="930" cy="645" rx="27" ry="43" fill="black" />
      </g>
    </>
  )
}

/* ── Peeking from behind a vertical wall — exact uploaded artwork ─────────── */
function PeekingSideGroup({ blink }: { blink?: boolean; tailTwitch?: boolean }) {
  return (
    <g transform="translate(0,815) scale(0.1,-0.1)" fill="black" stroke="none">
      <path d="M3871 7476 c-9 -11 -12 -193 -12 -713 0 -384 -4 -745 -7 -803 l-7 -105 -24 65 c-163 447 -337 674 -503 658 -152 -15 -278 -193 -473 -672 l-61 -149 -125 -28 c-247 -54 -444 -142 -624 -280 l-51 -38 -79 25 c-243 76 -486 119 -625 112 -160 -9 -226 -71 -237 -222 -14 -186 92 -457 285 -728 70 -100 72 -103 72 -163 0 -77 24 -269 44 -360 25 -107 45 -162 93 -260 125 -251 327 -422 601 -509 91 -29 242 -56 310 -56 l42 0 0 -119 c0 -312 77 -612 235 -918 l74 -142 -29 -98 c-15 -54 -31 -125 -35 -156 l-7 -58 -32 7 c-203 44 -335 183 -460 487 -148 358 -313 544 -550 616 -86 26 -246 29 -327 5 -133 -39 -235 -130 -283 -253 -19 -49 -23 -165 -7 -220 15 -50 57 -106 104 -138 39 -26 49 -28 132 -27 50 1 120 3 156 5 59 4 69 1 101 -23 38 -29 88 -118 138 -243 108 -274 245 -457 436 -582 163 -105 414 -183 594 -183 l56 0 12 -62 c21 -113 98 -201 204 -233 29 -8 89 -15 137 -15 80 0 92 -3 160 -37 70 -36 79 -38 170 -38 135 0 221 28 294 95 30 27 60 63 67 80 7 16 16 30 20 30 5 0 8 -79 9 -176 0 -117 4 -181 12 -190 14 -17 61 -18 77 -2 9 9 12 780 12 3410 0 3349 0 3397 -19 3408 -27 14 -56 13 -70 -4z m-474 -1027 c50 -31 126 -138 188 -263 66 -136 96 -210 193 -486 l77 -215 3 -1775 c1 -976 -1 -1856 -4 -1954 l-7 -180 -63 185 c-64 191 -192 514 -219 555 -8 13 -24 24 -35 24 -23 0 -60 -33 -60 -54 0 -8 29 -85 64 -173 213 -528 286 -862 221 -1017 -44 -105 -121 -156 -249 -163 -126 -8 -203 23 -241 98 -31 60 -10 145 52 207 24 23 43 51 43 61 0 39 -181 371 -369 676 -213 346 -303 549 -358 814 -21 104 -26 154 -27 291 l-1 165 81 5 c87 5 114 18 114 56 0 48 -25 57 -130 51 -99 -7 -296 5 -390 24 -198 38 -358 126 -497 272 -91 96 -151 199 -196 335 -46 137 -66 252 -74 425 l-6 138 -48 60 c-116 143 -212 316 -265 474 -30 91 -37 125 -38 198 -1 87 -1 89 31 117 42 38 102 46 233 31 142 -16 256 -42 437 -98 l152 -46 53 42 c199 160 404 252 674 302 70 14 124 29 134 39 9 9 31 58 49 110 94 271 228 533 321 632 63 66 97 74 157 37z m-1762 -3674 c86 -23 172 -72 241 -140 97 -95 161 -205 284 -485 83 -189 185 -324 304 -402 64 -42 168 -78 222 -78 34 0 34 0 34 -47 1 -71 25 -194 49 -248 12 -26 21 -49 21 -51 0 -12 -156 -1 -243 17 -196 40 -331 107 -464 233 -109 102 -179 211 -270 415 -112 252 -147 303 -235 341 -48 21 -61 22 -143 15 -185 -17 -228 -3 -257 80 -42 120 25 255 162 325 79 40 196 50 295 25z m1357 -1012 c58 -98 138 -238 178 -311 l71 -132 -27 -33 c-49 -58 -67 -114 -68 -206 l0 -83 -50 6 c-74 8 -137 44 -163 91 -27 47 -30 118 -8 162 15 30 14 34 -25 109 -54 105 -73 200 -67 329 5 99 32 245 46 245 3 0 54 -80 113 -177z" />
      <g className={blink ? 'cat-anim-blink' : ''} style={{ transformOrigin: '2757px 4588px' }}>
        <path d="M3300 4781 c-90 -47 -126 -184 -80 -305 64 -170 237 -231 333 -117 35 42 50 102 44 177 -14 183 -171 312 -297 245z" />
        <path d="M2215 4396 c-73 -32 -111 -117 -101 -224 10 -113 60 -192 148 -236 62 -31 89 -32 145 -7 57 27 93 83 100 158 19 207 -140 375 -292 309z" />
      </g>
    </g>
  )
}

/* ── Jumping — exact hand-authored artwork ────────────────────────────────── */
function JumpingGroup() {
  return (
    <>
      <g stroke="#000" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M112 97 C80 64 76 28 102 19 C129 10 131 48 113 72" />
        <path d="M104 98 C126 67 183 54 227 75 C258 90 273 116 264 139 C251 170 189 180 135 162 C99 150 84 122 104 98Z" />
        <path d="M217 62 L239 31 L259 72 C278 84 289 105 286 127 C282 158 251 175 221 164 C194 154 180 128 187 101 C190 84 201 70 217 62Z" />
        <path d="M250 144 C275 152 286 171 277 184 C267 198 244 185 229 164" />
        <path d="M213 153 C238 163 246 184 234 195 C219 207 197 187 190 166" />
        <path d="M132 154 C113 177 92 182 83 168 C73 151 93 136 113 130" />
        <path d="M159 165 C145 192 121 200 111 184 C101 168 122 153 142 148" />
      </g>
      <g fill="#000">
        <ellipse cx="232" cy="105" rx="7" ry="12" />
        <ellipse cx="264" cy="108" rx="7" ry="12" />
      </g>
    </>
  )
}

/* ── Sleeping — curled, eyes closed, zzz ──────────────────────────────────── */
function SleepingGroup() {
  return (
    <>
      <path d="M58 36 Q70 34 68 22" fill="none" stroke="black" strokeWidth={STROKE} strokeLinecap="round" />
      <path
        d="M8 38 Q2 30 8 22 Q6 12 16 8 Q26 2 38 6 Q48 2 56 8 Q66 10 66 20 Q74 24 70 34 Q68 40 58 38 Q40 42 24 38 Q14 40 8 38 Z"
        fill="white"
        stroke="black"
        strokeWidth={STROKE}
        strokeLinejoin="round"
      />
      <path d="M18 9 L14 1 L22 7 Z" fill="white" stroke="black" strokeWidth={STROKE - 0.2} strokeLinejoin="round" />
      <path d="M20 22 Q24 25 28 22" fill="none" stroke="black" strokeWidth={STROKE - 0.2} strokeLinecap="round" />
      <text x="64" y="10" fontSize="9" fontFamily="serif" fill="black" className="cat-anim-zzz-1">z</text>
      <text x="71" y="4" fontSize="6.5" fontFamily="serif" fill="black" className="cat-anim-zzz-2">z</text>
    </>
  )
}

/* ── Pawing — sitting, one paw raised with little tap marks ───────────────── */
function PawingGroup({ blink, paw }: { blink?: boolean; paw?: boolean }) {
  return (
    <>
      <path
        d="M14 54 Q6 54 6 42 Q6 30 16 26 Q14 18 20 13 Q22 19 28 17 Q30 11 38 11 Q44 11 46 17 Q52 18 50 25 Q58 29 56 40 Q56 54 48 54 Z"
        fill="white"
        stroke="black"
        strokeWidth={STROKE}
        strokeLinejoin="round"
      />
      <path d="M48 50 Q60 46 56 32" fill="none" stroke="black" strokeWidth={STROKE} strokeLinecap="round" />
      <path d="M19 15 L15 4 L24 12 Z" fill="white" stroke="black" strokeWidth={STROKE} strokeLinejoin="round" />
      <path d="M45 15 L49 4 L40 12 Z" fill="white" stroke="black" strokeWidth={STROKE} strokeLinejoin="round" />
      <Paw x={22} y={53} />
      <g className={paw ? 'cat-anim-paw' : ''} style={{ transformOrigin: '46px 32px' }}>
        <path d="M42 50 Q46 42 46 32" fill="none" stroke="black" strokeWidth={STROKE} strokeLinecap="round" />
        <Paw x={47} y={29} rotate={-30} />
        <path d="M54 20 L58 17 M56 25 L61 24 M54 30 L59 31" stroke="black" strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
      </g>
      <Eyes x1={24} x2={38} y={28} blink={blink} />
    </>
  )
}

/* ── Carrying — walking with a tiny paper in its mouth ────────────────────── */
function CarryingGroup({ blink }: { blink?: boolean }) {
  return (
    <>
      <GroundShadow cx={38} cy={46} rx={20} />
      <path d="M54 26 Q66 22 62 8" fill="none" stroke="black" strokeWidth={STROKE} strokeLinecap="round" />
      <path
        d="M16 26 Q8 26 8 18 Q8 10 16 7 Q18 13 24 11 Q28 5 36 5 Q44 5 48 11 Q54 13 56 7 Q60 11 58 17 Q58 26 50 26 Z"
        fill="white"
        stroke="black"
        strokeWidth={STROKE}
        strokeLinejoin="round"
      />
      <line x1="16" y1="25" x2="14" y2="40" stroke="black" strokeWidth={STROKE} strokeLinecap="round" />
      <line x1="32" y1="26" x2="31" y2="42" stroke="black" strokeWidth={STROKE} strokeLinecap="round" />
      <line x1="48" y1="25" x2="50" y2="40" stroke="black" strokeWidth={STROKE} strokeLinecap="round" />
      <Paw x={14} y={41} />
      <Paw x={31} y={43} />
      <Paw x={50} y={41} />
      <g transform="rotate(-12 10 16)">
        <rect x="-4" y="8" width="16" height="12" fill="white" stroke="black" strokeWidth="1.8" />
        <line x1="-1" y1="12" x2="9" y2="12" stroke="black" strokeWidth="1" opacity="0.5" />
        <line x1="-1" y1="16" x2="7" y2="16" stroke="black" strokeWidth="1" opacity="0.5" />
      </g>
      <Eyes x1={27} x2={40} y={13} blink={blink} />
    </>
  )
}

export function CatGroup({ pose = 'sitting', flip, blink, tailTwitch, peekIn }: Props) {
  const w = POSE_NATIVE_VIEWBOX[pose]?.w ?? CAT_VIEWBOX[pose].w
  let content: ReactNode
  switch (pose) {
    case 'peeking':
      content = <PeekingGroup blink={blink} tailTwitch={tailTwitch} />
      break
    case 'peekingSide':
      content = <PeekingSideGroup blink={blink} tailTwitch={tailTwitch} />
      break
    case 'jumping':
      content = <JumpingGroup />
      break
    case 'walking':
      content = <WalkingGroup />
      break
    case 'sleeping':
      content = <SleepingGroup />
      break
    case 'pawing':
      content = <PawingGroup blink={blink} paw={tailTwitch} />
      break
    case 'sittingEdge':
      content = <SittingEdgeGroup blink={blink} tailTwitch={tailTwitch} />
      break
    case 'carrying':
      content = <CarryingGroup blink={blink} />
      break
    default:
      content = <SittingGroup blink={blink} tailTwitch={tailTwitch} />
  }
  return (
    <g className={peekIn ? 'cat-anim-peek-in' : undefined}>
      <FlipWrap w={w} flip={flip}>
        {content}
      </FlipWrap>
    </g>
  )
}

export default function CatMascot({ pose = 'sitting', flip, blink, tailTwitch, peekIn, className = '', style }: Props) {
  const { w, h } = CAT_VIEWBOX[pose]
  const native = POSE_NATIVE_VIEWBOX[pose]
  const viewBoxStr = native ? `0 0 ${native.w} ${native.h}` : `0 0 ${w} ${h}`
  return (
    <svg viewBox={viewBoxStr} width={w} height={h} className={className} style={style}>
      <CatGroup pose={pose} flip={flip} blink={blink} tailTwitch={tailTwitch} peekIn={peekIn} />
    </svg>
  )
}
