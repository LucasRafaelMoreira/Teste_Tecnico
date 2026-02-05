import { useState, useEffect } from "react";
import MoviesCard from "../components/MoviesCard";
import Pagination from "../components/Pagination";

import styles from '../css/MovieGrid.module.scss'
import type { Movie } from "../types/MovieTypes";

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;


const Home = () => {

  const [topMovies, setTopMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  
  const getTopRatedMovies = async (url: RequestInfo | URL) => {
    try {
      setLoading(true);
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error('Erro ao buscar filmes');
      }
      const data = await res.json();
      setTopMovies(data.results);
      setTotalPages(Math.min(data.total_pages, 500)); // API limita a 500 páginas
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const topRatedUrl = `${moviesURL}top_rated?${apiKey}&language=pt-BR&page=${currentPage}`;
    getTopRatedMovies(topRatedUrl);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage])

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Melhores filmes:</h2>
      <div className={styles['movies-container']}>
        {loading && <p>Carregando...</p>}
        {error && <p className={styles.error}>Erro: {error}</p>}
        {!loading && !error && topMovies.map((movie) => (
          <MoviesCard key={movie.id} movie={movie} showLink={true} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}

export default Home;