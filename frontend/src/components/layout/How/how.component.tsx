import SubtractRight from '../../../assets/icons/Subtract-right.svg';
import SubtractLeft from '../../../assets/icons/Subtract-left.svg';
import DiscoverLight from '../../../assets/icons/discover-light.svg';
import BrowseLight from '../../../assets/icons/browse-light.svg';
import TimeLight from '../../../assets/icons/time-light.svg';
import BookSearch from '../../../assets/icons/book-search.svg';
import Card from '../../common/card/card.component';
import { CARD_ALIGNMENT } from '../../common/card/card.types';

const cards = [
  {
    id: 'discover-persona',
    icon: <img src={DiscoverLight} alt='Discover Icon' className='w-12 h-12 mx-auto' />,
    title: 'Discover Your Safari Persona',
    description:
      "Take our quick quiz to determine your safari travel style, preferences, and budget. We'll match you with experiences that align with your unique travel persona.",
  },
  {
    id: 'browse-recommendations',
    icon: <img src={BrowseLight} alt='Browse Icon' className='w-12 h-12 mx-auto' />,
    title: 'Browse Personalized Recommendations',
    description:
      'Explore curated safari experiences tailored to your preferences and budget. Our platform showcases the best options that match your travel style.',
  },
  {
    id: 'access-tools',
    icon: <img src={TimeLight} alt='Time Icon' className='w-12 h-12 mx-auto' />,
    title: 'Access Our Planning Tools',
    description:
      'Use our comprehensive planning tools to create your perfect safari itinerary. From accommodation to activities, we make planning seamless.',
  },
  {
    id: 'book-confidence',
    icon: <img src={BookSearch} alt='Book Search Icon' className='w-12 h-12 mx-auto' />,
    title: 'Book With Confidence',
    description:
      'Connect with verified operators and secure your dream safari adventure. Our trusted partners ensure an unforgettable experience.',
  },
];

const HowWandarWorks = () => {
  return (
    <div className='grid grid-cols-[auto_1fr_auto] min-h-[60rem] w-full bg-transparent overflow-hidden'>
      {/* Left icon */}
      <div className='self-end pb-[2.3rem]'>
        <img src={SubtractLeft} alt='Subtract Left' />
      </div>

      {/* Main content */}
      <div className='flex flex-col items-center justify-center p-4 sm:p-8 md:p-12 max-w-[1500px] mx-auto'>
        <div className='flex flex-col items-center mb-6 sm:mb-8 md:mb-[4rem]'>
          <h2
            className='text-[#2E2E2E] font-semibold text-[2rem] md:text-[3.375rem] leading-[2rem] md:leading-[2.1875rem] text-center'
            style={{ fontStyle: 'normal' }}
          >
            How Wandar{' '}
            <span className='relative inline-block'>
              Works
              <div className='h-[0.2em] bg-[#F4A261] mx-auto mt-[0.5em] rounded-none' />
            </span>
          </h2>
        </div>
        {/* Cards Grid Responsive */}
        <div className='grid grid-cols-1 md:grid-cols-2 xl-1450:grid-cols-4 gap-6 justify-items-center w-full max-w-[95%] mx-auto'>
          {cards.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              icon={card.icon}
              title={card.title}
              description={card.description}
              alignment={CARD_ALIGNMENT.CENTER}
              textColor='text-[#8B6545]'
            />
          ))}
        </div>
      </div>

      {/* Right icon */}
      <div className='self-start pt-[2.3rem]'>
        <img src={SubtractRight} alt='Subtract Right' />
      </div>
    </div>
  );
};

export default HowWandarWorks;
