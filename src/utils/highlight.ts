import type { Note } from '../types/note'

// Highlight references to other note titles with <strong> tags
export function highlightReferences(content: string, notes: Note[], currentId: string): string {
  let result = content
  const titles = notes
    .filter((n) => n.id !== currentId)
    .map((n) => n.content.split(/\n/).find((l) => l.trim())?.trim() ?? '')
    .filter(Boolean)

  for (const title of titles) {
    const escaped = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regex = new RegExp(escaped, 'gi')
    result = result.replace(regex, (m) => `<strong>${m}</strong>`)
  }

  return result
}
