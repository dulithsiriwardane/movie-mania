import {ChevronLeft, ChevronRight, Plus, Star} from "lucide-react";

export function HeroContent({movie, onNext, onPrev, onViewDetails}) {
  if (!movie) return null;

  return (
    <div className="relative z-20 h-full max-w-7xl mx-auto px-6 sm:px-12 flex flex-col justify-center py-20">
      <div className="max-w-2xl space-y-4">
        {/* Meta badges: Release Year & Rating */}
        <div className="flex items-center space-x-4 text-sm font-medium text-slate-300">
          <span className="bg-slate-800/80 backdrop-blur-md px-3 py-1 rounded-md border border-slate-700">
            {movie.releaseYear}
          </span>
          {movie.voteAverage && (
            <div className="flex items-center space-x-1 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-md text-amber-400">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>{movie.voteAverage.toFixed(1)}</span>
            </div>
          )}
        </div>

        {/* Movie Title */}
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight drop-shadow-lg">
          {movie.title}
        </h1>

        {/* Description */}
        <p className="text-slate-300 text-base sm:text-lg line-clamp-3 leading-relaxed drop-shadow">
          {movie.overview}
        </p>

        {/* Action Button */}
        <div className="flex items-center space-x-4 pt-4">
          <button
            onClick={onViewDetails}
            className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all transform hover:scale-105 active:scale-95"
          >
            View Details
          </button>
          <button
            onClick={onViewDetails}
            className="flex items-center space-x-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all transform hover:scale-105 active:scale-95"
          >
            <Plus className="w-5 h-5" />
            <span>Add to watchlist</span>
          </button>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute right-6 sm:right-12 bottom-12 flex items-center space-x-3 z-30">
        <button
          onClick={onPrev}
          aria-label="Previous movie"
          className="p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 backdrop-blur-md transition-all shadow-lg active:scale-95"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={onNext}
          aria-label="Next movie"
          className="p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 backdrop-blur-md transition-all shadow-lg active:scale-95"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
