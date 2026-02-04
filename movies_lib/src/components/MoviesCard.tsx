import { Link } from "react-router-dom"

import {FaStar} from 'react-icons/fa'

const imageUrl = import.meta.env.VITE_IMG;

interface Movie {
  poster_path: string;
  title: string;
  vote_average: number;
  id: number;
}

interface MoviesCardProps {
  movie: Movie;
  showLink?: boolean;
}

const MoviesCard = ({ movie, showLink = true }: MoviesCardProps) => {
  return (
    <div className="movies-card">
      <img src={`${imageUrl + movie.poster_path}`} alt={movie.title} />
        <h2>{movie.title}</h2>
        <p>
            <FaStar /> {movie.vote_average}
        </p>
        {showLink && <Link to={`/movie/${movie.id}`}>Detalhes</Link>}

    </div>
  )
}

export default MoviesCard