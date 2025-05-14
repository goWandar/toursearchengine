import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'animate.css';
import Navbar from './components/LandingPage/Navbar.js';
import Banner from './components/LandingPage/Banner.js';
import About from './components/LandingPage/About.js';
import Reason from './components/LandingPage/Reason.js';
import How from './components/LandingPage/How.js';
import BetaForm from './components/LandingPage/BetaForm.js';
import FAQs from './components/LandingPage/FAQs.js';
import Footer from './components/LandingPage/Footer.js';
import TourSearch from './components/TourSearch/TourSearch.js';

const App: React.FC = () => {
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
