import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import MoviesCard from '../components/MoviesCard';
import type { Movie } from '../types/MovieTypes';

const mockMovie: Movie = {
  id: 1,
  title: 'Filme Teste',
  poster_path: '/teste.jpg',
  vote_average: 8.5,
  release_date: '2024-01-15',
  overview: 'Sinopse do filme teste'
};

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('MoviesCard', () => {
  it('deve renderizar o título do filme', () => {
    renderWithRouter(<MoviesCard movie={mockMovie} showLink={true} />);
    
    expect(screen.getByText('Filme Teste')).toBeInTheDocument();
  });

  it('deve renderizar a avaliação do filme', () => {
    renderWithRouter(<MoviesCard movie={mockMovie} showLink={true} />);
    
    expect(screen.getByText('8.5')).toBeInTheDocument();
  });

  it('deve renderizar a imagem do poster', () => {
    renderWithRouter(<MoviesCard movie={mockMovie} showLink={true} />);
    
    const image = screen.getByRole('img', { name: /filme teste/i });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', expect.stringContaining('/teste.jpg'));
  });

  it('deve renderizar o link de detalhes quando showLink é true', () => {
    renderWithRouter(<MoviesCard movie={mockMovie} showLink={true} />);
    
    const link = screen.getByRole('link', { name: /detalhes/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/movie/1');
  });

  it('não deve renderizar o link quando showLink é false', () => {
    renderWithRouter(<MoviesCard movie={mockMovie} showLink={false} />);
    
    expect(screen.queryByRole('link', { name: /detalhes/i })).not.toBeInTheDocument();
  });

  it('deve formatar a data corretamente', () => {
    renderWithRouter(<MoviesCard movie={mockMovie} showLink={true} />);
    
    expect(screen.getByText(/14 de janeiro de 2024/i)).toBeInTheDocument();
  });
});
