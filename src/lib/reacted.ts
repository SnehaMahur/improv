const KEY_PREFIX = 'improv_reacted_'

/** Tracks which reactions this device has already given, so liking is a one-way toggle. */
export function hasReacted(id: string, type: string): boolean {
  try {
    return localStorage.getItem(KEY_PREFIX + id + '_' + type) === '1'
  } catch {
    return false
  }
}

export function markReacted(id: string, type: string) {
  try {
    localStorage.setItem(KEY_PREFIX + id + '_' + type, '1')
  } catch {
    // ignore storage failures (private browsing, quota, etc.)
  }
}
