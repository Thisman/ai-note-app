import { observer } from 'mobx-react-lite'
import { NotesList } from './NotesList'
import { NoteEditor } from './NoteEditor'
import { notesStore } from '../store/NotesStore'
import styles from '../styles/Layout.module.css'

export const AppLayout = observer(() => {
  const handleCreate = () => {
    notesStore.create()
  }
  const handleDelete = () => {
    if (notesStore.selected) {
      if (confirm('Удалить заметку?')) {
        notesStore.delete(notesStore.selected.id)
      }
    }
  }

  return (
    <div className={styles.container}>
      <NotesList />
      <NoteEditor />
      <div className={styles.footer}>
        <button onClick={handleCreate}>Создать</button>
        <button onClick={handleDelete}>Удалить</button>
      </div>
    </div>
  )
})
