import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Preloader from './components/Preloader';
import Hero from './components/Hero';
import CountryRedirect from './components/CountryRedirect';
// import BusinessAssessmentLanding from './complete-business-assessment/business-assessment.tsx';

const App: React.FC = () => {
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 body">
      <CountryRedirect />
      {!isPreloaderComplete && <Preloader onComplete={() => setIsPreloaderComplete(true)} />}
      {isPreloaderComplete && (
        <Router>
          <Routes>
            <Route path="/" element={<Hero />} />
            {/* <Route path="/complete-business-assessment" element={<BusinessAssessmentLanding />} /> */}
          </Routes>
        </Router>
      )}
    </div>
  );
};

export default App;