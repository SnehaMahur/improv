import { VIBES, type Vibe } from '../../types'

interface Props {
  selected: Vibe[]
  onChange: (vibes: Vibe[]) => void
  disabled?: boolean
}

export default function VibeSelector({ selected, onChange, disabled }: Props) {
  function toggle(vibe: Vibe) {
    if (disabled) return
    onChange(
      selected.includes(vibe)
        ? selected.filter(v => v !== vibe)
        : [...selected, vibe]
    )
  }

  return (
    <div className="flex flex-wrap gap-2">
      {VIBES.map(vibe => {
        const active = selected.includes(vibe)
        return (
          <button
            key={vibe}
            type="button"
            disabled={disabled}
            onClick={() => toggle(vibe)}
            className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wide border-[0.5px] border-black/40 transition-colors duration-150 ${
              active ? 'bg-black text-white' : 'bg-white text-black hover:bg-black/5'
            }`}
          >
            {vibe}
          </button>
        )
      })}
    </div>
  )
}
