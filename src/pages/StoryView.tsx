import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import BackLink from '../components/ui/BackLink'
import VibeBadge from '../components/ui/VibeBadge'
import ReactionPicker from '../components/ui/ReactionPicker'
import HeartButton from '../components/ui/HeartButton'
import CatMascot from '../components/ui/cat/CatMascot'
import HighFiveAnimation from '../components/animations/HighFiveAnimation'
import TurnAnimation from '../components/animations/TurnAnimation'
import { getStoryWithLines, addLineToStory, reactToLine, reactToStory, addComment } from '../lib/supabase'
import type { StoryWithLines, ReactionType } from '../types'
import { MAX_LINES } from '../types'

export default function StoryView() {
  const { id } = useParams<{ id: string }>()
  const [story, setStory] = useState<StoryWithLines | null>(null)
  const [loading, setLoading] = useState(true)
  const [newLine, setNewLine] = useState('')
  const [name, setName] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [commentText, setCommentText] = useState('')
  const [commentName, setCommentName] = useState('')
  const [showCompletion, setShowCompletion] = useState(false)
  const [justCompleted, setJustCompleted] = useState(false)
  const [showTurnPassed, setShowTurnPassed] = useState(false)
  const [showContributors, setShowContributors] = useState(false)

  useEffect(() => {
    if (!id) return
    window.scrollTo(0, 0)
    getStoryWithLines(id)
      .then(setStory)
      .catch(() => setError('Story not found.'))
      .finally(() => setLoading(false))
  }, [id])

  async function handleAddLine() {
    if (!story || !newLine.trim() || !name.trim()) return

    const lastAuthor = story.lines[story.lines.length - 1]?.contributor_name
    if (lastAuthor && lastAuthor.trim().toLowerCase() === name.trim().toLowerCase()) {
      setError("It's someone else's turn to continue this one.")
      return
    }

    setSubmitting(true)
    setError('')
    try {
      await addLineToStory(story.id, newLine.trim(), name.trim(), story.line_count)
      const updated = await getStoryWithLines(story.id)
      setStory(updated)
      setNewLine('')
      if (updated.status === 'finished') {
        setShowCompletion(true)
      } else {
        setShowTurnPassed(true)
      }
    } catch {
      setError('Could not add your line. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleLineReaction(lineId: string, type: ReactionType) {
    if (!story) return
    const line = story.lines.find(l => l.id === lineId)
    if (!line) return
    const updatedReactions = { ...line.reactions, [type]: (line.reactions[type] ?? 0) + 1 }
    setStory({
      ...story,
      lines: story.lines.map(l => (l.id === lineId ? { ...l, reactions: updatedReactions } : l)),
    })
    try {
      await reactToLine(lineId, updatedReactions)
    } catch {
      // optimistic UI; ignore failure silently for reactions
    }
  }

  async function handleStoryHeart() {
    if (!story) return
    const updatedCount = (story.heart_count ?? 0) + 1
    setStory({ ...story, heart_count: updatedCount })
    try {
      await reactToStory(story.id, updatedCount)
    } catch {
      // optimistic UI; ignore failure silently
    }
  }

  async function handleAddComment() {
    if (!story || !commentText.trim() || !commentName.trim()) return
    try {
      const comment = await addComment(story.id, commentName.trim(), commentText.trim())
      setStory({
        ...story,
        comments: [...story.comments, comment],
        comment_count: (story.comment_count ?? 0) + 1,
      })
      setCommentText('')
    } catch {
      setError('Could not post your comment.')
    }
  }

  if (showCompletion) {
    return (
      <HighFiveAnimation
        onComplete={() => {
          setShowCompletion(false)
          setJustCompleted(true)
        }}
      />
    )
  }

  if (showTurnPassed && story) {
    return <TurnAnimation message="Next turn is somebody else's." storyId={story.id} storyTitle={story.title} />
  }

  if (loading) {
    return (
      <main className="flex-1 overflow-y-auto max-w-2xl mx-auto w-full px-6 pt-6 pb-16">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-100 w-1/2" />
          <div className="h-4 bg-gray-100 w-full" />
          <div className="h-4 bg-gray-100 w-3/4" />
        </div>
      </main>
    )
  }

  if (error && !story) {
    return (
      <main className="flex-1 overflow-y-auto max-w-2xl mx-auto w-full px-6 pt-6 pb-16">
        <p className="text-red-600">{error}</p>
      </main>
    )
  }

  if (!story) return null

  const isFinished = story.status === 'finished'
  const isActive = !isFinished
  const progress = Math.round((story.line_count / MAX_LINES) * 100)

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <main className={`max-w-2xl mx-auto w-full px-6 pt-6 flex-1 overflow-y-auto ${isActive ? '' : 'pb-16'}`}>
        {!(isFinished && justCompleted) && <BackLink className="mb-6" />}

        {isFinished ? (
          /* Finished stories: card with vibe, number, title, body — and a cat peeking on top */
          <div className="relative mb-4">
            <div className="absolute z-10 pointer-events-none" style={{ top: -52, right: 28 }}>
              <CatMascot pose="peeking" blink tailTwitch />
            </div>

            <div className={`border-[0.5px] border-black/40 bg-white p-6 ${justCompleted ? 'letter-open' : ''}`}>
              <span className="block font-mono font-light text-xs text-black/50 mb-1">
                #{story.number}
              </span>

              <div className="flex items-start justify-between gap-4 mb-1">
                <h1 className="font-serif font-medium text-2xl">{story.title}</h1>
                {story.vibes?.length > 0 && (
                  <div className="shrink-0">
                    <VibeBadge vibe={story.vibes[0]} />
                  </div>
                )}
              </div>

              <p className="font-mono font-light text-xs text-black/50 mb-4">
                Finished on{' '}
                {new Date(story.updated_at).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>

              <hr className="border-t-[0.5px] border-black/20 mb-4" />

              <p className="text-base font-normal leading-relaxed">
                {story.lines.map(l => l.content).join(' ')}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowContributors(s => !s)}
              className="font-mono font-light text-xs text-black underline mt-4"
            >
              {showContributors ? 'Hide who wrote this' : 'See who wrote this & reactions'}
            </button>

            {showContributors && (
              <div className="space-y-7 mt-6">
                {story.lines.map((line, i) => (
                  <div key={line.id} className="flex gap-4">
                    <span className="font-mono font-light text-xs text-black pt-1 w-6 shrink-0 text-right">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1">
                      <p className="text-base font-normal leading-relaxed">{line.content}</p>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-xs font-mono font-light text-black/40">— {line.contributor_name}</p>
                        <ReactionPicker
                          id={line.id}
                          reactions={line.reactions ?? {}}
                          onReact={type => handleLineReaction(line.id, type)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Number, title (with vibe to the right), then the lines — plain on the page, no card */}
            <span className="block font-mono font-light text-xs text-black/50 mb-1">
              #{story.number}
            </span>

            <div className="flex items-start justify-between gap-4 mb-4">
              <h1 className="font-serif font-medium text-2xl">{story.title}</h1>
              {story.vibes?.length > 0 && (
                <div className="shrink-0">
                  <VibeBadge vibe={story.vibes[0]} />
                </div>
              )}
            </div>

            {/* Progress bar below the title */}
            <div className="w-full h-1 bg-black/10 mb-7">
              <div className="h-full bg-black transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>

            <p className="text-xs font-mono font-light text-black/50 mb-7">
              {story.line_count}/{MAX_LINES} lines
            </p>

            {/* Story lines */}
            <div className="space-y-7 mb-8">
              {story.lines.map((line, i) => (
                <div key={line.id} className="flex gap-4">
                  <span className="font-mono font-light text-xs text-black pt-1 w-6 shrink-0 text-right">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1">
                    <p className="text-base font-normal leading-relaxed">{line.content}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs font-mono font-light text-black/40">— {line.contributor_name}</p>
                      <ReactionPicker
                        id={line.id}
                        reactions={line.reactions ?? {}}
                        onReact={type => handleLineReaction(line.id, type)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}


        {isFinished && justCompleted && (
          <div className="flex justify-end mb-8">
            <Link to="/archive" className="btn-primary text-xs px-4 py-2">
              Go to Archive
            </Link>
          </div>
        )}

        {/* Whole-story reaction + comments — finished stories only, below the card */}
        {isFinished && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif font-medium text-lg">Comments</h2>
              <HeartButton id={story.id} count={story.heart_count ?? 0} onReact={handleStoryHeart} />
            </div>

            {/* Comments list */}
            <div className="space-y-5 mb-8">
              {story.comments.length === 0 && (
                <p className="text-sm text-black/40 font-mono font-light">No comments yet.</p>
              )}
              {story.comments.map(c => (
                <div key={c.id} className="border-l border-black pl-4">
                  <p className="text-sm leading-relaxed">{c.content}</p>
                  <p className="text-xs font-mono font-light text-black/40 mt-1">— {c.author_name}</p>
                </div>
              ))}
            </div>

            {/* Add comment — folder-styled, edge-to-edge like the line composer */}
            <div className="-mx-6">
              <div className="flex pl-4">
                <div className="bg-white border-[0.5px] border-b-0 border-black/40 rounded-t-md px-4 py-1.5">
                  <span className="font-mono text-xs uppercase tracking-wide text-black/70">Comment</span>
                </div>
              </div>
              <div className="bg-white border-[0.5px] border-black/40 -mt-px p-4 pb-3 space-y-4">
                <textarea
                  className="input-line"
                  rows={2}
                  placeholder="Leave a comment…"
                  value={commentText}
                  onChange={e => setCommentText(e.target.value)}
                />
                <input
                  type="text"
                  className="input-line"
                  placeholder="Your name…"
                  value={commentName}
                  onChange={e => setCommentName(e.target.value)}
                />
                <Button onClick={handleAddComment} disabled={!commentText.trim() || !commentName.trim()}>
                  Post Comment
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>

      {isActive && (
        <div style={{ backgroundColor: '#f5ede8' }}>
          <div className="max-w-2xl mx-auto pt-3">
            <div className="flex pl-4">
              <div className="bg-white border-[0.5px] border-b-0 border-black/40 rounded-t-md px-4 py-1.5">
                <span className="font-mono text-xs uppercase tracking-wide text-black/70">
                  Line {Math.min(story.line_count + 1, MAX_LINES)}
                </span>
              </div>
            </div>
            <div className="bg-white border-[0.5px] border-black/40 -mt-px p-4 pb-3">
              {error && <p className="text-xs text-red-600 mb-2">{error}</p>}
              <textarea
                className="input-line w-full resize-none mb-2"
                rows={1}
                placeholder="Continue the story…"
                value={newLine}
                onChange={e => setNewLine(e.target.value)}
                disabled={submitting}
              />
              <div className="flex gap-2 items-stretch">
                <input
                  type="text"
                  className="input-line flex-1"
                  placeholder="Name…"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  disabled={submitting}
                />
                <Button
                  onClick={handleAddLine}
                  disabled={!newLine.trim() || !name.trim() || submitting}
                  className="!px-4 !py-2 text-xs whitespace-nowrap"
                >
                  {submitting ? '…' : story.line_count === MAX_LINES - 1 ? 'Finish' : 'Add'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
