import React from 'react';
import { IoLogoTiktok } from 'react-icons/io5';
import { FaFacebookSquare } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer>
      {' '}
      <footer className='bg-gray-900 py-8'>
        <div className='container'>
          <h1>
            <img
              src='/Logos/png/ColorLogoWBackground.png'
              alt='logo'
              style={{ width: '100px' }}
            />
            <a href='#'></a>
          </h1>
          <p>Discover Africa. Book Smart. Travel Better.</p>
          <span>
            Try KultureXplora—The easiest way to find Africa's best safari
            operators.
          </span>
          <ul className='socialMedia d-flex justify-content-center'>
            <li>
              <FaLinkedin size={48} style={{ color: '#fd7e14' }} />
            </li>

            <li>
              <FaFacebookSquare size={48} style={{ color: '#fd7e14' }} />
            </li>
            <li>
              <FaInstagram size={48} style={{ color: '#fd7e14' }} />
            </li>
            <li>
              {' '}
              <a href='https://www.tiktok.com/@kulturexplora?_t=ZN-8tvtJxYrf0Q&_r=1'>
                <IoLogoTiktok size={48} style={{ color: '#fd7e14' }} />
              </a>
            </li>
          </ul>
        </div>
        <div className='max-w-6xl mx-auto px-4 text-center'>
          <p>&copy; 2024 KultureXplora. All rights reserved.</p>
        </div>
      </footer>
    </footer>
  );
};

export default Footer;
