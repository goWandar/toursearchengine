
const HeroContent = () => {
  return (
    <div className='flex flex-col items-center gap-20'>
      
      {/* WE ARE WANDAR section */}
      {/* <div className='flex items-center gap-2'>
        <div className='w-[1.62894rem] h-[0.0665rem] bg-[#F4A261]' />
        <span className='text-[#F4A261] text-base font-light capitalize'>WE ARE WANDAR</span>
        <div className='w-[1.62894rem] h-[0.0665rem] bg-[#F4A261]' />
      </div> */}

      {/* Main heading */}
      <div className='flex flex-col items-bottom gap-4'>
        <h1 className='text-white text-[3rem] font-semibold capitalize leading-none text-center'>
          Find the safari that fits without the stress
        </h1>
        <h1 className='text-[#F4A261] text-[3rem] font-semibold capitalize leading-none text-center'>
          Most safari sites give you options - Wandar helps you choose
        </h1>
      </div>

      {/* Buttons */}
      {/* <div className='flex gap-6'>
        <Button
          id='discover-more-button'
          label='Discover more'
          variant={BUTTON_VARIANT.PRIMARY}
          icon={<BsArrowRight />}
          iconPosition={BUTTON_ICON_POSITION.RIGHT}
          className='text-black hover:bg-primary-600 transition-colors duration-200'
        />
        <Button
          id='watch-video-button'
          label='Watch Video'
          variant={BUTTON_VARIANT.TERTIARY}
          hasBorder={true}
          className='text-white hover:text-black'
        />
      </div> */}
    </div>
  );
};

export default HeroContent;
