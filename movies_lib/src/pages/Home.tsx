import { useState, useEffect } from "react";
import MoviesCard from "../components/MoviesCard";

import '../css/MovieGrid.css'

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

const Home = () => {

  const [topMovies, setTopMovies] = useState<Array<Movie>>([]);
  const getTopRatedMovies = async (url: RequestInfo | URL) => {

    const res = await fetch(url);
    const data = await res.json();

    setTopMovies(data.results);
  };

  useEffect(() => {

    const topRatedUrl = `${moviesURL}top_rated?${apiKey}&language=pt-BR&page=1`;
    getTopRatedMovies(topRatedUrl);
  }, [])

  return (
    <div className="container">
      <h2 className="title">Melhores filmes:</h2>
      <div className="movies-container">
        {topMovies.length === 0 && <p>Carregando...</p>}
        {topMovies.length > 0 && topMovies.map((movie) => (
          <MoviesCard key={movie.id} movie={movie} showLink={true} />
        ))}
      </div>

    </div>
  )
}

export default Home;