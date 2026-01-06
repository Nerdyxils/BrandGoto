// src/components/CountryRedirect.tsx
import { useEffect } from 'react';

const CountryRedirect = () => {
  useEffect(() => {
    const handleCountryRedirect = async () => {
      try {
        // Skip if:
        // - Development environment
        // - Already checked this session
        // - Manual override parameter exists
        // - User came from a redirect (to prevent loops)
        const urlParams = new URLSearchParams(window.location.search);
        const hasRedirectParam = urlParams.has('no_redirect') || urlParams.has('redirected');
        const sessionKey = 'country_redirect_checked';
        const hasSessionCheck = sessionStorage.getItem(sessionKey);
        const isDevelopment = window.location.hostname === 'localhost' || 
                            window.location.hostname.includes('127.0.0.1') ||
                            window.location.hostname.includes('.local');
        
        if (isDevelopment || hasSessionCheck || hasRedirectParam) {
          return;
        }

        // Mark as checked to prevent multiple attempts
        sessionStorage.setItem(sessionKey, 'true');
        
        // Get user's country with multiple fallbacks
        let userCountry = null;
        
        // Try primary service with timeout
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 2000);
          
          const response = await fetch('https://ipapi.co/json/', {
            signal: controller.signal
          });
          clearTimeout(timeoutId);
          
          if (response.ok) {
            const data = await response.json();
            userCountry = data.country_code;
          }
        } catch (error) {
          console.log('Primary country detection failed, trying fallback...');
        }
        
        // Fallback service if primary fails
        if (!userCountry) {
          try {
            const fallbackResponse = await fetch('https://ip-api.com/json/?fields=countryCode', {
              signal: AbortSignal.timeout(2000)
            });
            if (fallbackResponse.ok) {
              const fallbackData = await fallbackResponse.json();
              userCountry = fallbackData.countryCode;
            }
          } catch (error) {
            console.log('Fallback country detection also failed');
          }
        }
        
        // If we couldn't detect country, don't redirect
        if (!userCountry) {
          console.log('Could not detect country, staying on current domain');
          return;
        }
        
        const currentDomain = window.location.hostname;
        const currentPath = window.location.pathname;
        const currentSearch = window.location.search;
        const currentHash = window.location.hash;
        
        // Add redirected parameter to prevent loops
        const separator = currentSearch ? '&' : '?';
        const newSearch = currentSearch + separator + 'redirected=true';
        const fullPath = currentPath + newSearch + currentHash;
        
        // Redirect logic
        if (userCountry === 'CA' && currentDomain === 'brandgoto.com') {
          // Canadian user on .com -> redirect to .ca
          console.log(`🇨🇦 Redirecting Canadian user to brandgoto.ca`);
          window.location.href = `https://brandgoto.ca${fullPath}`;
          
        } else if (userCountry !== 'CA' && currentDomain === 'brandgoto.ca') {
          // Non-Canadian user on .ca -> redirect to .com
          console.log(`🌍 Redirecting ${userCountry} user to brandgoto.com`);
          window.location.href = `https://brandgoto.com${fullPath}`;
          
        } else {
          console.log(`✅ User from ${userCountry} is on correct domain (${currentDomain})`);
        }
        
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.log('Country redirect failed:', errorMessage);
        // Fail silently to avoid breaking the site
      }
    };

    // Run after a small delay to ensure page is ready
    const timer = setTimeout(handleCountryRedirect, 800);
    
    return () => clearTimeout(timer);
  }, []);

  return null;
};

export default CountryRedirect;