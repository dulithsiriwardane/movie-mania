import {SearchResultItem} from "./SearchResultItem";

export function SearchResultsList({results, isLoading, query, onSelectResult}) {
  if (!query || !query.trim()) {
    return null;
  }

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-[#1b222d] border border-slate-900/60 rounded-xl shadow-2xl overflow-hidden z-50 max-h-96  p-2 overflow-y-auto backdrop-blur-xl [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-600">
      {isLoading ? (
        <div className="p-4 text-center text-sm text-slate-400">
          Searching...
        </div>
      ) : results && results.length > 0 ? (
        <div className="flex flex-col gap-1">
          {results.map(function (item) {
            return (
              <SearchResultItem
                key={item.id}
                result={item}
                onSelect={onSelectResult}
              />
            );
          })}
        </div>
      ) : (
        <div className="p-4 text-center text-sm text-slate-400">
          No results found for "{query}"
        </div>
      )}
    </div>
  );
}
