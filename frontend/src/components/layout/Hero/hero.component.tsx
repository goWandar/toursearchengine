import Navbar from './navbar';
import HeroContent from './hero-content.component';
import heroVideo from '../../../assets/mp4/heroVideo.mp4';

const Hero = () => {
  return (
    <div className="relative w-full min-h-screen flex flex-col">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col flex-1">
        <div className="px-4 sm:px-6 md:px-12 pt-6">
          <Navbar />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <HeroContent />
        </div>
      </div>
    </div>
  );
};

export default Hero;
