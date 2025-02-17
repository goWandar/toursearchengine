import React, { useEffect, useState } from 'react';

const Navbar = () => {
  // State to track if the page is scrolled
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Function to handle scroll event
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Attach scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 當選單打開時防止背景滾動
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className='container'>
          <h1>
            <a
              href='https://www.linkedin.com/company/kulturexplora/'
              target='_blank'
              rel='noopener noreferrer'
            >
              {/* 大螢幕 Logo */}
              <img
                src='/Logos/png/ColorLogoNoBackground.png'
                className='logo desktop-logo'
                alt='KulturExp
            loraLogo'
              />
              {/* 手機版 Logo */}
              <img
                src='/Logos/png/ColorLogo.png' // 請確保這個路徑指向你的小logo
                className='logo mobile-logo'
                alt='KulturExplora Small Logo'
              />
            </a>
          </h1>
          {/* Hamburger Menu Button */}
          <button
            className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label='Toggle menu'
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Navigation Links */}
          <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
            <li className={`nav-item ${isScrolled ? 'scrolled-link' : ''}`}>
              <a href='#' onClick={() => setIsMobileMenuOpen(false)}>
                About
              </a>
            </li>
            <li className={`nav-item ${isScrolled ? 'scrolled-link' : ''}`}>
              <a href='#' onClick={() => setIsMobileMenuOpen(false)}>
                Features
              </a>
            </li>
            <li className={`nav-item ${isScrolled ? 'scrolled-link' : ''}`}>
              <a href='#' onClick={() => setIsMobileMenuOpen(false)}>
                Blog
              </a>
            </li>
            <li className={`nav-item ${isScrolled ? 'scrolled-link' : ''}`}>
              <a href='#' onClick={() => setIsMobileMenuOpen(false)}>
                FAQ’s
              </a>
            </li>
          </ul>
          {/* <h1>KulturExplora Landing page is coming soon...</h1> */}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
