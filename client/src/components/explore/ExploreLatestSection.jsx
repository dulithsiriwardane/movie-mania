import {useState, useEffect, useRef} from "react";
import ExploreItem from "./ExploreItem";
import {ChevronLeft, ChevronRight, Pause, Play, Compass} from "lucide-react";
import MediaTypeSelect from "./MediaTypeSelect";

// Combined Genre Map for Movies and TV Shows
const GENRES = [
  {id: "all", name: "All Genres"},
  {id: 28, name: "Action"},
  {id: 12, name: "Adventure"},
  {id: 16, name: "Animation"},
  {id: 35, name: "Comedy"},
  {id: 18, name: "Drama"},
  {id: 10751, name: "Family"},
  {id: 27, name: "Horror"},
  {id: 9648, name: "Mystery"},
  {id: 10749, name: "Romance"},
  {id: 878, name: "Sci-Fi"},
  {id: 53, name: "Thriller"},
];

const GENRE_MAP = GENRES.reduce(function (acc, genre) {
  if (genre.id !== "all") acc[genre.id] = genre.name;
  return acc;
}, {});

function getGenreNames(genreIds) {
  if (!genreIds || genreIds.length === 0) return "";
  return genreIds
    .slice(0, 2)
    .map(function (id) {
      return GENRE_MAP[id];
    })
    .filter(Boolean)
    .join(", ");
}

// Reusable Item Component (Matches your original design)

