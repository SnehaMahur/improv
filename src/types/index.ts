export type StoryStatus = 'active' | 'finished'

export type Vibe = 'funny' | 'romance' | 'scary' | 'absurd' | 'emotional'

export const VIBES: Vibe[] = ['funny', 'romance', 'scary', 'absurd', 'emotional']

export type ReactionType = 'heart' | 'laugh' | 'happy' | 'sad' | 'angry'

export const REACTION_TYPES: ReactionType[] = ['heart', 'laugh', 'happy', 'sad', 'angry']

export const MAX_LINES = 10

export interface Story {
  id: string
  number: number
  title: string
  status: StoryStatus
  line_count: number
  vibes: Vibe[]
  heart_count: number
  comment_count: number
  preview: string
  created_at: string
  updated_at: string
  last_contribution_at: string
}

export interface StoryLine {
  id: string
  story_id: string
  content: string
  contributor_name: string
  line_number: number
  created_at: string
  reactions: Partial<Record<ReactionType, number>>
}

export interface StoryComment {
  id: string
  story_id: string
  author_name: string
  content: string
  created_at: string
}

export interface StoryWithLines extends Story {
  lines: StoryLine[]
  comments: StoryComment[]
}
