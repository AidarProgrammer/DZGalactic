import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DownloadFile } from '../components/DownloadFile/DownloadFile';
import { vi } from 'vitest';
import { useFileStore } from '../store/useFileStore';

// Мокаем весь модуль useFileStore
vi.mock('../store/useFileStore', () => ({
  useFileStore: vi.fn(),
}));

describe('DownloadFile Component', () => {
  beforeEach(() => {
    // Сбрасываем все моки перед каждым тестом
    vi.clearAllMocks();
  });

  it('рендерит кнопку загрузки с текстом "Загрузить файл"', () => {
    // Мокаем возвращаемое значение для этого теста
    vi.mocked(useFileStore).mockReturnValue({
      uploadedFile: null,
      setUploadedFile: vi.fn(),
      resetFile: vi.fn(),
      isInvalidType: false,
      setIsInvalidType: vi.fn(),
      isProcessing: false,
      isDone: false,
      setIsDone: vi.fn(),
      setMetrics: vi.fn(),
    });

    render(<DownloadFile />);
    const button = screen.getByRole('button', { name: /загрузить файл/i });
    expect(button).toBeInTheDocument();
  });

  it('при выборе файла вызывает setUploadedFile и проверяет расширение', () => {
    const setUploadedFile = vi.fn();
    const setIsInvalidType = vi.fn();
    const setIsDone = vi.fn();

    vi.mocked(useFileStore).mockReturnValue({
        uploadedFile: null,
        setUploadedFile,
        resetFile: vi.fn(),
        isInvalidType: false,
        setIsInvalidType,
        isProcessing: false,
        isDone: false,
        setIsDone,
        setMetrics: vi.fn(),
    });

    const { container } = render(<DownloadFile />);
    
    const fileInput = container.querySelector('input[type="file"]');
    expect(fileInput).toBeInTheDocument();

    const testFile = new File(['test content'], 'test.csv', { type: 'text/csv' });

    fireEvent.change(fileInput, {
        target: { files: [testFile] }
    });

    expect(setUploadedFile).toHaveBeenCalledTimes(1);
    expect(setUploadedFile).toHaveBeenCalledWith(testFile);
    expect(setIsInvalidType).toHaveBeenCalledWith(false);
    expect(setIsDone).toHaveBeenCalledWith(false);
});

  it('показывает ошибку при неправильном типе файла', () => {
    vi.mocked(useFileStore).mockReturnValue({
      uploadedFile: { name: 'file.txt' },
      setUploadedFile: vi.fn(),
      resetFile: vi.fn(),
      isInvalidType: true,
      setIsInvalidType: vi.fn(),
      isProcessing: false,
      isDone: false,
      setIsDone: vi.fn(),
      setMetrics: vi.fn(),
    });

    render(<DownloadFile />);

    expect(screen.getByText(/упс, не то/i)).toBeInTheDocument();
  });

  it('кнопка CloseBtn вызывает resetFile', () => {
    const resetFile = vi.fn();
    const setIsInvalidType = vi.fn();
    const setIsDone = vi.fn();
    const setMetrics = vi.fn();

    vi.mocked(useFileStore).mockReturnValue({
      uploadedFile: { name: 'test.csv' },
      setUploadedFile: vi.fn(),
      resetFile,
      isInvalidType: false,
      setIsInvalidType,
      isProcessing: false,
      isDone: false,
      setIsDone,
      setMetrics,
    });

    render(<DownloadFile />);
    const closeBtn = screen.getByTestId('close-btn');
    fireEvent.click(closeBtn);

    expect(resetFile).toHaveBeenCalled();
    expect(setIsInvalidType).toHaveBeenCalledWith(false);
    expect(setIsDone).toHaveBeenCalledWith(false);
    expect(setMetrics).toHaveBeenCalledWith(null);
  });

  it('перетаскивание файла вызывает setUploadedFile', () => {
    const setUploadedFile = vi.fn();
    const setIsInvalidType = vi.fn();
    const setIsDone = vi.fn();

    vi.mocked(useFileStore).mockReturnValue({
      uploadedFile: null,
      setUploadedFile,
      resetFile: vi.fn(),
      isInvalidType: false,
      setIsInvalidType,
      isProcessing: false,
      isDone: false,
      setIsDone,
      setMetrics: vi.fn(),
    });

    render(<DownloadFile />);
    const dropZone = screen.getByText(/или перетащите отсюда/i).parentElement;

    const file = new File(['hello'], 'test.csv', { type: 'text/csv' });

    fireEvent.drop(dropZone, {
      dataTransfer: {
        files: [file],
        types: ['Files'],
      },
    });

    expect(setUploadedFile).toHaveBeenCalledWith(file);
    expect(setIsInvalidType).toHaveBeenCalledWith(false);
    expect(setIsDone).toHaveBeenCalledWith(false);
  });
});