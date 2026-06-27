import { useState } from 'react'

interface Props {
  storyId: string
  storyTitle: string
  className?: string
}

/** Shares the story link via the native share sheet where available, falling
    back to copying the link to the clipboard with brief inline feedback. */
export default function InviteFriendsButton({ storyId, storyTitle, className }: Props) {
  const [copied, setCopied] = useState(false)

  async function handleInvite() {
    const url = `${window.location.origin}/story/${storyId}`
    const shareData = {
      title: 'Improv',
      text: `Help finish "${storyTitle}" — add the next line.`,
      url,
    }

    if (navigator.share && navigator.canShare?.(shareData)) {
      try {
        await navigator.share(shareData)
        return
      } catch {
        // user cancelled or share failed; fall through to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard unavailable; nothing more we can do silently
    }
  }

  return (
    <button type="button" onClick={handleInvite} className={className}>
      {copied ? 'Link Copied!' : 'Invite Friends'}
    </button>
  )
}
