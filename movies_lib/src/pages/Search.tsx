import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MoviesCard from "../components/MoviesCard";
import Pagination from "../components/Pagination";

const searchURL = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY

import styles from '../css/MovieGrid.module.scss'
import type { Movie } from "../types/MovieTypes";

const Search = () => {

  const [searchParams] = useSearchParams();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const query = searchParams.get("q");

  const getSearchedMovies = async (url: RequestInfo | URL) => {
    try {
      setLoading(true);
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error('Erro ao buscar filmes');
      }
      const data = await res.json();
      setMovies(data.results);
      setTotalPages(Math.min(data.total_pages, 500)); // API limita a 500 páginas
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1); // Resetar página ao mudar a busca
  }, [query]);

  useEffect(() => {
    const searchedWithQueryUrl = `${searchURL}?${apiKey}&query=${query}&language=pt-BR&page=${currentPage}`;

    getSearchedMovies(searchedWithQueryUrl);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [query, currentPage])

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Resultados para: <span className={styles['query-text']}>{query}</span></h2>
      <div className={styles['movies-container']}>
        {loading && <p>Carregando...</p>}
        {error && <p className={styles.error}>Erro: {error}</p>}
        {!loading && !error && movies.length === 0 && <p>Nenhum resultado encontrado</p>}
        {!loading && !error && movies.map((movie) => (
          <MoviesCard key={movie.id} movie={movie} showLink={true} />
        ))}
      </div>
      {!loading && !error && movies.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  )
}

export default Search;