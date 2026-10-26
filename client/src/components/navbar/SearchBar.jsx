function SearchBar({searchQuery, setSearchQuery}) {
  function handleInputChange(e) {
    setSearchQuery(e.target.value);
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  }

  return (
    <form onSubmit={handleSearchSubmit} className="relative flex items-center">
      <input
        type="text"
        placeholder="Search Movies and TV Shows"
        value={searchQuery}
        onChange={handleInputChange}
        className="w-full sm:w-full lg:w-80 bg-gray-900/50 text-sm text-neutral-200 placeholder-gray-500 px-5 py-2 pl-9 rounded-lg border border-neutral-700/60 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-200 backdrop-blur-xl"
      />
      <svg
        className="absolute left-3 w-4 h-4 text-gray-500 pointer-events-none"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </form>
  );
}

export default SearchBar;
