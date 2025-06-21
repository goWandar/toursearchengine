import Navbar from './navbar';
import HeroContent from './hero-content.component';
import heroVideo from '../../../assets/mp4/heroVideo.mp4';

const Hero = () => {
  return (
    <div className='grid h-full'>
      {/* Grid setup for layering */}
      <div className='grid grid-cols-1 grid-rows-1 h-full'>
        {/* Video layer - bottom layer */}
        <div className='col-span-1 row-span-1 col-start-1 row-start-1 z-0'>
          <video autoPlay loop muted playsInline className='h-full w-full object-cover'>
            <source src={heroVideo} type='video/mp4' />
          </video>
        </div>

        {/* Overlay layer - middle layer */}
        <div className='col-span-1 row-span-1 col-start-1 row-start-1 bg-black/30 z-10' />

        {/* Content layer - top layer */}
        <div className='col-span-1 row-span-1 col-start-1 row-start-1 flex flex-col z-20'>
          <div className='px-[2rem] pt-8'>
            <Navbar />
          </div>
          <div className='flex-1 flex items-center justify-center'>
            <HeroContent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
