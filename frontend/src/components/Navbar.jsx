import React, { useEffect, useState } from 'react';

const Navbar = () => {
  // State to track if the page is scrolled
  const [isScrolled, setIsScrolled] = useState(false);
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

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className='container'>
          <h1>
            <a
              href='https://www.linkedin.com/company/kulturexplora/'
              target='_blank'
            >
              <img
                src='/Logos/png/ColorLogoNoBackground.png'
                className='logo'
                alt='KulturExp
            loraLogo'
              />
            </a>
          </h1>
          <ul>
            <li className={`nav-item ${isScrolled ? 'scrolled-link' : ''}`}>
              <a href='#'>About</a>
            </li>
            <li className={`nav-item ${isScrolled ? 'scrolled-link' : ''}`}>
              <a href='#'>Features</a>
            </li>
            <li className={`nav-item ${isScrolled ? 'scrolled-link' : ''}`}>
              <a href='#'>Blog</a>
            </li>
            <li className={`nav-item ${isScrolled ? 'scrolled-link' : ''}`}>
              <a href='#'>FAQ’s</a>
            </li>
          </ul>
          {/* <h1>KulturExplora Landing page is coming soon...</h1> */}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
