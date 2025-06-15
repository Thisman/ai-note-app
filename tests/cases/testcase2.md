# Test Case 2: Load from existing storage

## Steps
1. Store two notes in LocalStorage with different `created_at` timestamps.
2. Create `NotesStore` instance.

## Expected
- `notes` sorted by `created_at` descending.
- `selectedId` is id of the most recent note.
