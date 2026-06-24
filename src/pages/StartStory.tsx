import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import BackLink from '../components/ui/BackLink'
import VibeSelector from '../components/ui/VibeSelector'
import CatMascot from '../components/ui/cat/CatMascot'
import { SittingCatDoodle } from '../components/animations/DoodleIcons'
import { createStory } from '../lib/supabase'
import type { Vibe } from '../types'

export default function StartStory() {
  const [title, setTitle] = useState('')
  const [firstLine, setFirstLine] = useState('')
  const [vibes, setVibes] = useState<Vibe[]>([])
  const [name, setName] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [storyId, setStoryId] = useState<string | null>(null)

  const canSubmit = firstLine.trim() && name.trim() && vibes.length > 0 && !submitting

  async function handleSubmit() {
    if (!canSubmit) return
    setSubmitting(true)
    setError('')
    try {
      const story = await createStory(title.trim() || 'Untitled Story', firstLine.trim(), name.trim(), vibes)
      setStoryId(story.id)
    } catch {
      setError('Something went wrong. Please try again.')
      setSubmitting(false)
    }
  }

  if (storyId) {
    return (
      <main className="max-w-2xl mx-auto px-6 py-16 min-h-[70vh] flex flex-col items-center justify-center text-center">
        <style>{`
          @keyframes story-active-pop {
            0%   { transform: scale(0.85); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
          @keyframes story-active-line-in {
            0%   { opacity: 0; transform: translateY(6px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}</style>
        <div className="mb-3" style={{ animation: 'story-active-pop 0.5s ease-out forwards' }}>
          <SittingCatDoodle />
        </div>
        <p
          className="font-mono font-normal text-lg text-black max-w-xs mb-8"
          style={{ animation: 'story-active-line-in 0.5s ease-out 1.6s forwards', opacity: 0 }}
        >
          YAY! The story is active. Let's wait and see how it goes.
        </p>
        <div style={{ animation: 'story-active-line-in 0.5s ease-out 2.1s forwards', opacity: 0 }}>
          <Link to="/archive" className="btn-secondary">
            Go to Archive
          </Link>
          <Link to={`/story/${storyId}`} className="block font-mono font-light text-xs text-black/50 underline mt-6">
            Or view your story
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <div className="fixed top-28 right-0 z-30 pointer-events-none">
        <CatMascot pose="peekingSide" blink tailTwitch style={{ transform: 'translateX(20px)' }} />
      </div>

      <BackLink className="mb-6" />
      <p className="label-sm mb-3">New Story</p>
      <h1 className="font-serif font-medium text-2xl mb-12">Start a Story</h1>

      <div className="space-y-8">
        {/* Title box */}
        <div className="border-[0.5px] border-black/40 bg-white p-5">
          <label className="block label-sm mb-3">
            Story Title (optional)
          </label>
          <input
            type="text"
            className="input-line"
            placeholder="Give it a name…"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>

        {/* First sentence box */}
        <div className="border-[0.5px] border-black/40 bg-white p-5">
          <label className="block label-sm mb-3">
            First Sentence
          </label>
          <textarea
            className="input-line"
            rows={2}
            placeholder="Once upon a time…"
            value={firstLine}
            onChange={e => setFirstLine(e.target.value)}
          />
        </div>

        {/* Vibes */}
        <div>
          <label className="block label-sm mb-3">
            Vibe (pick at least one)
          </label>
          <VibeSelector selected={vibes} onChange={setVibes} disabled={submitting} />
        </div>

        {/* Name */}
        <div className="border-[0.5px] border-black/40 bg-white p-5">
          <label className="block label-sm mb-3">
            Your Name (shown with your line)
          </label>
          <input
            type="text"
            className="input-line"
            placeholder="Anonymous is fine too…"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <Button onClick={handleSubmit} disabled={!canSubmit}>
          {submitting ? 'Beginning…' : 'Begin the Story'}
        </Button>
      </div>
    </main>
  )
}
