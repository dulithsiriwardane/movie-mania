export default function AuthButtons({isLoggedIn, onLogout}) {
  if (isLoggedIn) {
    return (
      <div className="flex items-center space-x-3">
        <div
          title="User Profile"
          className="flex items-center justify-center w-9 h-9 rounded-full bg-red-600/20 border border-red-500/40 text-red-400 cursor-pointer hover:bg-red-600/30 transition-colors"
        >
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
        <button
          onClick={onLogout}
          className="text-xs sm:text-sm font-semibold text-gray-200 hover:text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-all duration-200"
        >
          Log Out
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <button
        className="text-xs sm:text-sm font-medium text-gray-200 hover:text-white px-3.5 py-1.5 rounded-full  transition-colors"
      >
        <a href="/signin">Log In</a>
      </button>
      <button
        className="text-xs sm:text-sm font-semibold text-gray-200 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg shadow-lg shadow-emerald-900/30 transition-all duration-200"
      >
        <a href="/signup">Sign Up</a>
      </button>
    </div>
  );
}
