import { FaFacebookSquare, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { IoLogoTiktok } from 'react-icons/io5';

interface SocialLink {
  url: string;
  icon: React.ReactNode;
}

const Footer = () => {
  const socialLinks: SocialLink[] = [
    {
      url: 'https://www.linkedin.com/company/kulturexplora/posts/?feedView=all',
      icon: <FaLinkedin size={48} style={{ color: 'var(--primary-color)' }} />,
    },
    {
      url: 'https://www.facebook.com/profile.php?id=61573159404713',
      icon: <FaFacebookSquare size={48} style={{ color: 'var(--primary-color)' }} />,
    },
    {
      url: 'https://www.instagram.com/kulturexplora?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
      icon: <FaInstagram size={48} style={{ color: 'var(--primary-color)' }} />,
    },
    {
      url: 'https://www.tiktok.com/@kulturexplora?_t=ZN-8tvtJxYrf0Q&_r=1',
      icon: <IoLogoTiktok size={48} style={{ color: 'var(--primary-color)' }} />,
    },
  ];
  return (
    <footer className='py-8' style={{ backgroundColor: 'var(--secondary-color)' }}>
      <div className='container p-4 d-flex  justify-content-between align-items-center flex-column flex-md-row'>
        <div className='d-flex align-items-center flex-column flex-md-row'>
          <h1>
            <img src='/Logos/png/ColorLogoNoBackground.png' alt='logo' style={{ width: '250px' }} />
            <a href='#' />
          </h1>
          <div className='d-flex flex-column ms-3'>
            <p className='m-0 fs-4 fw-bold'>Discover Africa. Book Smart. Travel Better.</p>
            <span className='fs-6 pb-2'>
              Try KultureXplora - The easiest way to find Africa&apos;s best safari operators.
            </span>
          </div>
        </div>

        <ul className='socialMedia d-flex justify-content-center'>
          {socialLinks.map((link, index) => (
            <li key={index}>
              <a href={link.url}>{link.icon}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className=' p-2 text-center'>
        <p className='m-0'>&copy; 2025 KultureXplora. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
