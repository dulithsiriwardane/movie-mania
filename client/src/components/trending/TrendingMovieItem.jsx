import {Star} from "lucide-react";
export default function TrendingMovieItem({movie, onSelect}) {
  function handleClick() {
    if (onSelect) {
      onSelect(movie);
    }
  }

  return (
    <div
      onClick={handleClick}
      className="flex-shrink-0 w-44 md:w-52 group cursor-pointer "
    >
      <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-slate-800 shadow-xl">
        <img
          src={movie.banner}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:opacity-90 hover:scale-110 transition-transform duration-300"
        />

        
        {movie.rating && (
          <div className="absolute top-2.5 right-2.5 bg-gray-900/40 backdrop-blur-xl px-2 py-1 rounded-md flex items-center gap-1 text-xs font-medium text-gray-100 ">
            <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
            <span>{movie.rating}</span>
          </div>
        )}
      </div>

      <div className="mt-2.5 flex flex-col">
        <h3 className="text-sm font-semibold text-white truncate transition-colors">
          {movie.title}
        </h3>
        <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
          {movie.year && <span>{movie.year}</span>}
          {movie.year && movie.genres && <span>•</span>}
          {movie.genres && <span className="truncate">{movie.genres}</span>}
        </div>
      </div>
    </div>
  );
}
