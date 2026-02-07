import { useFavorites } from "../hooks/useFavorites";
import MoviesCard from "../components/MoviesCard";
import styles from '../css/MovieGrid.module.scss';

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Meus Favoritos</h2>
      <div className={styles['movies-container']}>
        {favorites.length === 0 ? (
          <p>Você ainda não tem filmes favoritos.</p>
        ) : (
          favorites.map((movie) => (
            <MoviesCard key={movie.id} movie={movie} showLink={true} />
          ))
        )}
      </div>
    </div>
  );
};

export default Favorites;
