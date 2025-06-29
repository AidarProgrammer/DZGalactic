import { describe, it, expect, beforeEach } from 'vitest'
import { useFileStore } from '../store/useFileStore'

describe('useFileStore', () => {
  let store

  beforeEach(() => {
    store = useFileStore.getState()
    useFileStore.setState({
      uploadedFile: null,
      metrics: null,
      isInvalidType: false,
      isProcessing: false,
      isDone: false,
    })
  })

  it('Проверка начального состояния store', () => {
    expect(store.uploadedFile).toBe(null)
    expect(store.metrics).toBe(null)
    expect(store.isInvalidType).toBe(false)
    expect(store.isProcessing).toBe(false)
    expect(store.isDone).toBe(false)
  })

  it('Установка uploadedFile', () => {
    const fakeFile = new File(['hello'], 'hello.txt', { type: 'text/plain' })
    store.setUploadedFile(fakeFile)
    expect(useFileStore.getState().uploadedFile).toBe(fakeFile)
  })

  it('Установка metrics', () => {
    const metrics = { size: 123, rows: 20 }
    store.setMetrics(metrics)
    expect(useFileStore.getState().metrics).toEqual(metrics)
  })

  it('Установка isInvalidType', () => {
    store.setIsInvalidType(true)
    expect(useFileStore.getState().isInvalidType).toBe(true)
  })

  it('Установка isProcessing', () => {
    store.setIsProcessing(true)
    expect(useFileStore.getState().isProcessing).toBe(true)
  })

  it('Установка isDone', () => {
    store.setIsDone(true)
    expect(useFileStore.getState().isDone).toBe(true)
  })

  it('Усттанов state', () => {
    // Изменим все поля
    const fakeFile = new File(['data'], 'data.csv', { type: 'text/csv' })
    store.setUploadedFile(fakeFile)
    store.setMetrics({ test: 1 })
    store.setIsInvalidType(true)
    store.setIsProcessing(true)
    store.setIsDone(true)

    store.resetFile()

    const current = useFileStore.getState()
    expect(current.uploadedFile).toBe(null)
    expect(current.metrics).toBe(null)
    expect(current.isInvalidType).toBe(false)
    expect(current.isProcessing).toBe(false)
    expect(current.isDone).toBe(false)
  })
})