import {useState} from "react";
import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar";
import AuthButtons from "./AuthButtons";
import MobileMenu from "./MobileMenu";
import {useAuth} from "../../context/AuthContext";

export default function Navbar() {
  const {signOut, isAuthenticated} = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated);
  const [currentPath, setCurrentPath] = useState("/");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function handleLogout() {
    signOut();
    setIsLoggedIn(false);
    setIsMobileMenuOpen(false);
  }

  function handleNavigate(path) {
    setCurrentPath(path);
    setIsMobileMenuOpen(false);
  }

  function toggleMobileMenu() {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-7xl z-50 lg:w-[96%]">
      <div className="w-full flex items-center justify-between px-4 sm:px-6 py-3 bg-gray-900/60 backdrop-blur-xl border border-neutral-800/80 shadow-2xl shadow-black/50 rounded-lg">
        <div
          className="flex items-center space-x-3 cursor-pointer"
          onClick={function () {
            handleNavigate("/");
          }}
        >
          <span className="text-base sm:text-lg font-bold tracking-tight text-white">
            MovieMania
          </span>
        </div>

        <NavLinks currentPath={currentPath} onNavigate={handleNavigate} />

        <div className="flex items-center space-x-3">
          <div className="hidden lg:block">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>

          <div className="hidden sm:block">
            <AuthButtons isLoggedIn={isLoggedIn} onLogout={handleLogout} />
          </div>

          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-900 focus:outline-none transition-colors"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>

        <MobileMenu
          isOpen={isMobileMenuOpen}
          currentPath={currentPath}
          onNavigate={handleNavigate}
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>
    </header>
  );
}
