import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CloseBtn } from '../components/CloseBtn/CloseBtn';

describe('CloseBtn', () => {
  it('renders button with "×" symbol', () => {
    render(<CloseBtn onClick={() => {}} />);
    expect(screen.getByTestId('close-btn')).toHaveTextContent('×');
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<CloseBtn onClick={handleClick} />);
    
    fireEvent.click(screen.getByTestId('close-btn'));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('applies custom className', () => {
    render(<CloseBtn onClick={() => {}} className="custom-class" />);
    
    const button = screen.getByTestId('close-btn');
    expect(button).toHaveClass('custom-class');
    // Если нужно проверить наличие стилей из CSS-модуля:
    expect(button.className).toMatch(/closeButton/);
  });
});