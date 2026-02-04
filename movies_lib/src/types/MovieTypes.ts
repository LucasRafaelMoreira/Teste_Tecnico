export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  overview: string;
}

export interface MovieDetails extends Movie {
  tagline: string;
  budget: number;
  revenue: number;
  runtime: number;
  genres: Genre[];
}

export interface MoviesCardProps {
  movie: Movie;
  showLink?: boolean;
}

export interface Video {
  key: string;
  type: string;
}

export interface VideosResponse {
  results: Video[];
}