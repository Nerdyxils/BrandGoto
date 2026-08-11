import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Lazy load non-critical components to reduce initial bundle size
const Hero = lazy(() => import('./components/Hero'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const HowWeHelp = lazy(() => import('./pages/HowWeHelp'));
const ThingsWeBuilt = lazy(() => import('./pages/ThingsWeBuilt'));
const SuccessStories = lazy(() => import('./pages/SuccessStories'));
const BookConsultation = lazy(() => import('./pages/BookConsultation'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Launchpad = lazy(() => import('./pages/Launchpad'));
const Engineering = lazy(() => import('./pages/Engineering'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const NotFound = lazy(() => import('./pages/NotFound'));
const SiteLayout = lazy(() => import('./components/SiteLayout'));
const Chatbot = lazy(() => import('./components/Chatbot/Chatbot'));

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-black body">
      <Router>
        <Suspense fallback={<div className="min-h-screen bg-black" aria-hidden="true" />}>
          <Routes>
            <Route element={<SiteLayout />}>
              <Route path="/" element={<Hero />} />
              <Route path="/launchpad" element={<Launchpad />} />
              <Route path="/engineering" element={<Engineering />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/how-we-help" element={<HowWeHelp />} />
              <Route path="/things-we-built" element={<ThingsWeBuilt />} />
              <Route path="/success-stories" element={<SuccessStories />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/book-consultation" element={<BookConsultation />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
      <Suspense fallback={null}>
        <Chatbot />
      </Suspense>
    </div>
  );
};

export default App;
