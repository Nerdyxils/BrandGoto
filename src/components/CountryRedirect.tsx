// src/components/CountryRedirect.tsx
import { useEffect } from 'react';

const CountryRedirect = () => {
  useEffect(() => {
    const handleCountryRedirect = async () => {
      try {
        // Skip redirect checks if:
        // - On localhost/development
        // - Already checked in this session
        // - Manual override parameter exists
        if (
          window.location.hostname === 'localhost' || 
          sessionStorage.getItem('country_redirect_checked') ||
          new URLSearchParams(window.location.search).has('no_redirect')
        ) {
          return;
        }

        // Mark as checked to prevent multiple redirects in same session
        sessionStorage.setItem('country_redirect_checked', 'true');
        
        // Get user's country with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout
        
        const response = await fetch('https://ipapi.co/json/', {
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        
        if (!response.ok) throw new Error('Country detection failed');
        
        const data = await response.json();
        const userCountry = data.country_code;
        
        const currentDomain = window.location.hostname;
        const currentPath = window.location.pathname + window.location.search + window.location.hash;
        
        // Redirect logic
        if (userCountry === 'CA' && currentDomain === 'brandgoto.com') {
          // Canadian user on .com -> redirect to .ca
          console.log('🇨🇦 Redirecting Canadian user to .ca domain');
          window.location.href = `https://brandgoto.ca${currentPath}`;
        } else if (userCountry !== 'CA' && currentDomain === 'brandgoto.ca') {
          // Non-Canadian user on .ca -> redirect to .com
          console.log('🌍 Redirecting non-Canadian user to .com domain');
          window.location.href = `https://brandgoto.com${currentPath}`;
        } else {
          console.log(`✅ User (${userCountry}) is on correct domain (${currentDomain})`);
        }
        
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.log('Country detection failed, staying on current domain:', errorMessage);
        // Fail silently - don't redirect if detection fails
        // This prevents breaking the site if the API is down
      }
    };

    // Small delay to ensure page is loaded
    const timer = setTimeout(handleCountryRedirect, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return null; // This component doesn't render anything visible
};

export default CountryRedirect;