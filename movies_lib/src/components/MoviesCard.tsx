import { Link } from "react-router-dom"
import { FaStar } from 'react-icons/fa'
import FavoriteButton from './FavoriteButton'
import type { MoviesCardProps } from "../types/MovieTypes";
import styles from '../css/Movie.module.scss'
import gridStyles from '../css/MovieGrid.module.scss'

const imageUrl = import.meta.env.VITE_IMG;

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('pt-BR', options);
}

const MoviesCard = ({ movie, showLink = true }: MoviesCardProps) => {
  return (
    <div className={styles['movies-card']}>
      <img src={`${imageUrl + movie.poster_path}`} alt={movie.title} />
      <h2>{movie.title}</h2>
      <p>{formatDate(movie.release_date)}</p>
      <p className={gridStyles['rating-row']}>
        <span>
          <FaStar /> {movie.vote_average}
        </span>
        <FavoriteButton movie={movie} />
      </p>
      {showLink && <Link to={`/movie/${movie.id}`}>Detalhes</Link>}
    </div>
  )
}

export default MoviesCard