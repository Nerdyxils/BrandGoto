import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  path: string;
}

const pathMap: Record<string, string> = {
  '/launchpad': '14-Day Launchpad',
  '/engineering': 'Fractional CTO & Engineering Retainer',
  '/about-us': 'About Us',
  '/how-we-help': 'How We Help',
  '/things-we-built': 'Case Studies',
  '/success-stories': 'Success Stories',
  '/book-consultation': 'Strategic GTM Audit',
  '/privacy-policy': 'Privacy Policy',
};

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  
  const breadcrumbs = React.useMemo<BreadcrumbItem[]>(() => {
    const items: BreadcrumbItem[] = [{ label: 'Home', path: '/' }];
    const currentPath = pathMap[location.pathname];
    if (currentPath) items.push({ label: currentPath, path: location.pathname });
    return items;
  }, [location.pathname]);

  // Structured data for breadcrumbs
  const breadcrumbStructuredData = React.useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': crumb.label,
      'item': `https://www.brandgoto.com${crumb.path}`,
    })),
  }), [breadcrumbs]);

  React.useEffect(() => {
    if (location.pathname === '/') return;
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
  }, [location.pathname, breadcrumbStructuredData]);

  if (location.pathname === '/') return null;

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
