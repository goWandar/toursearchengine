import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/layout/Hero';
import HowWandarWorksLayout from './components/layout/How';
import WhyWandarLayout from './components/layout/Why';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <Hero />
              <div className='max-w-[2500px] mx-auto'>
                <HowWandarWorksLayout />
              </div> 
              <div className='max-w-[2500px] mx-auto bg-[#396B6B]'>
                <WhyWandarLayout />
              </div>             
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
