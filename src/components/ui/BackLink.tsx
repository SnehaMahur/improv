import { useNavigate } from 'react-router-dom'

interface Props {
  to?: string
  className?: string
}

export default function BackLink({ to, className = '' }: Props) {
  const navigate = useNavigate()

  return (
    <button
      type="button"
      onClick={() => (to ? navigate(to) : navigate(-1))}
      className={`inline-flex items-center gap-1 text-xs font-mono font-light text-black/50 hover:text-black transition-colors duration-150 ${className}`}
    >
      <span aria-hidden="true">‹</span> Back
    </button>
  )
}
