import 'animate.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import About from './components/LandingPage/About';
import Banner from './components/LandingPage/Banner';
import BetaForm from './components/LandingPage/BetaForm';
import FAQs from './components/LandingPage/FAQs';
import Footer from './components/LandingPage/Footer';
import How from './components/LandingPage/How';
import Navbar from './components/LandingPage/Navbar';
import Reason from './components/LandingPage/Reason';
import TourSearch from './components/TourSearch/TourSearch';
import Button, {
  BUTTON_ICON_POSITION,
  BUTTON_SHAPE,
  BUTTON_SIZE,
  BUTTON_VARIANT,
} from './components/button';
import { FaSearch } from 'react-icons/fa';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <div className='min-h-screen bg-white'>
              <Navbar />
              <Button
                label='Search for a tour'
                icon={<FaSearch />}
                size={BUTTON_SIZE.LARGE}
                variant={BUTTON_VARIANT.PRIMARY}
                iconPosition={BUTTON_ICON_POSITION.TOP}
                onClick={() => console.log('clicked')}
                textColor='text-black'
                iconColor='text-black'
              />

              {/* Icon-only button (rectangle) */}
              <Button
                icon={<FaSearch />}
                size={BUTTON_SIZE.LARGE}
                variant={BUTTON_VARIANT.PRIMARY}
                iconColor='text-white'
              />

              {/* Icon-only button (circle) */}
              <Button
                icon={<FaSearch />}
                size={BUTTON_SIZE.LARGE}
                variant={BUTTON_VARIANT.PRIMARY}
                shape={BUTTON_SHAPE.CIRCLE}
                iconColor='text-white'
              />

              {/* Icon-only button (tertiary) */}
              <Button
                icon={<FaSearch />}
                size={BUTTON_SIZE.LARGE}
                variant={BUTTON_VARIANT.TERTIARY}
                iconColor='text-primary-500'
              />
              <Banner />
              <About />
              <Reason />
              <How />
              <BetaForm />
              <FAQs />
              <Footer />
            </div>
          }
        />
        <Route
          path='/tour-search'
          element={
            <>
              {/* <Navbar /> */}
              <TourSearch />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
