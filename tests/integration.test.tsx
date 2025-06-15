import { describe, it, expect, vi } from 'vitest'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import { NotesList } from '../src/components/NotesList'
import { NoteEditor } from '../src/components/NoteEditor'
import { AppLayout } from '../src/components/AppLayout'
import { notesStore } from '../src/store/NotesStore'

function resetStore() {
  notesStore.notes = []
  notesStore.selectedId = null
}

describe('Components integration', () => {
  it('selects note when clicked in list', () => {
    resetStore()
    notesStore.create()
    notesStore.create()
    const secondId = notesStore.notes[0].id
    render(<NotesList onCreate={() => {}} />)
    const items = screen.getAllByText(/Без названия/)
    fireEvent.click(items[0])
    expect(notesStore.selectedId).toBe(secondId)
  })

  it('delete button triggers store delete', () => {
    resetStore()
    notesStore.create()
    const id = notesStore.selectedId as string
    const spy = vi.spyOn(notesStore, 'delete')
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    render(<AppLayout />)
    const button = screen.getByText('Удалить')
    fireEvent.click(button)
    expect(spy).toHaveBeenCalledWith(id)
    ;(window.confirm as unknown as vi.SpyInstance).mockRestore()
  })

  it('editor updates store on change', async () => {
    vi.useFakeTimers()
    resetStore()
    notesStore.create()
    const id = notesStore.selectedId as string
    const spy = vi.spyOn(notesStore, 'updateContent')
    render(<NoteEditor />)
    const area = screen.getByRole('textbox')
    fireEvent.change(area, { target: { value: 'hi' } })
    await vi.runAllTimersAsync()
    expect(spy).toHaveBeenCalledWith(id, 'hi')
    vi.useRealTimers()
  })
})
