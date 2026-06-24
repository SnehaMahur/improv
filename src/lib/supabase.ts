import { createClient } from '@supabase/supabase-js'
import type { Story, StoryLine, StoryWithLines, Vibe, ReactionType, StoryComment } from '../types'
import { MAX_LINES } from '../types'
import {
  mockGetActiveStories,
  mockGetFinishedStories,
  mockGetStoryWithLines,
  mockCreateStory,
  mockAddLineToStory,
  mockReactToLine,
  mockReactToStory,
  mockAddComment,
} from './mockDb'

const envUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

// Without real credentials, fall back to a local (browser-only) mock store
// so the app is fully usable before Supabase is connected.
export const isMock = !envUrl || !envKey

const supabaseUrl = envUrl || 'https://placeholder.supabase.co'
const supabaseAnonKey = envKey || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ── Stories ──────────────────────────────────────────────────────────────────

export async function getActiveStories(): Promise<Story[]> {
  if (isMock) return mockGetActiveStories()
  const { data, error } = await supabase
    .from('stories')
    .select('*')
    .eq('status', 'active')
    .order('last_contribution_at', { ascending: false })
  if (error) throw error
  return data ?? []
}

export async function getFinishedStories(): Promise<Story[]> {
  if (isMock) return mockGetFinishedStories()
  const { data, error } = await supabase
    .from('stories')
    .select('*')
    .eq('status', 'finished')
    .order('updated_at', { ascending: false })
  if (error) throw error
  return data ?? []
}

export async function getStoryWithLines(storyId: string): Promise<StoryWithLines> {
  if (isMock) return mockGetStoryWithLines(storyId)

  const { data: story, error: storyError } = await supabase
    .from('stories')
    .select('*')
    .eq('id', storyId)
    .single()
  if (storyError) throw storyError

  const { data: lines, error: linesError } = await supabase
    .from('story_lines')
    .select('*')
    .eq('story_id', storyId)
    .order('line_number', { ascending: true })
  if (linesError) throw linesError

  const { data: comments, error: commentsError } = await supabase
    .from('story_comments')
    .select('*')
    .eq('story_id', storyId)
    .order('created_at', { ascending: true })
  if (commentsError) throw commentsError

  return { ...story, lines: lines ?? [], comments: comments ?? [] }
}

export async function createStory(
  title: string,
  firstLine: string,
  contributorName: string,
  vibes: Vibe[],
): Promise<Story> {
  if (isMock) return mockCreateStory(title, firstLine, contributorName, vibes)

  const { data: story, error: storyError } = await supabase
    .from('stories')
    .insert({
      title,
      status: 'active',
      line_count: 1,
      vibes,
      preview: firstLine,
      last_contribution_at: new Date().toISOString(),
    })
    .select()
    .single()
  if (storyError) throw storyError

  const { error: lineError } = await supabase
    .from('story_lines')
    .insert({
      story_id: story.id,
      content: firstLine,
      contributor_name: contributorName,
      line_number: 1,
    })
  if (lineError) throw lineError

  return story
}

export async function addLineToStory(
  storyId: string,
  content: string,
  contributorName: string,
  currentLineCount: number,
): Promise<StoryLine> {
  if (isMock) return mockAddLineToStory(storyId, content, contributorName, currentLineCount)

  const newLineNumber = currentLineCount + 1
  const isFinished = newLineNumber >= MAX_LINES
  const now = new Date().toISOString()

  const { data: line, error: lineError } = await supabase
    .from('story_lines')
    .insert({
      story_id: storyId,
      content,
      contributor_name: contributorName,
      line_number: newLineNumber,
    })
    .select()
    .single()
  if (lineError) throw lineError

  const { error: storyError } = await supabase
    .from('stories')
    .update({
      line_count: newLineNumber,
      status: isFinished ? 'finished' : 'active',
      preview: content,
      last_contribution_at: now,
      updated_at: now,
    })
    .eq('id', storyId)
  if (storyError) throw storyError

  return line
}

export async function reactToLine(
  lineId: string,
  reactions: Partial<Record<ReactionType, number>>,
): Promise<void> {
  if (isMock) return mockReactToLine(lineId, reactions)
  const { error } = await supabase
    .from('story_lines')
    .update({ reactions })
    .eq('id', lineId)
  if (error) throw error
}

export async function reactToStory(storyId: string, heartCount: number): Promise<void> {
  if (isMock) return mockReactToStory(storyId, heartCount)
  const { error } = await supabase
    .from('stories')
    .update({ heart_count: heartCount })
    .eq('id', storyId)
  if (error) throw error
}

export async function addComment(
  storyId: string,
  authorName: string,
  content: string,
): Promise<StoryComment> {
  if (isMock) return mockAddComment(storyId, authorName, content)
  const { data, error } = await supabase
    .from('story_comments')
    .insert({ story_id: storyId, author_name: authorName, content })
    .select()
    .single()
  if (error) throw error

  const { data: current } = await supabase
    .from('stories')
    .select('comment_count')
    .eq('id', storyId)
    .single()
  await supabase
    .from('stories')
    .update({ comment_count: (current?.comment_count ?? 0) + 1 })
    .eq('id', storyId)

  return data
}
