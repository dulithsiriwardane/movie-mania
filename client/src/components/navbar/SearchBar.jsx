import {useState, useEffect, useRef} from "react";
import {SearchResultsList} from "./SearchResultsList";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);

  useEffect(function () {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return function () {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(
    function () {
      if (!query || !query.trim()) {
        setResults([]);
        setIsLoading(false);
        setIsOpen(false);
        return;
      }

      const controller = new AbortController();
      const signal = controller.signal;

      async function fetchTMDBResults() {
        setIsLoading(true);
        setError(null);
        setIsOpen(true);

        try {
          const apiKey = "875a977ab94cd7108c47a3bed943830f"; 
          const response = await fetch(
            `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${encodeURIComponent(query)}`,
            {signal},
          );

          if (!response.ok) {
            throw new Error("Failed to fetch search results from TMDB");
          }

          const data = await response.json();

          const formattedResults = (data.results || [])
            .filter(function (item) {
              return item.media_type === "movie" || item.media_type === "tv";
            })
            .map(function (item) {
              return {
                id: item.id,
                title: item.title || item.name,
                banner: item.poster_path
                  ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                  : "https://via.placeholder.com/500x750?text=No+Image",
                type: item.media_type,
                year: (
                  item.release_date ||
                  item.first_air_date ||
                  ""
                ).substring(0, 4),
              };
            });

          setResults(formattedResults);
        } catch (err) {
          if (err.name !== "AbortError") {
            setError(err.message);
            setResults([]);
          }
        } finally {
          setIsLoading(false);
        }
      }

      const debounceTimer = setTimeout(function () {
        fetchTMDBResults();
      }, 300);

      return function () {
        clearTimeout(debounceTimer);
        controller.abort();
      };
    },
    [query],
  );

  function handleInputChange(event) {
    setQuery(event.target.value);
  }

  function handleSelectResult(result) {
    setIsOpen(false);
    setQuery("");
  }

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <div className="relative flex items-center">
        <svg
          className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={function () {
            if (query.trim()) setIsOpen(true);
          }}
          placeholder="Search Movies and TV Shows"
          className="w-full bg-[#151c24] text-slate-200 text-sm placeholder-slate-400 pl-10 pr-4 py-2 rounded-lg border border-transparent focus:border-slate-600 focus:outline-none transition-all"
        />
      </div>

      {isOpen && (
        <SearchResultsList
          results={results}
          isLoading={isLoading}
          query={query}
          onSelectResult={handleSelectResult}
        />
      )}
    </div>
  );
}
