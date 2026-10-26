import {useState} from "react";
import Slideshow from "../Slideshow";
import {useMovies} from "../../context/MovieContext";
import {HeroContent} from "./HeroContent";
import {MovieDetailModal} from "./MovieDetailModal";
import axios from "axios";

export function HeroSection() {
  const {
    movies,
    currentMovie,
    loading,
    setCurrentIndex,
    isPlaying,
    togglePlayPause,
  } = useMovies();
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

  async function handleAddToWatchlist() {
    const id = currentMovie.id;
    const response = await axios.post();
  }

  if (loading) {
    return (
      <div className="relative w-full h-[600px] bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <section className="relative w-full h-[600px] sm:h-[700px] overflow-hidden bg-slate-950 shadow-2xl">
      <Slideshow backgroundOnly={true} />

      <HeroContent
        movie={currentMovie}
        onNext={handleNext}
        onPrev={handlePrev}
        isPlaying={isPlaying}
        togglePlayPause={togglePlayPause}
        onViewDetails={() => {
          setIsModalOpen(true);
          togglePlayPause();
        }}
      />

      {isModalOpen && currentMovie && (
        <MovieDetailModal
          movie={currentMovie}
          onClose={() => {
            setIsModalOpen(false);
            togglePlayPause();
          }}
        />
      )}
    </section>
  );
}
