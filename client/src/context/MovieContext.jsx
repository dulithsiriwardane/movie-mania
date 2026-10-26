import {createContext, useContext, useState, useEffect} from "react";

const MovieContext = createContext(null);

export function MovieProvider({children}) {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  useEffect(() => {
    async function fetchMovies() {
      try {
        
        
        const API_KEY = "875a977ab94cd7108c47a3bed943830f";
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

  function nextMovie() {
    if (movies.length > 0) {
      setCurrentIndex(function (prev) {
        return (prev + 1) % movies.length;
      });
    }
  }

  function prevMovie() {
    if (movies.length > 0) {
      setCurrentIndex(function (prev) {
        return (prev - 1 + movies.length) % movies.length;
      });
    }
  }

  const value = {
    movies,
    setMovies,
    currentMovie: movies[currentIndex] || null,
    currentIndex,
    setCurrentIndex,
    loading,
    error,
    nextMovie,
    prevMovie,
    isPlaying,
    togglePlayPause
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
}

export function useMovies() {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useMovies must be used within a MovieProvider");
  }
  return context;
}
