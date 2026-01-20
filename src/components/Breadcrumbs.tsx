import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  path: string;
}

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  
  // Don't show breadcrumbs on homepage
  if (location.pathname === '/') {
    return null;
  }

  const pathMap: Record<string, string> = {
    '/launchpad': '14-Day GTM Launchpad',
    '/engineering': 'Fractional CTO & Engineering',
    '/about-us': 'About Us',
    '/how-we-help': 'How We Help',
    '/things-we-built': 'Case Studies',
    '/success-stories': 'Success Stories',
    '/book-consultation': 'Book Consultation',
    '/privacy-policy': 'Privacy Policy',
  };

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', path: '/' },
  ];

  const currentPath = pathMap[location.pathname];
  if (currentPath) {
    breadcrumbs.push({ label: currentPath, path: location.pathname });
  }

  // Structured data for breadcrumbs
  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': crumb.label,
      'item': `https://www.brandgoto.com${crumb.path}`,
    })),
  };

  React.useEffect(() => {
    // Inject breadcrumb structured data
    const existingScript = document.querySelector('script[type="application/ld+json"][data-breadcrumbs="true"]');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-breadcrumbs', 'true');
    script.textContent = JSON.stringify(breadcrumbStructuredData);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.querySelector('script[type="application/ld+json"][data-breadcrumbs="true"]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [location.pathname]);

  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs-container">
      <ol className="breadcrumbs-list" itemScope itemType="https://schema.org/BreadcrumbList">
        {breadcrumbs.map((crumb, index) => (
          <li
            key={crumb.path}
            className="breadcrumb-item"
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            {index === breadcrumbs.length - 1 ? (
              <span itemProp="name" className="breadcrumb-current">
                {crumb.label}
              </span>
            ) : (
              <Link to={crumb.path} itemProp="item" className="breadcrumb-link">
                <span itemProp="name">{crumb.label}</span>
              </Link>
            )}
            <meta itemProp="position" content={String(index + 1)} />
            {index < breadcrumbs.length - 1 && (
              <span className="breadcrumb-separator" aria-hidden="true">
                /
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
