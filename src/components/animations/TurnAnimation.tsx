import { RunningCatDoodle } from './DoodleIcons'
import InviteFriendsButton from '../ui/InviteFriendsButton'

interface Props {
  message: string
  storyId: string
  storyTitle: string
  onViewProgress: () => void
}

/** Confirmation shown after passing a turn — stays up until the user picks where
    to go next, rather than auto-dismissing back into the story. Rendered as normal
    page content (not a fixed full-viewport overlay) so the header stays visible. */
export default function TurnAnimation({ message, storyId, storyTitle, onViewProgress }: Props) {
  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center px-10 text-center" style={{ backgroundColor: '#f5ede8' }}>
      <style>{`
        @keyframes turn-pop {
          0%   { transform: scale(0.85); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes turn-line-in {
          0%   { opacity: 0; transform: translateY(6px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={{ animation: 'turn-pop 0.5s ease-out forwards' }}>
        <RunningCatDoodle />
      </div>

      <p
        className="font-mono font-normal text-sm text-black/60 max-w-xs mt-6"
        style={{ animation: 'turn-line-in 0.5s ease-out 1.4s forwards', opacity: 0 }}
      >
        You added a sentence.
      </p>

      <p
        className="font-mono font-normal text-lg text-black max-w-xs mb-8"
        style={{ animation: 'turn-line-in 0.5s ease-out 1.9s forwards', opacity: 0 }}
      >
        {message}
      </p>

      <div className="flex gap-2 w-full max-w-xs" style={{ animation: 'turn-line-in 0.5s ease-out 2.4s forwards', opacity: 0 }}>
        <button onClick={onViewProgress} className="btn-primary flex-1 !px-2 text-[10px] tracking-normal uppercase py-3 whitespace-nowrap">
          View Progress
        </button>
        <InviteFriendsButton
          storyId={storyId}
          storyTitle={storyTitle}
          className="btn-secondary flex-1 !px-2 text-[10px] tracking-normal uppercase py-3 whitespace-nowrap"
        />
      </div>
    </main>
  )
}
