import { BrowserRouter as Router } from 'react-router-dom';
import Hero from './components/layout/Hero';
import HowWandarWorksLayout from './components/layout/How';

const App = () => {
  return (
    <div>
      <Router>
        <Hero />
        <div className='max-w-[2500px] mx-auto'>
          <HowWandarWorksLayout />
        </div>
      </Router>
    </div>
  );
};

export default App;
