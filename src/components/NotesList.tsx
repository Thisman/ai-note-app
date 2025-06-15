import { observer } from 'mobx-react-lite'
import { notesStore } from '../store/NotesStore'
import styles from '../styles/Layout.module.css'

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  const today = new Date()
  const yesterday = new Date()
  yesterday.setDate(today.getDate() - 1)
  if (date.toDateString() === today.toDateString()) return 'Сегодня'
  if (date.toDateString() === yesterday.toDateString()) return 'Вчера'
  return date.toLocaleDateString()
}

export const NotesList = observer(() => {
  const groups: Record<string, typeof notesStore.notes> = {}
  notesStore.notes.forEach((n) => {
    const key = formatDate(n.created_at)
    if (!groups[key]) groups[key] = []
    groups[key].push(n)
  })

  const handleSelect = (id: string) => {
    notesStore.selectedId = id
  }

  return (
    <div className={styles.sidebar}>
      {Object.entries(groups).map(([label, notes]) => (
        <div key={label}>
          <div className={styles.dateGroup}>{label}</div>
          {notes.map((note) => {
            const firstLine = note.content.split(/\n/).find((l) => l.trim()) || 'Без названия'
            const active = note.id === notesStore.selectedId
            return (
              <div
                key={note.id}
                onClick={() => handleSelect(note.id)}
                className={`${styles.noteItem} ${active ? styles.noteItemActive : ''}`}
              >
                {firstLine}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
})
