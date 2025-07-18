import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-scroll';
import Icon from '../../../assets/icons/discover-light.svg'; // Replace with real icons if available

const features = [
  {
    id: 1,
    icon: Icon,
    title: 'Personalized Matching',
    description:
      'Our intelligent quiz identifies your safari persona and matches you with experiences that fit your travel style, comfort level, and interests.',
  },
  {
    id: 2,
    icon: Icon,
    title: 'Curated, Not Crowded',
    description:
      'Explore curated safari options selected based on your travel personality and goals.',
  },
  {
    id: 3,
    icon: Icon,
    title: 'Helpful, Not Overwhelming',
    description:
      'Seamlessly build your trip with intuitive tools to customize lodging, dates, and experiences.',
  },
  {
    id: 4,
    icon: Icon,
    title: 'Independent Reviews, All in One Place',
    description:
      'Get reviews, stories, and insights from like-minded explorers to plan with confidence.',
  },
  {
    id: 5,
    icon: Icon,
    title: 'Decision Making Insights',
    description:
      'We vet every operator to ensure your journey is safe, ethical, and top-quality.',
  },
  {
    id: 6,
    icon: Icon,
    title: 'Secure Booking Experience',
    description:
      'Book your trip with full transparency and support from the Wandar team.',
  },
];

const WhyWandarWithUs = () => {
  return (
    <section id="features" className="bg-[#396B6B] text-white py-20 px-4 sm:px-6 md:px-12 lg:px-24">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-block bg-[#F4A261] text-[#2E2E2E] font-semibold px-4 py-1 text-sm rounded-full uppercase tracking-wide">
          Experience the Difference
        </div>
        <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
          Why{' '}
          <span className="relative inline-block">
            Wandar
            <div className="w-full h-1 bg-[#F4A261] mt-2 rounded-sm" />
          </span>{' '}
          With Us
        </h2>
        <p className="mt-4 text-white/80 text-sm md:text-base max-w-2xl mx-auto">
          We’re reimagining how travelers discover, plan, and book their perfect safari adventure.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="bg-white/10 text-white border border-white/20 backdrop-blur-md rounded-xl p-6 flex flex-col justify-between transition duration-300 hover:shadow-md"
          >
            <img
              src={feature.icon}
              alt="Icon"
              className="w-10 h-10 rounded-md bg-[#F4A261] p-2 mb-4"
            />
            <div className="mb-4">
              <h3 className="font-semibold text-lg">{feature.title}</h3>
              <p className="text-sm text-white/80 mt-2">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="text-center mt-14">
        <Link
          to="contact"
          smooth={true}
          duration={600}
          offset={-80}
          spy={true}
          onSetActive={() => {
            setTimeout(() => {
              const input = document.getElementById('email-input') as HTMLInputElement | null;
              input?.focus();
            }, 100);
          }}
          className="cursor-pointer"
        >
          <button className="bg-[#F4A261] text-[#2E2E2E] font-semibold py-3 px-6 rounded-md hover:opacity-90 flex items-center gap-2 mx-auto transition duration-200">
            Join Our Beta <FaArrowRight size={14} />
          </button>
        </Link>
      </div>
    </section>
  );
};

export default WhyWandarWithUs;
