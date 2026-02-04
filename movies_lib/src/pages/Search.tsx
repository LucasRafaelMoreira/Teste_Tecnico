import {useEffect, useState} from "react";
import { useSearchParams } from "react-router-dom";
import MoviesCard from "../components/MoviesCard";

const searchURL = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY

import '../css/MovieGrid.css'
import type { Movie } from "../types/MovieTypes";

const Search = () => {

  const [searchParams] = useSearchParams();

  const [movies, setMovies] = useState<Array<Movie>>([]);
  const query = searchParams.get("q");

  const getSearchedMovies = async (url: RequestInfo | URL) => {
  
      const res = await fetch(url);
      const data = await res.json();
  
      setMovies(data.results);
    };
  
    useEffect(() => {      
      const searchedWithQueryUrl = `${searchURL}?${apiKey}&query=${query}&language=pt-BR&page=1`;

      getSearchedMovies(searchedWithQueryUrl);
    }, [query])

  return (
    <div className="container">
      <h2 className="title">Resultados para: <span className="query-text">{query}</span></h2>
      <div className="movies-container">
        {movies.length === 0 && <p>Carregando...</p>}
        {movies.length > 0 && movies.map((movie) => (
          <MoviesCard key={movie.id} movie={movie} showLink={true} />
        ))}
      </div>

    </div>
  )
}

export default Search;