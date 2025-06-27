import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-scroll';
import Icon from '../../../assets/icons/discover-light.svg'; // Placeholder icon

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
    title: 'Tailored Recommendations',
    description:
      'Explore curated safari options selected based on your travel personality and goals.',
  },
  {
    id: 3,
    icon: Icon,
    title: 'Smart Planning Tools',
    description:
      'Seamlessly build your trip with intuitive tools to customize lodging, dates, and experiences.',
  },
  {
    id: 4,
    icon: Icon,
    title: 'Real Traveler Insights',
    description:
      'Get reviews, stories, and insights from like-minded explorers to plan with confidence.',
  },
  {
    id: 5,
    icon: Icon,
    title: 'Trusted Operators Only',
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
    <section id="features" className="bg-[#396B6B] text-white py-20 px-4 sm:px-8 md:px-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-block bg-[#F4A261] text-[#2E2E2E] font-semibold px-4 py-1 text-sm rounded-full uppercase tracking-wide">
          Experience the Difference
        </div>
        <h2 className="mt-4 text-4xl font-bold">
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

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="bg-white/20 text-white border border-white/30 backdrop-blur-sm rounded-xl p-6 flex flex-col justify-between transition duration-300 hover:shadow-md"
          >
            <img
              src={feature.icon}
              alt="Icon"
              className="w-10 h-10 rounded-md bg-[#F4A261] p-2 mb-4"
            />
            <div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-white/80 mb-4">{feature.description}</p>
            </div>
            <button className="flex items-center gap-2 text-[#F4A261] font-medium mt-auto hover:underline">
              Learn More <FaArrowRight size={12} />
            </button>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="text-center mt-12">
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
            }, 100); // delay helps ensure scroll is complete
          }}
          className="cursor-pointer"
        >
          <div>
            <button className="bg-[#F4A261] text-[#2E2E2E] font-semibold py-3 px-6 rounded-md hover:opacity-90 flex items-center gap-2 mx-auto">
              Join Our Beta <FaArrowRight size={14} />
            </button>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default WhyWandarWithUs;
