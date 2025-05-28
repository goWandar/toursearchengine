import 'animate.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
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

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <Navbar />
              <Banner />
              <About />
              <Reason />
              <How />
              <BetaForm />
              <FAQs />
              <Footer />
            </>
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
