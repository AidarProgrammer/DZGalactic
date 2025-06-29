import React from 'react';
import { render, screen } from '@testing-library/react';
import { CsvInfo } from '../components/CsvInfo/CsvInfo';
import { vi } from 'vitest';

vi.mock('../features/calculateDay', () => ({
  CalculateDay: vi.fn((dayNum) => `Day-${dayNum}`)
}));

// создаём переменную для будущего мок-стора
let mockStore = {};

vi.mock('../store/useFileStore', () => ({
  useFileStore: (selector) => selector(mockStore),
}));

describe('CsvInfo', () => {
  beforeEach(() => {
    mockStore = {}; // очищаем store перед каждым тестом
  });

  it('отображает текст-заглушку, если metrics пустой', () => {
    render(<CsvInfo />);

    expect(screen.getByText(/здесь появятся/i)).toBeInTheDocument();
  });

  it('отображает текст-заглушку, если metrics — пустой объект', () => {
    mockStore = {};

    render(<CsvInfo />);

    expect(screen.getByText(/здесь появятся/i)).toBeInTheDocument();
  });

  it('рендерит все статистики из metrics', () => {
    mockStore = {
      metrics: {
        total_spend_galactic: 100,
        less_spent_civ: 'Humans',
        rows_affected: 5,
        big_spent_at: 123,
        less_spent_at: 45,
        big_spent_value: 999,
        big_spent_civ: 'Monsters',
        average_spend_galactic: 12.5
      }
    };

    render(<CsvInfo />);

    expect(screen.getByText('Day-123')).toBeInTheDocument();
    expect(screen.getByText('Day-45')).toBeInTheDocument();

    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('Humans')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('999')).toBeInTheDocument();
    expect(screen.getByText('Monsters')).toBeInTheDocument();
    expect(screen.getByText('12.5')).toBeInTheDocument();

    expect(screen.getByText(/общие расходы/i)).toBeInTheDocument();
    expect(screen.getByText(/цивилизация с минимальными расходами/i)).toBeInTheDocument();
  });
});