const CHAT_SESSIONS_STORAGE_KEY = 'tumbuhChatSessions'
const DRAFT_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000

function parseSessions(rawValue) {
  if (!rawValue) {
    return []
  }

  try {
    const parsedValue = JSON.parse(rawValue)
    return Array.isArray(parsedValue) ? parsedValue : []
  } catch {
    return []
  }
}

function sortSessions(sessions) {
  return [...sessions].sort((a, b) => (b.updatedAt ?? 0) - (a.updatedAt ?? 0))
}

function pruneExpiredDrafts(sessions) {
  const now = Date.now()

  return sessions.filter((session) => {
    if (session.status === 'saved') {
      return true
    }

    return now - (session.updatedAt ?? now) <= DRAFT_MAX_AGE_MS
  })
}

export function generateChatSessionId() {
  return `chat_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}

export function loadChatSessions() {
  if (typeof window === 'undefined') {
    return []
  }

  const sessions = parseSessions(window.localStorage.getItem(CHAT_SESSIONS_STORAGE_KEY))
  const prunedSessions = sortSessions(pruneExpiredDrafts(sessions))

  window.localStorage.setItem(CHAT_SESSIONS_STORAGE_KEY, JSON.stringify(prunedSessions))
  return prunedSessions
}

export function upsertChatSessionRecord(record) {
  if (typeof window === 'undefined') {
    return record
  }

  const sessions = loadChatSessions()
  const nextSessions = sessions.filter((session) => session.id !== record.id)
  nextSessions.unshift(record)

  const sortedSessions = sortSessions(nextSessions)
  window.localStorage.setItem(CHAT_SESSIONS_STORAGE_KEY, JSON.stringify(sortedSessions))

  return record
}
