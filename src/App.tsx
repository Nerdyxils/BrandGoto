import React, { useState } from 'react';
import Preloader from './components/Preloader';
import Hero from './components/Hero';

const App: React.FC = () => {
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 body">
      {!isPreloaderComplete && <Preloader onComplete={() => setIsPreloaderComplete(true)} />}
      {isPreloaderComplete && <Hero />}
    </div>
  );
};

export default App;