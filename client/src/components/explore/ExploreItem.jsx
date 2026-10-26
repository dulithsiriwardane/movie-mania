import {Star} from "lucide-react";

export default function ExploreItem({item, onSelect}) {
  function handleClick() {
    if (onSelect) onSelect(item);
  }

  return (
    <div
      onClick={handleClick}
      className="flex-shrink-0 w-44 md:w-52 group cursor-pointer"
    >
      <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-slate-800 shadow-xl">
        <img
          src={item.banner}
          alt={item.title}
          className="w-full h-full object-cover group-hover:opacity-90 hover:scale-110 transition-transform duration-300"
        />

        {/* Rating Badge */}
        {item.rating && (
          <div className="absolute top-2.5 right-2.5 bg-gray-900/40 backdrop-blur-xl px-2 py-1 rounded-md flex items-center gap-1 text-xs font-medium text-gray-100">
            <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
            <span>{item.rating}</span>
          </div>
        )}

        {/* Media Type Badge */}
        <div className="absolute top-2.5 left-2.5 bg-gray-900/40 backdrop-blur-xl px-2 py-1 rounded-md flex items-center gap-1 text-xs font-medium text-gray-100">
          {item.type}
        </div>
      </div>

      <div className="mt-2.5 flex flex-col">
        <h3 className="text-sm font-semibold text-white truncate transition-colors">
          {item.title}
        </h3>
        <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
          {item.year && <span>{item.year}</span>}
          {item.year && item.genres && <span>•</span>}
          {item.genres && <span className="truncate">{item.genres}</span>}
        </div>
      </div>
    </div>
  );
}
