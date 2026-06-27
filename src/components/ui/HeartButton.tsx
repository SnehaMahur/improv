import { useState } from 'react'
import { hasReacted, markReacted } from '../../lib/reacted'

const HEART_PATH =
  'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'

interface Props {
  /** Unique id (story id) this heart belongs to — used to remember this device's like. */
  id: string
  count: number
  onReact: () => void
  size?: number
}

/** The clickable whole-story heart — outline by default, fills black once this device has liked it. */
export default function HeartButton({ id, count, onReact, size = 18 }: Props) {
  const [filled, setFilled] = useState(() => hasReacted(id, 'heart'))

  function handleClick() {
    if (filled) return
    markReacted(id, 'heart')
    setFilled(true)
    onReact()
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={filled}
      className={`inline-flex items-center gap-2 transition-opacity duration-150 text-black ${filled ? '' : 'hover:opacity-70'}`}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={filled ? 0 : 1.6} strokeLinejoin="round">
        <path d={HEART_PATH} fill={filled ? 'currentColor' : 'none'} stroke={filled ? 'none' : 'currentColor'} />
      </svg>
      <span className="font-mono text-sm">{count}</span>
    </button>
  )
}
