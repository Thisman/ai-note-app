# Test Case 4: Update note content

## Steps
1. Create `NotesStore` and add one note.
2. Call `updateContent(id, 'text')`.

## Expected
- Note content updated to 'text'.
- `updated_at` changed (not equal to `created_at`).
