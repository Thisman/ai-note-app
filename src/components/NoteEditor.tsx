import { observer } from 'mobx-react-lite'
import { useState, useEffect } from 'react'
import { notesStore } from '../store/NotesStore'
import styles from '../styles/Layout.module.css'

export const NoteEditor = observer(() => {
  const note = notesStore.selected
  const [value, setValue] = useState(note?.content || '')

  useEffect(() => {
    setValue(note?.content || '')
  }, [note?.id])

  useEffect(() => {
    const handler = setTimeout(() => {
      if (note) {
        notesStore.updateContent(note.id, value)
      }
    }, 300)
    return () => clearTimeout(handler)
  }, [value, note])

  if (!note) return null

  return (
    <div className={styles.editor}>
      <textarea
        style={{ width: '100%', height: 'calc(100vh - 80px)' }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
})
