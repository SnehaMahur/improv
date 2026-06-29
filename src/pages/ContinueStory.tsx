import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import StoryCard from '../components/ui/StoryCard'
import BackLink from '../components/ui/BackLink'
import { getActiveStories } from '../lib/supabase'
import type { Story } from '../types'

export default function ContinueStory() {
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getActiveStories()
      .then(setStories)
      .catch(() => setError('Could not load stories.'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="max-w-5xl mx-auto px-6 pt-6 pb-16">
      <BackLink className="mb-6" />
      <p className="label-sm mb-3">Active</p>
      <div className="flex items-end justify-between mb-12">
        <h1 className="font-serif font-medium text-2xl">Continue a Story</h1>
        <Link to="/start" className="btn-secondary text-sm hidden sm:flex">
          + New Story
        </Link>
      </div>

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
          <p className="text-gray-400 mb-6">No active stories yet.</p>
          <Link to="/start" className="btn-primary">
            Be the first →
          </Link>
        </div>
      )}

      {!loading && stories.length > 0 && (
        <div className="grid sm:grid-cols-2 gap-5">
          {stories.map(story => (
            <StoryCard
              key={story.id}
              story={story}
              linkTo={`/story/${story.id}`}
            />
          ))}
        </div>
      )}
    </main>
  )
}
