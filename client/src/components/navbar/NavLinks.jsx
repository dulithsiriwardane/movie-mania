function NavLinks({currentPath, onNavigate}) {
  function handleLinkClick(path) {
    if (onNavigate) {
      onNavigate(path);
    }
  }

  const links = [
    {name: "Home", path: "/"},
    {name: "Favorites", path: "/favorites"},
    {name: "WatchList", path: "/watchlist"},
  ];

  return (
    <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
      {links.map(function (link) {
        const isActive = currentPath === link.path;
        return (
          <button
            key={link.path}
            onClick={function () {
              handleLinkClick(link.path);
            }}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
              isActive
                ? "text-gray-200 underline decoration-2 underline-offset-8 decoration-red-600"
                : "text-neutral-300 hover:text-white"
            }`}
          >
            {link.name}
          </button>
        );
      })}
    </nav>
  );
}

export default NavLinks;
