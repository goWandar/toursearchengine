import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/layout/Hero';
import HowWandarWorksLayout from './components/layout/How';
import TextSearchPage from './components/TextSearch/TextSearchPage';

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
            </>
          }
        />
        <Route
          path='/search'
          element={
            <>
              <TextSearchPage />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
