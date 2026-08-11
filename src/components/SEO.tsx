import { useEffect } from 'react';
import type { JsonValue, SEOEntry } from '../seo/seoConfig';

const DEFAULT_SITE_URL = 'https://www.brandgoto.com';

const setMeta = (selector: string, attr: 'name' | 'property', key: string, content: string) => {
  if (!content) return;
  let element = document.querySelector(selector) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

const setLink = (rel: string, href: string) => {
  if (!href) return;
  let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', rel);
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
};

const injectStructuredData = (data: Record<string, JsonValue>) => {
  // Remove existing structured data script if present
  const existingScript = document.querySelector('script[type="application/ld+json"][data-seo="true"]');
  if (existingScript) {
    existingScript.remove();
  }

  // Create new structured data script
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-seo', 'true');
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
};

const SEO: React.FC<SEOEntry> = ({ title, description, path, keywords, ogType, structuredData }) => {
  useEffect(() => {
    const origin = typeof window !== 'undefined' ? window.location.origin : DEFAULT_SITE_URL;
    const canonical = `${origin}${path}`;

    document.title = title;
    setMeta('meta[name="description"]', 'name', 'description', description);
    if (keywords) {
      setMeta('meta[name="keywords"]', 'name', 'keywords', keywords);
    }
    setLink('canonical', canonical);

    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', canonical);
    setMeta('meta[property="og:type"]', 'property', 'og:type', ogType || 'website');

    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);

    // Inject structured data if provided
    if (structuredData) {
      injectStructuredData(structuredData);
    }
  }, [title, description, path, keywords, ogType, structuredData]);

  return null;
};

export default SEO;
