import { Link } from 'react-router-dom'
import type { Story } from '../../types'
import { MAX_LINES } from '../../types'
import VibeBadge from './VibeBadge'

interface Props {
  story: Story
  linkTo?: string
}

export default function StoryCard({ story, linkTo }: Props) {
  const isFinished = story.status === 'finished'

  const card = (
    <div className="h-full border-[0.5px] border-black/40 bg-white p-5 hover:bg-black/5 transition-colors duration-150 cursor-pointer group">
      {story.vibes?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {story.vibes.map(v => (
            <VibeBadge key={v} vibe={v} />
          ))}
        </div>
      )}

      <span className="block font-mono font-light text-xs text-black/50 mb-1">
        #{story.number}
      </span>

      <div className="flex items-baseline justify-between gap-3 mb-2">
        <h3 className="font-serif font-medium text-lg leading-snug">{story.title}</h3>
        {isFinished && (
          <span className="shrink-0 font-mono font-light text-xs text-black/50">
            {new Date(story.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        )}
      </div>

      <hr className="border-t-[0.5px] border-black/20 mb-3" />

      {story.preview && (
        <p className="text-sm italic text-black/50 leading-snug mb-3 line-clamp-2">
          "{story.preview}"
        </p>
      )}

      {isFinished ? (
        <div className="flex items-center gap-3 text-xs font-mono font-medium text-black">
          <span className="inline-flex items-center gap-1">
            <svg width={13} height={13} viewBox="0 0 24 24" className="shrink-0">
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill="currentColor"
              />
            </svg>
            {story.heart_count ?? 0}
          </span>
          <span>
            Comments {story.comment_count ?? 0}
          </span>
        </div>
      ) : (
        <span className="text-xs font-mono font-light border-[0.5px] border-current px-2 py-0.5">
          {story.line_count}/{MAX_LINES}
        </span>
      )}
    </div>
  )

  if (linkTo) {
    return <Link to={linkTo} className="block h-full">{card}</Link>
  }
  return card
}
