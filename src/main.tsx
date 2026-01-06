import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Suppress browser extension errors in console
const originalError = console.error;
console.error = (...args) => {
  const errorMessage = args[0]?.toString() || '';
  // Filter out common browser extension errors
  if (
    errorMessage.includes('background-redux-new.js') ||
    errorMessage.includes('Invalid frameId for foreground frameId') ||
    errorMessage.includes('chrome-extension://')
  ) {
    return; // Suppress these errors
  }
  originalError.apply(console, args);
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
