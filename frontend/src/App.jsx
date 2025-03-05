import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Reason from './components/Reason';
import How from './components/How';
import Footer from './components/Footer';
import About from './components/About';
import FAQs from './components/FAQs';
import BetaForm from './components/BetaForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'animate.css';

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
