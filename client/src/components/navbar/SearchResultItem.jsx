export function SearchResultItem({result, onSelect}) {
  function handleClick() {
    if (onSelect) {
      onSelect(result);
    }
  }

  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-700/60 transition-colors cursor-pointer group"
    >
      <img
        src={result.banner || result.posterPath}
        alt={result.title || result.name}
        className="w-12 h-16 object-cover rounded-md flex-shrink-0 bg-gray-800"
      />
      <div className="flex flex-col min-w-0 flex-1">
        <h4 className="text-sm font-medium text-white truncate transition-colors">
          {result.title || result.name}
        </h4>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs px-2 py-0.5 rounded bg-gray-700/90 text-gray-300 capitalize font-medium">
            {result.type || result.mediaType || "Movie"}
          </span>
          {result.year && (
            <span className="text-xs text-gray-400">{result.year}</span>
          )}
        </div>
      </div>
    </div>
  );
}
