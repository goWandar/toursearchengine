import { FaXTwitter, FaInstagram, FaLinkedinIn, FaFacebookF, FaYoutube } from 'react-icons/fa6';

const socialIcons = [
  { id: 'twitter', icon: <FaXTwitter size={20} />, link: '#' },
  { id: 'instagram', icon: <FaInstagram size={20} />, link: '#' },
  { id: 'linkedin', icon: <FaLinkedinIn size={20} />, link: '#' },
  { id: 'facebook', icon: <FaFacebookF size={20} />, link: '#' },
  { id: 'youtube', icon: <FaYoutube size={20} />, link: '#' },
];

const ReachUs = () => {
  return (
    <section id='contact' className="bg-[#396B6B] py-20 px-4 sm:px-8 md:px-12 text-white text-center relative">
      {/* Badge */}
      <div className="inline-block bg-[#F4A261] text-[#2E2E2E] font-semibold px-4 py-1 text-sm rounded-full uppercase tracking-wide mb-4">
        Stay Connected
      </div>

      {/* Heading */}
      <h2 className="text-4xl font-bold mb-4">Reach Us</h2>

      {/* Subtext */}
      <p className="text-white/80 text-sm md:text-base max-w-xl mx-auto mb-12">
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
            className="w-14 h-14 flex items-center justify-center rounded-full bg-[#F4A261] text-white hover:opacity-80 transition"
          >
            {icon}
          </a>
        ))}
      </div>
    </section>
  );
};

export default ReachUs;
