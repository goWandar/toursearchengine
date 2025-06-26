import { FaFacebookF, FaXTwitter, FaLinkedinIn, FaYoutube, FaInstagram } from 'react-icons/fa6';
import Logo from '../../../assets/icons/union.svg'; // Update with your white logo path

const Footer = () => {
  return (
    <footer className="bg-[#1E1E1E] pt-32 sm:pt-36 md:pt-40 lg:pt-48 pb-10 px-6 text-white">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-6 border-b border-[#E5D6B5] pb-6">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <img src={Logo} alt="Wandar Logo" className="h-6" />
          <span className="text-xl font-bold">Wandar</span>
        </div>

        {/* Center: Nav Links */}
        <ul className="flex gap-6 text-sm">
          <li><a href="#how" className="hover:underline">How It Works</a></li>
          <li><a href="#features" className="hover:underline">Features</a></li>
          <li><a href="#faqs" className="hover:underline">FAQs</a></li>
          <li><a href="#contact" className="hover:underline">Contact Us</a></li>
        </ul>

        {/* Right: Social Icons */}
        <div className="flex gap-4">
          {[FaFacebookF, FaXTwitter, FaLinkedinIn, FaYoutube, FaInstagram].map((Icon, i) => (
            <Icon key={i} size={20} className="hover:opacity-80" />
          ))}
        </div>
      </div>

      {/* Bottom: Copyright */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between text-sm text-white/70 mt-6">
        <p>© 2025 Wandar. All Rights Reserved.</p>
        <div className="flex gap-6 mt-2 sm:mt-0">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms Of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
