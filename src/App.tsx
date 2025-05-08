import React, { useState } from 'react';
import Preloader from './components/Preloader';

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-white w-full">
      <Preloader onComplete={() => setIsLoaded(true)} />
      {isLoaded && (
        <div className="flex items-center justify-center h-screen w-full">
          <h1 className="text-4xl font-bold text-red-500">
            Welcome to Brandgoto
          </h1>
        </div>
      )}
    </div>
  );
};

export default App;