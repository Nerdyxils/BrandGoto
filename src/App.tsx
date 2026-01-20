import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';

// Lazy load non-critical components to reduce initial bundle size
const AboutUs = lazy(() => import('./pages/AboutUs'));
const HowWeHelp = lazy(() => import('./pages/HowWeHelp'));
const ThingsWeBuilt = lazy(() => import('./pages/ThingsWeBuilt'));
const SuccessStories = lazy(() => import('./pages/SuccessStories'));
const BookConsultation = lazy(() => import('./pages/BookConsultation'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Launchpad = lazy(() => import('./pages/Launchpad'));
const Engineering = lazy(() => import('./pages/Engineering'));
const CountryRedirect = lazy(() => import('./components/CountryRedirect'));
const ChatbotWidget = lazy(() => import('./components/Chatbot/Chatbot'));

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-black body">
      <Suspense fallback={null}>
        <CountryRedirect />
      </Suspense>
      <Router>
        <Suspense fallback={<div className="min-h-screen bg-gray-900" />}>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/launchpad" element={<Launchpad />} />
            <Route path="/engineering" element={<Engineering />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/how-we-help" element={<HowWeHelp />} />
            <Route path="/things-we-built" element={<ThingsWeBuilt />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            <Route path="/book-consultation" element={<BookConsultation />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </Suspense>
      </Router>
      <Suspense fallback={null}>
        <ChatbotWidget />
      </Suspense>
    </div>
  );
};

export default App;