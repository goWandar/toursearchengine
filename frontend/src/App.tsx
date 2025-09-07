import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Hero from './components/layout/Hero';
// import HowWandarWorksLayout from './components/layout/How';
import WhyWandarLayout from './components/layout/Why';
import FaqLayout from './components/layout/FAQ';
import ReachUs from './components/layout/ReachUs';
import JoinWaitlistBox from './components/layout/Mailbox';
import Footer from './components/layout/Footer';
import HeroNew from './components/layout/Hero-New/HeroNew';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <>
              {/* <Hero /> */}
              <HeroNew />
              {/* <div className='max-w-[2500px] mx-auto'>
                <HowWandarWorksLayout />
              </div> */}
              <div className='max-w-[2500px] mx-auto bg-[#396B6B]'>
                <WhyWandarLayout />
              </div>
              <div className='max-w-[2500px] mx-auto'>
                <FaqLayout />
              </div>
              <div className='relative'>
                <ReachUs />
                <JoinWaitlistBox />
                <Footer />
              </div>
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
