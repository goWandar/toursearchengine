import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface NavItem {
  name: string;
  path: string;
  sectionId?: string;
}

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      // 如果滾動距離超過 50px，設置為 scrolled 狀態
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 當選單打開時防止背景滾動
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'; // 禁止背景滾動
    } else {
      document.body.style.overflow = 'unset'; // 恢復背景滾動
    }
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Function to scroll to section
  const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  // Array of navigation items with their corresponding paths
  const navItems: NavItem[] = [
    { name: 'About', path: '/#about', sectionId: 'about' },
    { name: 'Features', path: '/#features', sectionId: 'features' },
    { name: 'Blog', path: '/#blog', sectionId: 'blog' },
    { name: "FAQ's", path: '/#faqs', sectionId: 'faqs' },
    { name: 'Search', path: '/tour-search' },
  ];

  // NavList component
  const NavList: React.FC = () => (
    <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
      {navItems.map((item) => (
        <li key={item.name} className={`nav-item ${isScrolled ? 'scrolled-link' : ''}`}>
          {item.sectionId ? (
            <a
              href={item.path}
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                if (item.sectionId) {
                  scrollToSection(item.sectionId);
                }
              }}
            >
              {item.name}
            </a>
          ) : (
            <Link to={item.path} onClick={() => setIsMobileMenuOpen(false)}>
              {item.name}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <section>
        {' '}
        <nav
          className={`navbar ${isScrolled ? 'scrolled' : ''} ${isMobileMenuOpen ? 'menu-open' : ''}`}
        >
          <div className='container'>
            <h1>
              <a
                href='https://www.linkedin.com/company/kulturexplora/'
                target='_blank'
                rel='noopener noreferrer'
              >
                {/* 大Logo */}
                <img
                  src='../../../../assets/icons/Union.svg'
                  className='logo desktop-logo'
                  alt='KulturExplora Logo'
                />
              </a>
            </h1>
            {/* 漢堡選單按鈕 */}
            <button
              className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
              onClick={toggleMobileMenu}
              aria-label='Toggle menu'
            >
              <span />
              <span />
              <span />
            </button>

            {/* 導航連結 */}
            <NavList />
          </div>
        </nav>
      </section>
    </>
  );
};

export default Navbar;
