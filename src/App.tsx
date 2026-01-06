import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Preloader from './components/Preloader';
import Hero from './components/Hero';
import AboutUs from './pages/AboutUs';
import HowWeHelp from './pages/HowWeHelp';
import ThingsWeBuilt from './pages/ThingsWeBuilt';
import SuccessStories from './pages/SuccessStories';
import BookConsultation from './pages/BookConsultation';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CountryRedirect from './components/CountryRedirect';
import ChatbotWidget from './components/ChatbotWidget';

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
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/how-we-help" element={<HowWeHelp />} />
            <Route path="/things-we-built" element={<ThingsWeBuilt />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            <Route path="/book-consultation" element={<BookConsultation />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </Router>
      )}
      <ChatbotWidget />
    </div>
  );
};

export default App;