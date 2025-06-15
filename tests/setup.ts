import '@testing-library/jest-dom'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import { configure } from 'mobx'

configure({ enforceActions: 'never' })

afterEach(() => {
  cleanup()
  localStorage.clear()
})
