import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Preloader from './components/Preloader';
import Hero from './components/Hero';
import BusinessAssessmentLanding from './complete-business-assessment/business-assessment.tsx';
import Qr from './assets/qr/qr-code.tsx';

const App: React.FC = () => {
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 body">
      {!isPreloaderComplete && <Preloader onComplete={() => setIsPreloaderComplete(true)} />}
      {isPreloaderComplete && (
        <Router>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/complete-business-assessment" element={<BusinessAssessmentLanding />} />
            <Route path="/qr" element={<Qr />} />
          </Routes>
        </Router>
      )}
    </div>
  );
};

export default App;