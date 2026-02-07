import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { useFavorites } from '../hooks/useFavorites';
import type { Movie } from '../types/MovieTypes';
import styles from '../css/FavoriteButton.module.scss';

interface FavoriteButtonProps {
  movie: Movie;
}

const FavoriteButton = ({ movie }: FavoriteButtonProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(movie.id);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(movie);
  };

  return (
    <button
      className={`${styles.favoriteButton} ${favorite ? styles.favorite : ''}`}
      onClick={handleClick}
      title={favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
    >
      {favorite ? <BsHeartFill /> : <BsHeart />}
    </button>
  );
};

export default FavoriteButton;
