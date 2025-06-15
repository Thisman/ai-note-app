import { makeAutoObservable, runInAction } from 'mobx'
import type { Note } from '../types/note'
import { v4 as uuidv4 } from 'uuid'

const STORAGE_KEY = 'notes'

export class NotesStore {
  notes: Note[] = []
  selectedId: string | null = null

  constructor() {
    makeAutoObservable(this)
    this.load()
  }

  get selected(): Note | undefined {
    return this.notes.find((n) => n.id === this.selectedId)
  }

  load() {
    const data = localStorage.getItem(STORAGE_KEY)
    if (data) {
      try {
        const parsed: Note[] = JSON.parse(data)
        parsed.sort(
          (a, b) =>
            new Date(b.created_at).getTime() -
            new Date(a.created_at).getTime(),
        )
        runInAction(() => {
          this.notes = parsed
          this.selectedId = parsed[0]?.id ?? null
        })
      } catch {
        // ignore invalid data
      }
    }
    if (this.notes.length === 0) {
      this.create()
    }
  }

  save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.notes))
  }

  create() {
    const now = new Date().toISOString()
    const note: Note = {
      id: uuidv4(),
      content: '',
      created_at: now,
      updated_at: now,
      archived: false,
    }
    this.notes.unshift(note)
    this.selectedId = note.id
    this.save()
  }

  updateContent(id: string, content: string) {
    const note = this.notes.find((n) => n.id === id)
    if (note) {
      note.content = content
      note.updated_at = new Date().toISOString()
      this.save()
    }
  }

  delete(id: string) {
    const idx = this.notes.findIndex((n) => n.id === id)
    if (idx >= 0) {
      this.notes.splice(idx, 1)
      const newIndex = idx > 0 ? idx - 1 : 0
      this.selectedId = this.notes[newIndex]?.id ?? null
      if (this.notes.length === 0) {
        this.create()
      } else {
        this.save()
      }
    }
  }
}

export const notesStore = new NotesStore()
