import { vi, describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { TableGenerator } from '../pages/TableGeneratorPage/TableGenerator'
import { useFileStore } from '../store/useFileStore'

vi.mock('../../components/CloseBtn/CloseBtn', () => ({
  CloseBtn: ({ onClick }) => (
    <button onClick={onClick}>Close</button>
  )
}))

vi.mock('../../components/Container/Container', () => ({
  Container: ({ children }) => <div>{children}</div>
}))

// Мокаем fetch
global.fetch = vi.fn()

describe('TableGenerator', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useFileStore.getState().resetFile()
  })

  it('отображает начальное состояние', () => {
    render(<TableGenerator />)

    expect(
      screen.getByText('Сгенерируйте готовый csv-файл нажатием одной кнопки')
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', { name: /начать генерацию/i })
    ).toBeInTheDocument()

    expect(
      screen.queryByText(/идёт процесс генерации/i)
    ).not.toBeInTheDocument()
  })

  it('отображает процесс генерации и завершение', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      blob: () => Promise.resolve(new Blob(['test'])),
    })

    render(<TableGenerator />)

    const button = screen.getByRole('button', { name: /начать генерацию/i })
    fireEvent.click(button)

    expect(
      screen.getByText(/идёт процесс генерации/i)
    ).toBeInTheDocument()

  })

  it('отображает ошибку при сбое запроса', async () => {
    fetch.mockRejectedValueOnce(new Error('Server error'))

    render(<TableGenerator />)

    fireEvent.click(
      screen.getByRole('button', { name: /начать генерацию/i })
    )

    await waitFor(() => {
      expect(screen.getByText(/Ошибка/i)).toBeInTheDocument()
      expect(screen.getByText(/упс, не то/i)).toBeInTheDocument()
    })
  })
})