import { Link } from "react-router-dom"

import { FaStar } from 'react-icons/fa'
import { BsCalendar } from 'react-icons/bs'

const imageUrl = import.meta.env.VITE_IMG;

interface Movie {
  poster_path: string;
  title: string;
  vote_average: number;
  id: number;
  release_date: string;
}

interface MoviesCardProps {
  movie: Movie;
  showLink?: boolean;
}

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('pt-BR', options);
}

const MoviesCard = ({ movie, showLink = true }: MoviesCardProps) => {
  return (
    <div className="movies-card">
      <img src={`${imageUrl + movie.poster_path}`} alt={movie.title} />
      <h2>{movie.title}</h2>
      <p>
        <p>{formatDate(movie.release_date)}</p>
      </p>
      <p>
        <FaStar /> {movie.vote_average}
      </p>
      {showLink && <Link to={`/movie/${movie.id}`}>Detalhes</Link>}

    </div>
  )
}

export default MoviesCard