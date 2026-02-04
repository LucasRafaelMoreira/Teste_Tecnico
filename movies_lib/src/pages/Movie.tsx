import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BsGraphUp, BsWallet2, BsHourglassSplit, BsFillFileEarmarkTextFill, BsCalendar, BsFilm } from "react-icons/bs";
import { ImFilm } from "react-icons/im";
import ReactPlayer from 'react-player';

import MoviesCard from "../components/MoviesCard";

import '../css/Movie.css';

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Movie = () => {

  const { id } = useParams();
  const [movie, setMovie] = useState<any>(null);
  const [trailer, setTrailer] = useState<any>(null);

  const getMovie = async (url: RequestInfo | URL) => {

    const res = await fetch(url);
    const data = await res.json();

    setMovie(data);
  };

  const getTrailer = async (url: RequestInfo | URL) => {

    const res = await fetch(url);
    const data = await res.json();

    // setTrailer(data);
    setTrailer(`https://www.youtube.com/watch?v=${data.results[0]?.key}`);
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

    const movieUrl = `${moviesURL}${id}?${apiKey}&language=pt-BR`;
    const trailerUrl = `${import.meta.env.VITE_VD}${id}/videos?${apiKey}&language=pt-BR`;
    getMovie(movieUrl);
    getTrailer(trailerUrl);

  }, []);

  return (
    <div className="movie-page">
      {movie && <>
        <MoviesCard movie={movie} showLink={false} />
        <p className="tagline">{movie.tagline}</p>
        <div className="info">
          <h3>
            <BsWallet2 /> Orçamento:
          </h3>
          <p>{formatCurrency(movie.budget)}</p>
        </div>
        <div className="info">
          <h3>
            <BsGraphUp /> Receita:
          </h3>
          <p>{formatCurrency(movie.revenue)}</p>
        </div>
        <div className="info">
          <h3>
            <BsHourglassSplit /> Duração:
          </h3>
          <p>{movie.runtime} minutos</p>
        </div>
        <div className="info">
          <h3>
            <BsCalendar /> Data de lançamento:
          </h3>
          <p>{formatDate(movie.release_date)}</p>
        </div>
        <div className="info">
          <h3>
            <BsFilm /> Gênero:
          </h3>
          <p>{movie.genres.map((genre: any) => genre.name).join(', ')}</p>
        </div>
        <div className="info">
          <h3>
            <BsFillFileEarmarkTextFill /> Sinopse:
          </h3>
          <p>{movie.overview}</p>
        </div>
        <div className="info">
          <h3>
            <ImFilm /> Trailer:
          </h3>
          {trailer && <ReactPlayer src={trailer} controls={true} width="100%" height="400px" />}
        </div>
      </>}
    </div>
  )
}

export default Movie