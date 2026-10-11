import {useState} from "react";
import Slideshow from "../Slideshow";
import {HeroContent} from "./HeroContent";
import {MovieDetailModal} from "./MovieDetailModal";
import {usePopularMovies} from "../../hooks/usePopularMovies";

export function HeroSection() {
  const {movies, loading} = usePopularMovies();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNext = () => {
    if (movies.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }
  };

  const handlePrev = () => {
    if (movies.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);
    }
  };

  const currentMovie = movies[currentIndex] || null;

  if (loading) {
    return (
      <div className="relative w-full h-[600px] bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <section className="relative w-full h-[600px] sm:h-[700px] overflow-hidden bg-slate-950 shadow-2xl">
      {/* Your Existing Slideshow Component rendered as the background */}
      <Slideshow backgroundOnly={true} />

      {/* Foreground Content with Title, Release Year, Description, and Navigation */}
      <HeroContent
        movie={currentMovie}
        onNext={handleNext}
        onPrev={handlePrev}
        onViewDetails={() => setIsModalOpen(true)}
      />

      {/* Modal Popup */}
      {isModalOpen && currentMovie && (
        <MovieDetailModal
          movie={currentMovie}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </section>
  );
}
