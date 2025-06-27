import DiscoverIcon from '../../../assets/icons/discover-light.svg';
import BrowseIcon from '../../../assets/icons/browse-light.svg';
import TimeIcon from '../../../assets/icons/time-light.svg';
import BookIcon from '../../../assets/icons/book-search.svg';
import SubtractLeft from '../../../assets/icons/Subtract-left.svg';
import SubtractRight from '../../../assets/icons/Subtract-right.svg';

const cards = [
  {
    id: 'discover-persona',
    icon: DiscoverIcon,
    title: 'Start with a Quick Quiz',
    description:
      'Take our short Safari Persona Quiz so we can better understand your travel style, comfort level, and interests and suggest safaris that fit.',
  },
  {
    id: 'browse-recommendations',
    icon: BrowseIcon,
    title: 'Get a Curated Shortlist',
    description:
      'No need to scroll through hundreds of options. We surface a focused set of well-reviewed safaris across South Africa, Kenya, Tanzania, and Botswana so you can choose with more clarity, less stress.',
  },
  {
    id: 'access-tools',
    icon: TimeIcon,
    title: 'Use Our Safari Prep Guide',
    description:
      'From visas, health and packing tips to wildlife viewing windows, our guide covers key details to help you feel more confident as you plan.',
  },
  {
    id: 'book-confidence',
    icon: BookIcon,
    title: 'Book Direct with the Operator',
    description:
      "We don't handle bookings. Instead, we connect you to the operator's official site so you can book directly without middlemen or markups.",
  },
];

const HowWandarWorks = () => {
  return (
    <section
      id='how'
      className='relative bg-[#FFFCF7] py-20 px-4 sm:px-6 md:px-12 lg:px-24 overflow-hidden h-[50rem] flex flex-col justify-center'
    >
      {/* Decorative Images */}
      <img
        src={SubtractLeft}
        alt='Decor Left'
        className='absolute left-0 bottom-0 w-[80px] sm:w-[100px] lg:w-[120px] pointer-events-none'
      />
      <img
        src={SubtractRight}
        alt='Decor Right'
        className='absolute right-0 top-0 w-[80px] sm:w-[100px] lg:w-[120px] pointer-events-none'
      />

      {/* Header */}
      <div className='max-w-7xl mx-auto text-center mb-12 z-10 relative'>
        <h2 className='text-4xl font-bold text-[#2E2E2E]'>
          How{' '}
          <span className='relative inline-block'>
            Wandar
            <div className='h-[5px] bg-[#F4A261] mt-[6px] rounded-sm w-full' />
          </span>{' '}
          Works
        </h2>
      </div>

      {/* Card Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto relative z-10'>
        {cards.map((card) => (
          <div
            key={card.id}
            className='bg-white text-[#5F3F25] border border-[#D8B887] rounded-lg p-6 shadow-sm flex flex-col items-center text-center h-full'
          >
            <img src={card.icon} alt='Icon' className='w-10 h-10 mb-4' />
            <h3 className='font-semibold text-lg mb-2'>{card.title}</h3>
            <p className='text-sm opacity-90'>{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowWandarWorks;
