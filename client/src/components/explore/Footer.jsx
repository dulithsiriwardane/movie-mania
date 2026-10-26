export function Footer() {
  return (
    <footer className="w-full bg-[#1b222d] text-slate-300 border-t border-slate-700/60 mt-12 py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand Logo & Copyright */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <a href="#" className="text-xl font-black tracking-tight text-white">
            MovieMania
          </a>
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} MovieMania. All rights reserved.
          </p>
        </div>

        {/* Navigation & Project Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
          <a href="#" className="hover:text-red-500 transition-colors">
            Home
          </a>
          <a href="#" className="hover:text-red-500 transition-colors">
            Favorites
          </a>
          <a href="#" className="hover:text-red-500 transition-colors">
            Watchlist
          </a>
          <span className="text-slate-600">|</span>
          <a href="#" className="hover:text-red-500 transition-colors">
            GitHub
          </a>
          <a href="#" className="hover:text-red-500 transition-colors">
            API
          </a>
          <a href="#" className="hover:text-red-500 transition-colors">
            About Project
          </a>
          <span className="text-slate-600">|</span>
          <a href="#" className="hover:text-red-500 transition-colors">
            Facebook
          </a>
          <a href="#" className="hover:text-red-500 transition-colors">
            LinkedIn
          </a>
          <a href="#" className="hover:text-red-500 transition-colors">
            Instagram
          </a>
        </div>

        {/* Developer Attribution */}
        <div className="text-xs text-slate-400 font-medium text-center md:text-right">
          Developed by{" "}
          <span className="text-white font-semibold">Dulith Siriwardane</span>
        </div>
      </div>
    </footer>
  );
}
