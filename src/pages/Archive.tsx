import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import StoryCard from '../components/ui/StoryCard'
import BackLink from '../components/ui/BackLink'
import CatMascot, { CAT_VIEWBOX } from '../components/ui/cat/CatMascot'
import { getFinishedStories, getActiveStories } from '../lib/supabase'
import type { Story } from '../types'

type Tab = 'finished' | 'active'

// The artwork's paw-line sits ~84% down its own box, not at the bounding-box edge.
const SIT_GROUND_FRACTION = 428 / 512

export default function Archive() {
  const [searchParams, setSearchParams] = useSearchParams()
  const tab: Tab = searchParams.get('tab') === 'active' ? 'active' : 'finished'
  const [finished, setFinished] = useState<Story[]>([])
  const [active, setActive] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const wrapperRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [catPos, setCatPos] = useState({ top: 0, left: 0 })

  useEffect(() => {
    Promise.all([getFinishedStories(), getActiveStories()])
      .then(([f, a]) => {
        setFinished(f)
        setActive(a)
      })
      .catch(() => setError('Could not load the archive.'))
      .finally(() => setLoading(false))
  }, [])

  const stories = tab === 'finished' ? finished : active

  // Sit on top of the first card's outline, on the right side — whichever tab has stories.
  useEffect(() => {
    if (loading || stories.length === 0) return
    if (!wrapperRef.current || !contentRef.current) return
    const wrapperRect = wrapperRef.current.getBoundingClientRect()
    const grid = contentRef.current.querySelector(':scope > .grid')
    const landingEl = (grid?.firstElementChild ?? contentRef.current.firstElementChild) as HTMLElement | null
    const targetRect = (landingEl ?? contentRef.current).getBoundingClientRect()

    const sitW = CAT_VIEWBOX.sitting.w
    const sitH = CAT_VIEWBOX.sitting.h

    setCatPos({
      top: targetRect.top - wrapperRect.top - sitH * SIT_GROUND_FRACTION,
      left: targetRect.right - wrapperRect.left - sitW - 12,
    })
  }, [tab, loading, stories.length])

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <BackLink className="mb-6" />
      <p className="label-sm mb-3">Archive</p>
      <h1 className="font-serif font-medium text-2xl mb-10">Story Archive</h1>

      <div ref={wrapperRef} className="relative">
        {!loading && stories.length > 0 && (
          <div className="absolute z-10 pointer-events-none" style={{ top: catPos.top, left: catPos.left }}>
            <CatMascot pose="sitting" blink tailTwitch />
          </div>
        )}

        {/* Tabs */}
        <div className="flex border-[0.5px] border-black/40 mb-12 w-fit">
          <button
            onClick={() => setSearchParams({})}
            className={`px-5 py-2.5 text-sm font-mono uppercase tracking-wide transition-colors duration-150 ${
              tab === 'finished' ? 'bg-black text-white' : 'bg-transparent hover:bg-black/5'
            }`}
          >
            Finished ({finished.length})
          </button>
          <button
            onClick={() => setSearchParams({ tab: 'active' })}
            className={`px-5 py-2.5 text-sm font-mono uppercase tracking-wide border-l-[0.5px] border-black/40 transition-colors duration-150 ${
              tab === 'active' ? 'bg-black text-white' : 'bg-transparent hover:bg-black/5'
            }`}
          >
            Active ({active.length})
          </button>
        </div>

        <div ref={contentRef}>
          {loading && (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="border border-gray-200 bg-white p-6 animate-pulse">
                  <div className="h-5 bg-gray-100 w-1/2 mb-3" />
                  <div className="h-1 bg-gray-100 w-full" />
                </div>
              ))}
            </div>
          )}

          {error && <p className="text-sm text-red-600">{error}</p>}

          {!loading && !error && stories.length === 0 && (
            <div className="border border-dashed border-gray-300 bg-white p-16 text-center">
              <p className="font-serif italic text-lg text-gray-400">
                {tab === 'finished' ? 'No finished stories yet.' : 'No active stories yet.'}
              </p>
            </div>
          )}

          {!loading && stories.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {stories.map(story => (
                <StoryCard key={story.id} story={story} linkTo={`/story/${story.id}`} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
