import type { Vibe } from '../../types'

export default function VibeBadge({ vibe }: { vibe: Vibe }) {
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-black text-white text-[10px] font-mono uppercase tracking-wide">
      {vibe}
    </span>
  )
}
