import Navbar from "../components/navbar/Navbar";
import {HeroSection} from "../components/hero/HeroSection";
import {TrendingMoviesSection} from "../components/trending/TrendingMoviesSection";
import {TrendingTvSection} from "../components/trending/TrendingTvSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <div className="py-8 mx-auto">
        <TrendingMoviesSection />
        <TrendingTvSection />
      </div>
    </>
  );
}
