import SearchBar from "./SearchBar";

function MobileMenu({
  isOpen,
  currentPath,
  onNavigate,
  isLoggedIn,
  onLogin,
  onLogout,
  onSignup,
  searchQuery,
  setSearchQuery,
}) {
  if (!isOpen) return null;

  function handleNavClick(path) {
    onNavigate(path);
  }

  return (
    <div className="absolute top-full left-0 right-0 mt-3 bg-gray-900/95 backdrop-blur-xl border border-neutral-800/80 shadow-2xl shadow-black/50 rounded-lg p-5 flex flex-col space-y-4 md:hidden z-50">
      {/* Mobile Search Bar */}
      <div className="w-full">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>

      {/* Mobile Links */}
      <div className="flex flex-col space-y-1 pt-2 border-t border-neutral-800/80">
        <button
          onClick={function () {
            handleNavClick("/");
          }}
          className={`text-left px-3 py-2 rounded-lg text-sm font-medium ${
            currentPath === "/"
              ? "text-gray-200 underline decoration-2 underline-offset-8 decoration-red-600"
              : "text-neutral-300 hover:text-white"
          }`}
        >
          Home
        </button>
        <button
          onClick={function () {
            handleNavClick("/favorites");
          }}
          className={`text-left px-3 py-2 rounded-lg text-sm font-medium ${
            currentPath === "/favorites"
              ? "text-gray-200 underline decoration-2 underline-offset-8 decoration-red-600"
              : "text-neutral-300 hover:text-white"
          }`}
        >
          Favorites
        </button>
        <button
          onClick={function () {
            handleNavClick("/watchlist");
          }}
          className={`text-left px-3 py-2 rounded-lg text-sm font-medium ${
            currentPath === "/watchlist"
              ? "text-gray-200 underline decoration-2 underline-offset-8 decoration-red-600"
              : "text-neutral-300 hover:text-white"
          }`}
        >
          WatchList
        </button>
      </div>

      {/* Mobile Auth Section */}
      <div className="pt-3 border-t border-gray-800 flex items-center justify-between">
        {isLoggedIn ? (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-600/20 border border-red-500/40 text-red-400">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium text-neutral-200">
                My Account
              </span>
            </div>
            <button
              onClick={onLogout}
              className="text-sm font-semibold text-neutral-200 hover:text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg "
            >
              Log Out
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-3 w-full">
            <button
              onClick={onLogin}
              className="flex-1 text-center text-sm font-semibold text-neutral-300 hover:text-white py-2 rounded-lg bg-gray-800"
            >
              Log In
            </button>
            <button
              onClick={onSignup}
              className="flex-1 text-center text-sm font-semibold text-white bg-red-600 hover:bg-red-500 py-2 rounded-lg shadow-lg shadow-red-900/30"
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MobileMenu;
