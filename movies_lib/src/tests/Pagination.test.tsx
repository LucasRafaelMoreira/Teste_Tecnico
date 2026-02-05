import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import Pagination from '../components/Pagination';

describe('Pagination', () => {
  const mockOnPageChange = vi.fn();

  afterEach(() => {
    mockOnPageChange.mockClear();
  });

  it('não deve renderizar se totalPages for menor ou igual a 1', () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={1} onPageChange={mockOnPageChange} />
    );
    
    expect(container.firstChild).toBeNull();
  });

  it('deve renderizar botões de navegação', () => {
    render(
      <Pagination currentPage={5} totalPages={10} onPageChange={mockOnPageChange} />
    );
    
    expect(screen.getByText('←')).toBeInTheDocument();
    expect(screen.getByText('→')).toBeInTheDocument();
  });

  it('deve desabilitar botão anterior quando está na primeira página', () => {
    render(
      <Pagination currentPage={1} totalPages={10} onPageChange={mockOnPageChange} />
    );
    
    const prevButton = screen.getByText('←');
    expect(prevButton).toBeDisabled();
  });

  it('deve desabilitar botão próximo quando está na última página', () => {
    render(
      <Pagination currentPage={10} totalPages={10} onPageChange={mockOnPageChange} />
    );
    
    const nextButton = screen.getByText('→');
    expect(nextButton).toBeDisabled();
  });

  it('deve chamar onPageChange ao clicar em um número de página', async () => {
    const user = userEvent.setup();
    render(
      <Pagination currentPage={1} totalPages={10} onPageChange={mockOnPageChange} />
    );
    
    const pageButton = screen.getByText('3');
    await user.click(pageButton);
    
    expect(mockOnPageChange).toHaveBeenCalledWith(3);
    expect(mockOnPageChange).toHaveBeenCalledTimes(1);
  });

  it('deve destacar a página atual com classe active', () => {
    render(
      <Pagination currentPage={5} totalPages={10} onPageChange={mockOnPageChange} />
    );
    
    const currentPageButton = screen.getByText('5');
    expect(currentPageButton.className).toContain('active');
  });

  it('deve exibir reticências quando há muitas páginas', () => {
    render(
      <Pagination currentPage={5} totalPages={20} onPageChange={mockOnPageChange} />
    );
    
    const ellipsis = screen.getAllByText('...');
    expect(ellipsis.length).toBeGreaterThan(0);
  });

  it('deve navegar para página anterior ao clicar na seta esquerda', async () => {
    const user = userEvent.setup();
    render(
      <Pagination currentPage={5} totalPages={10} onPageChange={mockOnPageChange} />
    );
    
    const prevButton = screen.getByText('←');
    await user.click(prevButton);
    
    expect(mockOnPageChange).toHaveBeenCalledWith(4);
  });

  it('deve navegar para próxima página ao clicar na seta direita', async () => {
    const user = userEvent.setup();
    render(
      <Pagination currentPage={5} totalPages={10} onPageChange={mockOnPageChange} />
    );
    
    const nextButton = screen.getByText('→');
    await user.click(nextButton);
    
    expect(mockOnPageChange).toHaveBeenCalledWith(6);
  });

  it('deve renderizar todas as páginas quando totalPages <= 7', () => {
    render(
      <Pagination currentPage={3} totalPages={5} onPageChange={mockOnPageChange} />
    );
    
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.queryByText('...')).not.toBeInTheDocument();
  });
});
