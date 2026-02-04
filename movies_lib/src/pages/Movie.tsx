import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BsGraphUp, BsWallet2, BsHourglassSplit, BsFillFileEarmarkTextFill, BsCalendar, BsFilm } from "react-icons/bs";
import { ImFilm } from "react-icons/im";
import ReactPlayer from 'react-player';

import MoviesCard from "../components/MoviesCard";
import styles from '../css/Movie.module.scss';
import type { MovieDetails, VideosResponse } from "../types/MovieTypes";

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const localTrailers: { [key: string]: string } = {
  '238': '/videos/O-Poderoso-Chefao.mp4',
  '240': '/videos/O-Poderoso-Chefao-2.mp4',
  '278': '/videos/Um-Sonho-de-Liberdade.mp4'
};

const Movie = () => {

  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [trailer, setTrailer] = useState<string | null>(null);
  const [isLocalTrailer, setIsLocalTrailer] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getMovie = async (url: RequestInfo | URL) => {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error('Erro ao buscar filme');
      }
      const data: MovieDetails = await res.json();
      setMovie(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    }
  };

  const getTrailer = async (url: RequestInfo | URL) => {
    if (id && localTrailers[id]) {
      setTrailer(localTrailers[id]);
      setIsLocalTrailer(true);
      return;
    }

    try {
      const res = await fetch(url);
      if (!res.ok) { 
        throw new Error('Erro ao buscar trailer');
      }
      const data: VideosResponse = await res.json();

      if (data.results && data.results.length > 0) {
        setTrailer(data.results[0].key);
        setIsLocalTrailer(false);
      }
    } catch (err) {
      console.error('Erro ao buscar trailer:', err);
    }
  };

  const formatCurrency = (number: number) => {
    return number.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const movieUrl = `${moviesURL}${id}?${apiKey}&language=pt-BR`;
      const trailerUrl = `${import.meta.env.VITE_VD}${id}/videos?${apiKey}&language=pt-BR`;
      await getMovie(movieUrl);
      await getTrailer(trailerUrl);
      setLoading(false);
    };

    fetchData();
  }, [id]);

  if (loading) return <div className={styles.loading}>Carregando...</div>;
  if (error) return <div className={styles.error}>Erro: {error}</div>;
  if (!movie) return <div className={styles.error}>Filme não encontrado</div>;

  return (
    <div className={styles['movie-page']}>
      {movie && <>
        <MoviesCard movie={movie} showLink={false} />
        <p className={styles.tagline}>{movie.tagline}</p>
        <div className={styles.info}>
          <h3>
            <BsWallet2 /> Orçamento:
          </h3>
          <p>{formatCurrency(movie.budget)}</p>
        </div>
        <div className={styles.info}>
          <h3>
            <BsGraphUp /> Receita:
          </h3>
          <p>{formatCurrency(movie.revenue)}</p>
        </div>
        <div className={styles.info}>
          <h3>
            <BsHourglassSplit /> Duração:
          </h3>
          <p>{movie.runtime} minutos</p>
        </div>

        <div className={styles.info}>
          <h3>
            <BsFilm /> Gênero:
          </h3>
          <p>{movie.genres.map((genre) => genre.name).join(', ')}</p>
        </div>
        <div className={styles.info}>
          <h3>
            <BsFillFileEarmarkTextFill /> Sinopse:
          </h3>
          <p>{movie.overview}</p>
        </div>
        <div className={styles.info}>
          <h3>
            <ImFilm /> Trailer:
          </h3>
          {trailer && (
            <div className={styles['custom-player-container']}>
              <ReactPlayer 
                src={isLocalTrailer ? trailer : `https://www.youtube.com/watch?v=${trailer}`}
                width={'100%'} 
                height={'auto'}
                controls={true}
                style={{ aspectRatio: '16/9' }}
              />
            </div>
          )}
        </div>
      </>}
    </div>
  )
}

export default Movie