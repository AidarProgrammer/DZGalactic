import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HistoryElem } from '../components/HistoryElem/HistoryElem';

vi.mock('../components/HistoryElem/HistoryElem.module.css', () => ({
  default: {
    HistCont: 'HistCont',
    clickable: 'clickable',
    historyElem: 'historyElem',
    nameElem: 'nameElem',
    nameElem__paragraph: 'nameElem__paragraph',
    nameElem__date: 'nameElem__date',
    nameElem__success: 'nameElem__success',
    nameElem__error: 'nameElem__error',
  },
}));

describe('<HistoryElem />', () => {
  it('Рендер даты и числа', () => {
    render(
      <HistoryElem
        name="My File"
        date="2024-06-25"
        bool={true}
        metrics={{}}
        onClick={() => {}}
      />
    );

    expect(screen.getByText('My File')).toBeInTheDocument();
    expect(screen.getByText('2024-06-25')).toBeInTheDocument();
  });

  it('Рендер успешной обработкм', () => {
    render(
      <HistoryElem
        name="My File"
        date="2024-06-25"
        bool={true}
        metrics={{}}
        onClick={() => {}}
      />
    );

    expect(screen.getByText(/Обработан успешно/)).toBeInTheDocument();
  });

  it('Рендер обработки с ошибкой', () => {
    render(
      <HistoryElem
        name="My File"
        date="2024-06-25"
        bool={false}
        metrics={{}}
        onClick={() => {}}
      />
    );

    expect(screen.getByText(/Обработан успешно/)).toBeInTheDocument();
  });

  it('Проверка рендеринга svg картинок', () => {
    const { container } = render(
      <HistoryElem
        name="My File"
        date="2024-06-25"
        bool={true}
        metrics={{}}
        onClick={() => {}}
      />
    );
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThanOrEqual(2);
  });

  it('Кнопка доступна при bool=true', () => {
    const handleClick = vi.fn();

    render(
      <HistoryElem
        name="My File"
        date="2024-06-25"
        bool={true}
        metrics={{}}
        onClick={handleClick}
      />
    );

    const container = screen.getByText('My File').closest('div');
    container.click();

    expect(handleClick).toHaveBeenCalled();
  });

  it('Кнопка блокируется если bool = false', () => {
    const handleClick = vi.fn();

    render(
      <HistoryElem
        name="My File"
        date="2024-06-25"
        bool={false}
        metrics={{}}
        onClick={handleClick}
      />
    );

    const container = screen.getByText('My File').closest('div');
    container.click();

    expect(handleClick).not.toHaveBeenCalled();
  });

  it('Проверка верстки', () => {
    const { asFragment } = render(
      <HistoryElem
        name="My File"
        date="2024-06-25"
        bool={true}
        metrics={{}}
        onClick={() => {}}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});