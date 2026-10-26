import Navbar from "../components/navbar/Navbar";
import {HeroSection} from "../components/hero/HeroSection";
import {TrendingMoviesSection} from "../components/trending/TrendingMoviesSection";
import {TrendingTvSection} from "../components/trending/TrendingTvSection";
import {ExploreLatestSection} from "../components/explore/ExploreLatestSection";
import {Footer} from "../components/explore/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <div className="py-8 mx-auto">
        <TrendingMoviesSection />
        <TrendingTvSection />
      </div>
      <ExploreLatestSection />
      <Footer />
    </>
  );
}
