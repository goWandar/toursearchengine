import Button from '../../../common/button/button.component';
import { BUTTON_VARIANT } from '../../../common/button/button.types';
import UnionIcon from '../../../../assets/icons/Union.svg';

const Navbar = () => {
  const navItems = ['How it works', 'Features', 'FAQs', 'Contact us'];

  return (
    <nav className='flex justify-between items-center flex-shrink-0'>
      {/* Logo and Brand Name */}
      <div className='flex items-center gap-2'>
        <img src={UnionIcon} alt='Union Logo' className='h-8' />
        <span className='text-[2.45081rem] font-bold text-white leading-none'>Wandar</span>
      </div>

      {/* Navigation Links */}
      <div className='hidden md:flex items-center space-x-8'>
        {navItems.map((item) => (
          <Button
            key={item}
            id={`nav-${item.toLowerCase().replace(/\s+/g, '-')}`}
            label={item}
            variant={BUTTON_VARIANT.TERTIARY}
            hasBorder={false}
            className='text-white hover:text-primary-500 hover:bg-transparent'
          />
        ))}
      </div>

      {/* Join Beta Button */}
      <div className='flex-shrink-0'>
        <Button
          id='join-beta-button'
          label='Join Beta'
          variant={BUTTON_VARIANT.PRIMARY}
          className='text-[#2E2E2E]'
        />
      </div>
    </nav>
  );
};

export default Navbar;
