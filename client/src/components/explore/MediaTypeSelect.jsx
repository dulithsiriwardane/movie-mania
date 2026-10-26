import {ChevronDown} from "lucide-react";

export default function MediaTypeSelect({mediaType, setMediaType}) {
  return (
    <div className="relative inline-block">
      <select
        value={mediaType}
        onChange={function handleMediaTypeChange(event) {
          setMediaType(event.target.value);
        }}
        className="appearance-none w-full bg-[#1b222d] text-gray-200 text-sm pl-3 pr-10 py-2 rounded-xl border border-gray-700/60 focus:outline-none focus:border-red-600 transition-colors cursor-pointer"
      >
        <option className="bg-[#1b222d] text-gray-200 rounded-lg" value="all">
          All Types
        </option>
        <option className="bg-[#1b222d] text-gray-200" value="movie">
          Movies
        </option>
        <option className="bg-[#1b222d] text-gray-200" value="tv">
          TV Shows
        </option>
      </select>

      <ChevronDown
        size={16}
        strokeWidth={1.8}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
      />
    </div>
  );
}
