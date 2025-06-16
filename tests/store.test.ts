import { describe, it, expect, beforeEach, vi } from 'vitest'
import { NotesStore } from '../src/store/NotesStore'
import type { Note } from '../src/types/note'

beforeEach(() => {
  localStorage.clear()
})

describe('NotesStore', () => {
  it('creates initial note on empty load', () => {
    const store = new NotesStore()
    expect(store.notes).toHaveLength(1)
    expect(store.selectedId).toBe(store.notes[0].id)
  })

  it('loads notes from storage sorted by created_at', () => {
    const older: Note = { id: '1', content: '', created_at: '2020-01-01T00:00:00Z', updated_at: '2020-01-01T00:00:00Z', archived: false }
    const newer: Note = { id: '2', content: '', created_at: '2020-01-02T00:00:00Z', updated_at: '2020-01-02T00:00:00Z', archived: false }
    localStorage.setItem('notes', JSON.stringify([older, newer]))
    const store = new NotesStore()
    expect(store.notes[0].id).toBe('2')
    expect(store.selectedId).toBe('2')
  })

  it('create adds note to beginning', () => {
    const store = new NotesStore()
    store.create()
    expect(store.notes[0].id).toBe(store.selectedId)
  })

  it('updateContent changes content and updated_at', () => {
    const store = new NotesStore()
    const id = store.selectedId as string
    const prev = store.notes[0].updated_at
    // advance time to ensure updated_at changes
    const future = new Date(Date.now() + 1000)
    vi.setSystemTime(future)
    store.updateContent(id, 'hello')
    const note = store.notes[0]
    expect(note.content).toBe('hello')
    expect(note.updated_at).not.toBe(prev)
    vi.useRealTimers()
  })

  it('highlights references to other note titles', () => {
    const store = new NotesStore()
    const firstId = store.selectedId as string
    store.updateContent(firstId, 'First Note')
    store.create()
    const secondId = store.selectedId as string
    store.updateContent(secondId, 'link to first note: first note')
    const content = store.notes.find((n) => n.id === secondId)!.content
    expect(content).toContain('<strong>first note</strong>')
  })

  it('delete removes note and selects another', () => {
    const store = new NotesStore()
    store.create()
    const first = store.notes[0].id
    const second = store.notes[1].id
    store.delete(first)
    expect(store.notes).toHaveLength(1)
    expect(store.notes[0].id).toBe(second)
    expect(store.selectedId).toBe(second)
  })
})
