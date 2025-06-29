import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CloseBtn } from '../components/CloseBtn/CloseBtn';

describe('CloseBtn', () => {
  it('Проверка отображения кнопки с символом "×"', () => {
    render(<CloseBtn onClick={() => {}} />);
    expect(screen.getByTestId('close-btn')).toHaveTextContent('×');
  });

  it('Тестирование корректности вызова обработчика onClick', () => {
    const handleClick = vi.fn();
    render(<CloseBtn onClick={handleClick} />);
    
    fireEvent.click(screen.getByTestId('close-btn'));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('Проверка применения кастомных классов стилей', () => {
    render(<CloseBtn onClick={() => {}} className="custom-class" />);
    
    const button = screen.getByTestId('close-btn');
    expect(button).toHaveClass('custom-class');
    expect(button.className).toMatch(/closeButton/);
  });
});
