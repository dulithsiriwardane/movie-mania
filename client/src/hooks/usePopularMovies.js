import {useState, useEffect} from "react";
import axios from "axios";

export function usePopularMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const apiDataFetch = await axios.get(`${process.env.API_URL}/api/data`);
        const API_KEY = apiDataFetch.data.API_KEY;
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
        );
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          const formatted = data.results
            .filter((m) => m.backdrop_path && m.release_date)
            .map((m) => ({
              id: m.id,
              title: m.title,
              overview: m.overview,
              releaseYear: new Date(m.release_date).getFullYear(),
              voteAverage: m.vote_average,
              backdropPath: `https://image.tmdb.org/t/p/original${m.backdrop_path}`,
            }));
          setMovies(formatted);
          console.log(data.results);
        }
      } catch (err) {
        setError(err);
        console.error("Failed to fetch TMDB movies:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, []);

  return {movies, loading, error};
}