export function ExploreLatestSection({onSelectItem}) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);

  // Filters state
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [mediaType, setMediaType] = useState("all"); // 'all', 'movie', 'tv'

  const scrollContainerRef = useRef(null);

  // Fetch data based on selected filters from TMDB Discover / Trending endpoints
  useEffect(
    function () {
      async function fetchExploreData() {
        try {
          setIsLoading(true);
          setError(null);

          const apiKey = "875a977ab94cd7108c47a3bed943830f";
          let fetchedResults = [];

          if (mediaType === "all") {
            // Fetch both movies and tv shows concurrently if 'all' is selected
            const [movieRes, tvRes] = await Promise.all([
              fetch(
                `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`,
              ),
              fetch(
                `https://api.themoviedb.org/3/trending/tv/day?api_key=${apiKey}`,
              ),
            ]);

            const movieData = await movieRes.json();
            const tvData = await tvRes.json();

            const formattedMovies = (movieData.results || []).map(
              function (item) {
                return {
                  id: `movie-${item.id}`,
                  title: item.title,
                  banner: item.poster_path
                    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                    : "https://via.placeholder.com/500x750?text=No+Image",
                  rating: item.vote_average
                    ? item.vote_average.toFixed(1)
                    : null,
                  year: (item.release_date || "").substring(0, 4),
                  genres: getGenreNames(item.genre_ids),
                  genre_ids: item.genre_ids || [],
                  type: "Movie",
                };
              },
            );

            const formattedTV = (tvData.results || []).map(function (item) {
              return {
                id: `tv-${item.id}`,
                title: item.name,
                banner: item.poster_path
                  ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                  : "https://via.placeholder.com/500x750?text=No+Image",
                rating: item.vote_average ? item.vote_average.toFixed(1) : null,
                year: (item.first_air_date || "").substring(0, 4),
                genres: getGenreNames(item.genre_ids),
                genre_ids: item.genre_ids || [],
                type: "TV Show",
              };
            });

            fetchedResults = [...formattedMovies, ...formattedTV];
          } else {
            // Fetch specific media type
            const endpoint = mediaType === "movie" ? "movie" : "tv";
            const response = await fetch(
              `https://api.themoviedb.org/3/trending/${endpoint}/day?api_key=${apiKey}`,
            );
            const data = await response.json();

            fetchedResults = (data.results || []).map(function (item) {
              return {
                id: `${endpoint}-${item.id}`,
                title: item.title || item.name,
                banner: item.poster_path
                  ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                  : "https://via.placeholder.com/500x750?text=No+Image",
                rating: item.vote_average ? item.vote_average.toFixed(1) : null,
                year: (
                  item.release_date ||
                  item.first_air_date ||
                  ""
                ).substring(0, 4),
                genres: getGenreNames(item.genre_ids),
                genre_ids: item.genre_ids || [],
                type: endpoint === "movie" ? "Movie" : "TV Show",
              };
            });
          }

          // Apply Genre Filter locally if a specific genre is selected
          if (selectedGenre !== "all") {
            fetchedResults = fetchedResults.filter(function (item) {
              return item.genre_ids.includes(Number(selectedGenre));
            });
          }

          setItems(fetchedResults);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      fetchExploreData();
    },
    [selectedGenre, mediaType],
  );

  // Auto-play / Infinite scroll effect
  useEffect(
    function () {
      if (!isPlaying || items.length === 0) return;

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
    [isPlaying, items],
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
    <section className="w-full max-w-7xl mx-auto mb-10 px-4">
      {/* Section Header & Filters */}
      <div className="flex md:items-center justify-between gap-4 mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-100 tracking-tight flex items-center gap-x-3">
          <span>Explore Latest</span>
          <Compass className="w-8 h-8 text-red-600" />
        </h2>

        {/* Filters and Controls Bar */}
        <div className="flex items-center justify-between gap-3">
          {/* Type Dropdown Filter (All, Movies, TV Shows) */}
          <div className="hidden md:inline-block">
            <MediaTypeSelect
              mediaType={mediaType}
              setMediaType={setMediaType}
            />
          </div>

          {/* Navigation Controls with Play/Pause */}
          <div className="flex items-center gap-2">
            <button
              onClick={function () {
                handleScroll("left");
              }}
              className="p-2.5 rounded-full bg-gray-900 hover:bg-gray-700 text-gray-300 hover:text-gray-200 border border-gray-700/60 transition-colors shadow-md active:scale-95"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={togglePlayPause}
              className="p-2.5 rounded-full bg-gray-900 hover:bg-gray-700 text-gray-300 hover:text-gray-200 border border-gray-700/60 transition-colors shadow-md active:scale-95"
              aria-label={isPlaying ? "Pause autoplay" : "Play autoplay"}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 text-gray-200" />
              ) : (
                <Play className="w-4 h-4 text-gray-200" />
              )}
            </button>

            <button
              onClick={function () {
                handleScroll("right");
              }}
              className="p-2.5 rounded-full bg-gray-900 hover:bg-gray-700 text-gray-300 hover:text-gray-200 border border-gray-700/60 transition-colors shadow-md active:scale-95"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      <div className="md:hidden mb-4">
        <MediaTypeSelect mediaType={mediaType} setMediaType={setMediaType} />
      </div>
      {/* Genre Selector Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {GENRES.map(function (genre) {
          const isSelected = String(selectedGenre) === String(genre.id);
          return (
            <button
              key={genre.id}
              onClick={function () {
                setSelectedGenre(genre.id);
              }}
              className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                isSelected
                  ? "bg-red-600 text-gray-200 "
                  : "bg-[#1b222d] text-gray-300 hover:bg-gray-800 border border-gray-700/50"
              }`}
            >
              {genre.name}
            </button>
          );
        })}
      </div>

      {/* Content States */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-600"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-sm py-8 text-center">{error}</div>
      ) : (
        <div
          ref={scrollContainerRef}
          onMouseEnter={function () {
            setIsPlaying(false);
          }}
          onMouseLeave={function () {
            setIsPlaying(true);
          }}
          className="flex gap-4 overflow-x-auto pb-4 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {items.length > 0 ? (
            items.map(function (item) {
              return (
                <ExploreItem
                  key={item.id}
                  item={item}
                  onSelect={onSelectItem}
                />
              );
            })
          ) : (
            <div className="text-gray-400 text-sm py-8 w-full text-center">
              No results found for the selected filter combination.
            </div>
          )}
        </div>
      )}
    </section>
  );
}
