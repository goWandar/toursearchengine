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
      'Tell us about your trip by taking our smart quiz — who you’re traveling with, your comfort level, and what you’re hoping for. You don’t need to know where to go or what to pick. Wandar helps you start with clarity, not confusion with suggested safaris that fit.',
  },
  {
    id: 'browse-recommendations',
    icon: BrowseIcon,
    title: 'Get a Curated Shortlist',
    description:
      'No need to scroll through hundreds of options. We show you a focused set of safaris that are worth your time based on real traveler reviews and how well they align with your needs. You’ll see why each one’s a match and what makes it different.',
  },
  {
    id: 'access-tools',
    icon: TimeIcon,
    title: 'Use Our Safari Prep Guide',
    description:
      'Wondering when to go, what to pack, visa or health requirements? We answer the questions most travelers spend hours searching for so you don’t have to. You get just the info you need, right when you need it.',
  },
  {
    id: 'book-confidence',
    icon: BookIcon,
    title: 'Book Direct with the Operator',
    description:
      "When you're ready, we send you straight to the official operator site. No added fees. No middlemen. No pressure. You stay in control. We help you choose not push you to book.",
  },
];

const HowWandarWorks = () => {
  return (
    <section
      id="how"
      className="relative bg-[#FFFCF7] py-20 px-4 sm:px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      {/* Decorative Images */}
      <img
        src={SubtractLeft}
        alt="Decor Left"
        className="absolute left-0 bottom-0 w-16 sm:w-24 lg:w-28 pointer-events-none z-0"
      />
      <img
        src={SubtractRight}
        alt="Decor Right"
        className="absolute right-0 top-0 w-16 sm:w-24 lg:w-28 pointer-events-none z-0"
      />

      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-12 z-10 relative">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2E2E2E] leading-tight">
          How{' '}
          <span className="relative inline-block">
            Wandar
            <div className="h-[5px] bg-[#F4A261] mt-[6px] rounded-sm w-full" />
          </span>{' '}
          Works
        </h2>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto z-10 relative">
        {cards.map((card) => (
          <div
            key={card.id}
            className="bg-white text-[#5F3F25] border border-[#D8B887] rounded-xl p-6 shadow-md flex flex-col items-center text-center h-full transition hover:shadow-lg"
          >
            <img src={card.icon} alt="Icon" className="w-10 h-10 mb-4" />
            <h3 className="font-semibold text-lg sm:text-xl mb-2">{card.title}</h3>
            <p className="text-sm sm:text-base text-opacity-90">{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowWandarWorks;
