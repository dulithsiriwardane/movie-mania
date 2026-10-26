import {useState, useEffect, useRef} from "react";
import {ChevronLeft, ChevronRight, Pause, Play, TrendingUp} from "lucide-react";
import TrendingTvItem from "./TrendingTvItem";

const TV_GENRE_MAP = {
  10759: "Action & Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  10762: "Kids",
  9648: "Mystery",
  10763: "News",
  10764: "Reality",
  10765: "Sci-Fi & Fantasy",
  10766: "Soap",
  10767: "Talk",
  10768: "War & Politics",
  37: "Western",
};

function getGenreNames(genreIds) {
  if (!genreIds || genreIds.length === 0) return "";
  return genreIds
    .slice(0, 2)
    .map(function (id) {
      return TV_GENRE_MAP[id];
    })
    .filter(Boolean)
    .join(", ");
}

export function TrendingTvSection({onSelectMovie}) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const scrollContainerRef = useRef(null);

  useEffect(function () {
    async function fetchTrendingTVShows() {
      try {
        setIsLoading(true);
        setError(null);

        const apiKey = "875a977ab94cd7108c47a3bed943830f";
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/tv/day?api_key=${apiKey}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch trending TV shows");
        }

        const data = await response.json();

        const formattedShows = (data.results || []).map(function (item) {
          return {
            id: item.id,
            title: item.name,
            banner: item.poster_path
              ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
              : "https://via.placeholder.com/500x750?text=No+Image",
            rating: item.vote_average ? item.vote_average.toFixed(1) : null,
            year: (item.first_air_date || "").substring(0, 4),
            genres: getGenreNames(item.genre_ids),
          };
        });

        setMovies(formattedShows);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTrendingTVShows();
  }, []);

  useEffect(
    function () {
      if (!isPlaying || movies.length === 0) return;

      const interval = setInterval(function () {
        if (scrollContainerRef.current) {
          const container = scrollContainerRef.current;
          const scrollAmount = 300;

          if (
            container.scrollLeft + container.clientWidth >=
            container.scrollWidth - 10
          ) {
            container.scrollTo({left: 0, behavior: "smooth"});
          } else {
            container.scrollBy({left: scrollAmount, behavior: "smooth"});
          }
        }
      }, 3000);

      return function () {
        clearInterval(interval);
      };
    },
    [isPlaying, movies],
  );

  function handleScroll(direction) {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -450 : 450;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  }

  function togglePlayPause() {
    setIsPlaying(!isPlaying);
  }

  return (
    <section className="w-full max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-100 tracking-tight flex items-center justify-center gap-x-3">
          <span>Trending TV Shows</span>
          <TrendingUp className="w-8 h-8 text-red-600" />
        </h2>

        <div className="flex items-center gap-2">
          <button
            onClick={function () {
              handleScroll("left");
            }}
            className="p-2.5 rounded-full bg-gray-900 hover:bg-gray-700 text-gray-300 hover:text-white border border-gray-700/60 transition-colors shadow-md active:scale-95"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={togglePlayPause}
            className="p-2.5 rounded-full bg-gray-900 hover:bg-gray-700 text-gray-300 hover:text-white border border-gray-700/60 transition-colors shadow-md active:scale-95"
            aria-label={isPlaying ? "Pause autoplay" : "Play autoplay"}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-white" />
            ) : (
              <Play className="w-4 h-4 text-white" />
            )}
          </button>

          <button
            onClick={function () {
              handleScroll("right");
            }}
            className="p-2.5 rounded-full bg-gray-900 hover:bg-gray-700 text-gray-300 hover:text-white border border-gray-700/60 transition-colors shadow-md active:scale-95"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-600 m-auto"></div>
      ) : error ? (
        <div className="text-red-500 text-sm py-8 text-center">{error}</div>
      ) : (
        <div
          ref={scrollContainerRef}
          onMouseEnter={function () {
            setIsPlaying(false);
            TrendingTvItem;
          }}
          onMouseLeave={function () {
            setIsPlaying(true);
          }}
          className="flex gap-4 overflow-x-auto pb-4 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {movies.length > 0 ? (
            movies.map(function (movie) {
              return (
                <TrendingTvItem
                  key={movie.id}
                  movie={movie}
                  onSelect={onSelectMovie}
                />
              );
            })
          ) : (
            <div className="text-gray-400 text-sm py-4">
              No trending TV shows found.
            </div>
          )}
        </div>
      )}
    </section>
  );
}
