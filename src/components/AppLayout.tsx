// Main application layout with notes list and editor
import { observer } from "mobx-react-lite";
import { NotesList } from "./NotesList";
import { NoteEditor } from "./NoteEditor";
import { notesStore } from "../store/NotesStore";
import styles from "../styles/Layout.module.css";

export const AppLayout = observer(() => {
  const handleCreate = () => {
    notesStore.create();
  };
  const handleDelete = () => {
    if (notesStore.selected) {
      if (confirm("Удалить заметку?")) {
        notesStore.delete(notesStore.selected.id);
      }
    }
  };

  return (
    <div className={styles.container}>
      <NotesList onCreate={handleCreate} />
      <NoteEditor />
      <div className={styles.footer}>
        {notesStore.selected && (
          <span className={styles.lastSaved}>
            Сохранено:{" "}
            {new Date(notesStore.selected.updated_at).toLocaleString()}
          </span>
        )}
        <button
          className={`${styles.button} ${styles.deleteButton}`}
          onClick={handleDelete}
        >
          Удалить
        </button>
      </div>
    </div>
  );
});
