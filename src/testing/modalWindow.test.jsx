import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { ModalWindow } from '../components/ModalWindow/ModalWindow';
import { CalculateDay } from '../features/calculateDay';

// Мокаем CSS-модули
vi.mock('../components/ModalWindow/ModalWindow.module.css', () => ({
  default: {
    modalOverlay: 'modalOverlay',
    modalContent: 'modalContent',
    closeButton: 'closeButton',
    mod: 'mod'
  },
}));

// Мокаем CsvStatistic
vi.mock('../components/CsvStatistic/CsvStatistic', () => ({
  CsvStatistic: ({ info, title }) => (
    <div data-testid="csv-statistic">
      <span>{info}</span>:<span>{title}</span>
    </div>
  ),
}));

// Мокаем CalculateDay
vi.mock('../features/calculateDay', () => ({
  CalculateDay: vi.fn((day) => `Day ${day}`)
}));

// Создадим modal-root для портала
beforeEach(() => {
  const modalRoot = document.createElement('div');
  modalRoot.setAttribute('id', 'modal-root');
  document.body.appendChild(modalRoot);
});

afterEach(() => {
  cleanup();
  document.getElementById('modal-root')?.remove();
});

describe('<ModalWindow />', () => {
  it('Проверка того что пока мы не нажали на кнопку модальное окно не появится', () => {
    const { container } = render(<ModalWindow isOpen={false} metrics={{}} onClose={() => {}} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('Проверка правильной отрисовки', () => {
    const mockMetrics = {
      total_spend_galactic: 1000,
      less_spent_civ: 'Earth',
      rows_affected: 200,
      big_spent_at: 50,
      less_spent_at: 20,
      big_spent_value: 500,
      big_spent_civ: 'Mars',
      average_spend_galactic: 125.5,
    };

    render(<ModalWindow isOpen={true} metrics={mockMetrics} onClose={() => {}} />);

    // Проверим все метрики
    expect(screen.getByText(/Общие расходы/)).toBeInTheDocument();
    expect(screen.getByText(/Earth/)).toBeInTheDocument();
    expect(screen.getByText(/200/)).toBeInTheDocument();
    expect(screen.getByText('Day 50')).toBeInTheDocument();
    expect(screen.getByText('Day 20')).toBeInTheDocument();
    expect(screen.getByText(/500/)).toBeInTheDocument();
    expect(screen.getByText(/Mars/)).toBeInTheDocument();
    expect(screen.getByText(/125.5/)).toBeInTheDocument();
  });


  it('Проверка закрытия окна при нажатии на крестик', () => {
    const onClose = vi.fn();
    render(<ModalWindow isOpen={true} metrics={{}} onClose={onClose} />);
    
    const closeBtn = screen.getByText('Х');
    fireEvent.click(closeBtn);
    
    expect(onClose).toHaveBeenCalledTimes(1);
  });


  it('Снимок совпадений', () => {
    const { asFragment } = render(
      <ModalWindow
        isOpen={true}
        metrics={{
          total_spend_galactic: 1000,
          big_spent_at: 50
        }}
        onClose={() => {}}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});