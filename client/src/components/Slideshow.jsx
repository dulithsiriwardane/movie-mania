import {useState, useEffect, useRef} from "react";
import {Play, Pause} from "lucide-react";
import axios from "axios";

export default function Slideshow({backgroundOnly = false}) {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const apiDataFetch = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/data`,
        );
        const API_KEY = apiDataFetch.data.API_KEY;
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
        );
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          const formatted = data.results
            .filter((m) => m.backdrop_path)
            .map((m) => ({
              id: m.id,
              title: m.title,
              overview: m.overview,
              backdrop_path: `https://image.tmdb.org/t/p/original${m.backdrop_path}`,
            }));
          setMovies(formatted);
          setCurrentIndex(0);
        }
      } catch (err) {
        console.error("Failed to fetch TMDB movies:", err);
      }
    })();
  }, []);

  useEffect(() => {
    if (isPlaying && movies.length > 0) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % movies.length);
      }, 4000);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying, movies.length]);

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <div
      className={
        backgroundOnly
          ? "absolute inset-0 overflow-hidden"
          : "md:block hidden relative w-full max-w-4xl h-full rounded-2xl rounded-tr-none rounded-br-none overflow-hidden shadow-2xl border border-slate-800"
      }
    >
      {movies.map((movie, index) => (
        <div
          key={movie.id}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
            index === currentIndex
              ? "opacity-100 scale-105 transition-transform duration-[6000ms]"
              : "opacity-0 scale-100"
          }`}
          style={{backgroundImage: `url(${movie.backdrop_path})`}}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/75" />

      {!backgroundOnly && (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 h-full flex flex-col justify-end p-8 max-w-xl">
            <div className="flex items-center space-x-2 absolute top-8 left-8 z-10">
              <div className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full translate-x-[-1px] translate-y-[1px]" />
              </div>
              <span className="font-bold text-xl tracking-tight">
                MovieMania.
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-2 drop-shadow-md text-white">
              Unlock the Ultimate Movie Universe
            </h1>
            <p className="text-slate-300 text-sm line-clamp-3 leading-relaxed">
              Create your free account to join the conversation on thousands of
              movies and TV shows, build personal watchlists, rate your favorite
              films, and get personalized recommendations delivered straight to
              you.
            </p>
          </div>
          <button
            onClick={togglePlayPause}
            aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
            className="absolute top-4 right-4 z-20 bg-slate-900/70 hover:bg-slate-900 border border-slate-700/60 p-3 rounded-full text-white backdrop-blur-md transition-all shadow-lg active:scale-95"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5 fill-current" />
            )}
          </button>
        </>
      )}
    </div>
  );
}
