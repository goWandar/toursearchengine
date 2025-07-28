import { FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa6';
import Logo from '../../../assets/icons/Union.svg';

const Footer = () => {
  return (
    <footer className="bg-[#1E1E1E] pt-40 pb-10 px-4 sm:px-8 md:px-12 text-white relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-6 border-b border-[#E5D6B5] pb-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={Logo} alt="Wandar Logo" className="h-6 w-auto" />
          <span className="text-xl font-bold">Wandar</span>
        </div>

        {/* Navigation Links */}
        <ul className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm">
          <li><a href="#how" className="hover:underline">How It Works</a></li>
          <li><a href="#features" className="hover:underline">Why Wandar</a></li>
          <li><a href="#faqs" className="hover:underline">FAQs</a></li>
          <li><a href="#contact" className="hover:underline">Contact Us</a></li>
        </ul>

        {/* Social Icons */}
        <div className="flex gap-4">
          {[FaFacebookF, FaLinkedinIn, FaInstagram].map((Icon, index) => (
            <a
              key={index}
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Wandar on social media"
              className="hover:opacity-80 transition"
            >
              <Icon size={20} />
            </a>
          ))}
        </div>
      </div>

      {/* Copyright & Policies */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center mt-6 text-sm text-white/70 gap-2 sm:gap-0">
        <p>© 2025 Wandar. All Rights Reserved.</p>
        <div className="flex gap-6">
          <a href="/privacy" className="hover:underline">Privacy Policy</a>
          <a href="/terms" className="hover:underline">Terms Of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
