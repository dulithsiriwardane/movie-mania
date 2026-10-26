import {X, Star, Calendar} from "lucide-react";

export function MovieDetailModal({movie, onClose}) {
  if (!movie) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col md:flex-row">
          {movie.backdropPath && (
            <div
              className="md:w-1/2 h-64 md:h-auto bg-cover bg-center"
              style={{backgroundImage: `url(${movie.backdropPath})`}}
            />
          )}
          <div className="p-6 md:p-8 md:w-1/2 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-white">{movie.title}</h2>
              <div className="flex items-center space-x-3 text-sm text-slate-400">
                <span className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4 text-red-500" />
                  <span>{movie.releaseYear}</span>
                </span>

                <span className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>
                    {" "}
                    {!movie.voteAverage
                      ? "N/A"
                      : `${movie.voteAverage.toFixed(1)}`}
                    {"/10"}
                  </span>
                </span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                {movie.overview}
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-md transition-all"
            >
              Close Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
