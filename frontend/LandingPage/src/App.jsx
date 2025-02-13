import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a
          href='https://www.linkedin.com/company/kulturexplora/'
          target='_blank'
        >
          <img
            src='/Logos/png/ColorLogo NoBackground.png'
            className='logo'
            alt='KulturExp
            loraLogo'
          />
        </a>
      </div>
      <h1>KulturExplora Landing page is coming soon...</h1>
    </>
  );
}

export default App;
