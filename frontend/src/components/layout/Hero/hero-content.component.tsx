import Button from '../../common/button/button.component';
import { BUTTON_ICON_POSITION, BUTTON_VARIANT } from '../../common/button/button.types';
import { BsArrowRight } from 'react-icons/bs';

const HeroContent = () => {
  return (
    <div className='flex flex-col items-center gap-20'>
      {/* WE ARE WANDAR section */}
      <div className='flex items-center gap-2'>
        <div className='w-[1.62894rem] h-[0.0665rem] bg-[#F4A261]' />
        <span className='text-[#F4A261] text-base font-light capitalize'>WE ARE WANDAR</span>
        <div className='w-[1.62894rem] h-[0.0665rem] bg-[#F4A261]' />
      </div>

      {/* Main heading */}
      <div className='flex flex-col items-center'>
        <h1 className='text-white text-[7rem] font-semibold capitalize leading-none text-center'>
          YOUR SAFARI
        </h1>
        <h1 className='text-[#F4A261] text-[7rem] font-semibold capitalize leading-none text-center'>
          BEGINS HERE
        </h1>
      </div>

      {/* Buttons */}
      <div className='flex gap-6'>
        <Button
          id='discover-more-button'
          label='Discover more'
          variant={BUTTON_VARIANT.PRIMARY}
          textColor='#000000'
          icon={<BsArrowRight className='text-black' />}
          iconPosition={BUTTON_ICON_POSITION.RIGHT}
        />
        <Button
          id='watch-video-button'
          label='Watch Video'
          variant={BUTTON_VARIANT.TERTIARY}
          textColor='text-white hover:text-black'
          hasBorder={true}
        />
      </div>
    </div>
  );
};

export default HeroContent;
