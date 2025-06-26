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
    title: 'Discover Your Safari Persona',
    description:
      "Take our quick quiz to determine your safari travel style, preferences, and budget. We'll match you with experiences that align with your unique travel persona.",
  },
  {
    id: 'browse-recommendations',
    icon: BrowseIcon,
    title: 'Browse Personalized Recommendations',
    description:
      'Explore curated safari experiences tailored to your preferences and budget. Our platform showcases the best options that match your travel style.',
  },
  {
    id: 'access-tools',
    icon: TimeIcon,
    title: 'Access Our Planning Tools',
    description:
      'Use our comprehensive planning tools to create your perfect safari itinerary. From accommodation to activities, we make planning seamless.',
  },
  {
    id: 'book-confidence',
    icon: BookIcon,
    title: 'Book With Confidence',
    description:
      'Connect with verified operators and secure your dream safari adventure. Our trusted partners ensure an unforgettable experience.',
  },
];

const HowWandarWorks = () => {
  return (
    <section id='how' className="relative bg-[#FFFCF7] py-20 px-4 sm:px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Decorative Images */}
      <img
        src={SubtractLeft}
        alt="Decor Left"
        className="absolute left-0 bottom-0 w-[80px] sm:w-[100px] lg:w-[120px] pointer-events-none"
      />
      <img
        src={SubtractRight}
        alt="Decor Right"
        className="absolute right-0 top-0 w-[80px] sm:w-[100px] lg:w-[120px] pointer-events-none"
      />

      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-12 z-10 relative">
        <h2 className="text-4xl font-bold text-[#2E2E2E]">
          How{' '}
          <span className="relative inline-block">
            Wandar
            <div className="h-[5px] bg-[#F4A261] mt-[6px] rounded-sm w-full"></div>
          </span>{' '}
          Works
        </h2>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto relative z-10">
        {cards.map((card) => (
          <div
            key={card.id}
            className="bg-white text-[#5F3F25] border border-[#D8B887] rounded-lg p-6 shadow-sm flex flex-col items-center text-center h-full"
          >
            <img src={card.icon} alt="Icon" className="w-10 h-10 mb-4" />
            <h3 className="font-semibold text-lg mb-2">{card.title}</h3>
            <p className="text-sm opacity-90">{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowWandarWorks;
