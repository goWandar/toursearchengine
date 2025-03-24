import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'animate.css';

import Navbar from './components/LandingPage/Navbar';
import Banner from './components/LandingPage/Banner';
import About from './components/LandingPage/About';
import Reason from './components/LandingPage/Reason';
import How from './components/LandingPage/How';
import BetaForm from './components/LandingPage/BetaForm';
import FAQs from './components/LandingPage/FAQs';
import Footer from './components/LandingPage/Footer';
import TourSearch from './components/TourSearch/TourSearch';

function App() {
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
}

export default App;
