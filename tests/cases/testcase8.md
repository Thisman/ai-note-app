# Test Case 8: Editing note updates store

## Steps
1. Render `NoteEditor` with selected note.
2. Change textarea value.
3. Wait debounce delay.

## Expected
- `notesStore.updateContent` called with new value.
