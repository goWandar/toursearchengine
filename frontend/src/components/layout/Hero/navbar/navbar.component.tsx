import Button from '../../../common/button/button.component';
import { BUTTON_VARIANT } from '../../../common/button/button.types';
import UnionIcon from '../../../../assets/icons/Union.svg';
import { Link } from 'react-scroll';

const navItems = [
  { label: 'How it works', to: 'how' },
  { label: 'Features', to: 'features' },
  { label: 'FAQs', to: 'faqs' },
  { label: 'Contact us', to: 'contact' },
];

const handleJoinBetaClick = () => {
  const section = document.getElementById('contact');
  const input = document.getElementById('email-input') as HTMLInputElement | null;

  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Slight delay before focusing the input
    setTimeout(() => {
      input?.focus();
    }, 600);
  }
};

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center flex-shrink-0">
      {/* Logo and Brand Name */}
      <div className="flex items-center gap-2">
        <img src={UnionIcon} alt="Union Logo" className="h-8" />
        <span className="text-[2.45081rem] font-bold text-white leading-none">Wandar</span>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center space-x-8">
        {navItems.map(({ label, to }) => (
          <Link
            key={to}
            to={to}
            smooth={true}
            duration={600}
            offset={-80} // Adjust for sticky navbar if needed
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

      {/* Join Beta Button (uses manual scroll for reliability in production) */}
      <div className="flex-shrink-0">
        <Button
          id="join-beta-button"
          label="Join Beta"
          variant={BUTTON_VARIANT.PRIMARY}
          className="text-[#2E2E2E]"
          onClick={handleJoinBetaClick}
        />
      </div>
    </nav>
  );
};

export default Navbar;
