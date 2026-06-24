import type { Story, StoryLine, StoryWithLines, Vibe, ReactionType, StoryComment } from '../types'
import { MAX_LINES } from '../types'

const KEY = 'improv_mock_db_v1'

interface DB {
  stories: Story[]
  lines: StoryLine[]
  comments: StoryComment[]
}

function load(): DB {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return normalize(JSON.parse(raw))
  } catch {
    // ignore corrupt storage
  }
  const seeded = buildSeedDb()
  save(seeded)
  return seeded
}

/** Backfills fields added after a user's local data was first created. */
function normalize(db: DB): DB {
  for (const story of db.stories) {
    if (typeof story.comment_count !== 'number') {
      story.comment_count = db.comments.filter(c => c.story_id === story.id).length
    }
  }
  return db
}

function save(db: DB) {
  localStorage.setItem(KEY, JSON.stringify(db))
}

function uuid() {
  return crypto.randomUUID()
}

const FUNNY_STORY_LINES: [string, string][] = [
  ['Maya', 'I accidentally sent "I can\'t stand my boss" to the work group chat instead of my best friend.'],
  ['Devon', 'My boss replied with a single thumbs up before anyone else saw it.'],
  ['Maya', 'I spent the next ten minutes pretending my phone had been stolen.'],
  ['Priya', 'Then my coworker texted, "lol we all needed a laugh today."'],
  ['Sam', 'Turns out three other people had sent the exact same message that week.'],
  ['Devon', 'HR sent out a calendar invite titled "Group Chat Etiquette (Optional but Strongly Encouraged)."'],
  ['Priya', 'Half the office showed up just to see who would make eye contact with the boss.'],
  ['Maya', 'He opened the meeting by thanking us for our "honest feedback."'],
  ['Sam', 'Somehow this made him more popular than the actual team-building retreat.'],
  ['Devon', 'Now there\'s a sticky note on the printer that just says "check the recipient."'],
]

/** A starter example in each tab, so a first-time visitor knows what to do. */
function buildSeedDb(): DB {
  const stories: Story[] = []
  const lines: StoryLine[] = []
  const now = new Date()

  // One finished, funny example story.
  const finishedId = uuid()
  const finishedCreated = new Date(now.getTime() - FUNNY_STORY_LINES.length * 60_000).toISOString()
  FUNNY_STORY_LINES.forEach(([author, content], i) => {
    lines.push({
      id: uuid(),
      story_id: finishedId,
      content,
      contributor_name: author,
      line_number: i + 1,
      reactions: {},
      created_at: new Date(now.getTime() - (FUNNY_STORY_LINES.length - i) * 60_000).toISOString(),
    })
  })
  stories.push({
    id: finishedId,
    number: 1,
    title: 'The Group Chat Disaster',
    status: 'finished',
    line_count: FUNNY_STORY_LINES.length,
    vibes: ['funny'],
    heart_count: 6,
    comment_count: 0,
    preview: FUNNY_STORY_LINES[FUNNY_STORY_LINES.length - 1][1],
    created_at: finishedCreated,
    updated_at: now.toISOString(),
    last_contribution_at: now.toISOString(),
  })

  // One active example story, ready for someone to continue.
  const activeId = uuid()
  const activeFirstLine = 'The Wi-Fi password was taped under the office plant, shaped like a tiny treasure map.'
  lines.push({
    id: uuid(),
    story_id: activeId,
    content: activeFirstLine,
    contributor_name: 'Alex',
    line_number: 1,
    reactions: {},
    created_at: now.toISOString(),
  })
  stories.push({
    id: activeId,
    number: 2,
    title: 'The Wi-Fi Password Mystery',
    status: 'active',
    line_count: 1,
    vibes: ['absurd'],
    heart_count: 0,
    comment_count: 0,
    preview: activeFirstLine,
    created_at: now.toISOString(),
    updated_at: now.toISOString(),
    last_contribution_at: now.toISOString(),
  })

  return { stories, lines, comments: [] }
}

export function mockGetActiveStories(): Story[] {
  return load().stories
    .filter(s => s.status === 'active')
    .sort((a, b) => +new Date(b.last_contribution_at) - +new Date(a.last_contribution_at))
}

export function mockGetFinishedStories(): Story[] {
  return load().stories
    .filter(s => s.status === 'finished')
    .sort((a, b) => +new Date(b.updated_at) - +new Date(a.updated_at))
}

export function mockGetStoryWithLines(storyId: string): StoryWithLines {
  const db = load()
  const story = db.stories.find(s => s.id === storyId)
  if (!story) throw new Error('Story not found')
  const lines = db.lines
    .filter(l => l.story_id === storyId)
    .sort((a, b) => a.line_number - b.line_number)
  const comments = db.comments
    .filter(c => c.story_id === storyId)
    .sort((a, b) => +new Date(a.created_at) - +new Date(b.created_at))
  return { ...story, lines, comments }
}

export function mockCreateStory(
  title: string,
  firstLine: string,
  contributorName: string,
  vibes: Vibe[],
): Story {
  const db = load()
  const now = new Date().toISOString()
  const story: Story = {
    id: uuid(),
    number: db.stories.length + 1,
    title,
    status: 'active',
    line_count: 1,
    vibes,
    heart_count: 0,
    comment_count: 0,
    preview: firstLine,
    created_at: now,
    updated_at: now,
    last_contribution_at: now,
  }
  const line: StoryLine = {
    id: uuid(),
    story_id: story.id,
    content: firstLine,
    contributor_name: contributorName,
    line_number: 1,
    reactions: {},
    created_at: now,
  }
  db.stories.push(story)
  db.lines.push(line)
  save(db)
  return story
}

export function mockAddLineToStory(
  storyId: string,
  content: string,
  contributorName: string,
  currentLineCount: number,
): StoryLine {
  const db = load()
  const story = db.stories.find(s => s.id === storyId)
  if (!story) throw new Error('Story not found')

  const newLineNumber = currentLineCount + 1
  const isFinished = newLineNumber >= MAX_LINES
  const now = new Date().toISOString()

  const line: StoryLine = {
    id: uuid(),
    story_id: storyId,
    content,
    contributor_name: contributorName,
    line_number: newLineNumber,
    reactions: {},
    created_at: now,
  }
  db.lines.push(line)

  story.line_count = newLineNumber
  story.status = isFinished ? 'finished' : 'active'
  story.preview = content
  story.last_contribution_at = now
  story.updated_at = now

  save(db)
  return line
}

export function mockReactToLine(lineId: string, reactions: Partial<Record<ReactionType, number>>) {
  const db = load()
  const line = db.lines.find(l => l.id === lineId)
  if (!line) return
  line.reactions = reactions
  save(db)
}

export function mockReactToStory(storyId: string, heartCount: number) {
  const db = load()
  const story = db.stories.find(s => s.id === storyId)
  if (!story) return
  story.heart_count = heartCount
  save(db)
}

export function mockAddComment(storyId: string, authorName: string, content: string): StoryComment {
  const db = load()
  const comment: StoryComment = {
    id: uuid(),
    story_id: storyId,
    author_name: authorName,
    content,
    created_at: new Date().toISOString(),
  }
  db.comments.push(comment)
  const story = db.stories.find(s => s.id === storyId)
  if (story) story.comment_count = (story.comment_count ?? 0) + 1
  save(db)
  return comment
}
