import { FaInstagram, FaLinkedinIn, FaFacebookF } from 'react-icons/fa6';

const socialIcons = [
  { id: 'instagram', icon: <FaInstagram size={20} />, link: '#' },
  { id: 'linkedin', icon: <FaLinkedinIn size={20} />, link: '#' },
  { id: 'facebook', icon: <FaFacebookF size={20} />, link: '#' },
];

const ReachUs = () => {
  return (
    <section
      id="contact"
      className="bg-[#396B6B] py-20 px-4 sm:px-8 md:px-12 text-white text-center"
    >
      {/* Badge */}
      <div className="inline-block bg-[#F4A261] text-[#2E2E2E] font-semibold px-4 py-1 text-xs sm:text-sm rounded-full uppercase tracking-wide mb-4">
        Stay Connected
      </div>

      {/* Heading */}
      <h2 className="text-3xl sm:text-4xl font-bold mb-4">Reach Us</h2>

      {/* Subtext */}
      <p className="text-white/80 text-sm sm:text-base max-w-2xl mx-auto mb-10 px-2 sm:px-0">
        Follow us on social media to stay updated with our latest adventures, tips, and announcements.
      </p>

      {/* Social Icons */}
      <div className="flex justify-center items-center flex-wrap gap-6">
        {socialIcons.map(({ id, icon, link }) => (
          <a
            key={id}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Wandar on ${id}`}
            className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-[#F4A261] text-white hover:opacity-80 transition duration-200"
          >
            {icon}
          </a>
        ))}
      </div>
    </section>
  );
};

export default ReachUs;
