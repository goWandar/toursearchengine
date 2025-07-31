import { useState } from 'react';
import Button from '../../../common/button/button.component';
import { BUTTON_VARIANT } from '../../../common/button/button.types';
import UnionIcon from '../../../../assets/icons/Union.svg';
import { Link } from 'react-scroll';
import { FaBars, FaTimes } from 'react-icons/fa';

const navItems = [
  { label: 'How it works', to: 'how' },
  { label: 'Why Wandar', to: 'features' },
  { label: 'FAQs', to: 'faqs' },
  { label: 'Contact us', to: 'contact' },
];

const handleJoinBetaClick = () => {
  const section = document.getElementById('contact');
  const input = document.getElementById('email-input') as HTMLInputElement | null;

  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => {
      input?.focus();
    }, 600);
  }
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full z-50">
      <div className="flex justify-between items-center px-4 md:px-8 py-4 bg-transparent relative">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={UnionIcon} alt="Wandar Logo" className="h-8" />
          <span className="text-[2.45rem] font-bold text-white leading-none">Wandar</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              smooth={true}
              duration={600}
              offset={-80}
              spy={true}
              className="cursor-pointer"
            >
              <Button
                id={`nav-${to}`}
                label={label}
                variant={BUTTON_VARIANT.TERTIARY}
                hasBorder={false}
                className="text-white hover:text-primary-500 hover:bg-transparent"
              />
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Button
            id="join-beta-button"
            label="Join Beta"
            variant={BUTTON_VARIANT.PRIMARY}
            className="text-[#2E2E2E]"
            onClick={handleJoinBetaClick}
          />
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white text-xl">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#1E1E1E]/90 px-4 py-6 space-y-4 text-white text-base shadow-md">
          {navItems.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              smooth={true}
              duration={600}
              offset={-80}
              spy={true}
              onClick={() => setMenuOpen(false)}
              className="block"
            >
              <Button
                id={`mobile-nav-${to}`}
                label={label}
                variant={BUTTON_VARIANT.TERTIARY}
                hasBorder={false}
                className="text-white w-full text-left"
              />
            </Link>
          ))}

          <Button
            id="mobile-join-beta-button"
            label="Join Beta"
            variant={BUTTON_VARIANT.PRIMARY}
            className="text-[#2E2E2E] w-full"
            onClick={() => {
              setMenuOpen(false);
              handleJoinBetaClick();
            }}
          />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
