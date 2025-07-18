import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  schema?: object;
  image?: string;
}

export default function SEOHead({ title, description, keywords, canonical, schema, image }: SEOHeadProps) {
  const fullTitle = title.includes('IRS Mileage Calculator') ? title : `${title} | IRS Mileage Calculator 2025`;
  const siteUrl = 'https://irs2025mileagecalculator.com';
  const currentUrl = canonical || `${siteUrl}${window.location.pathname}`;
  const defaultImage = `${siteUrl}/og-image.jpg`;
  const ogImage = image || defaultImage;
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={currentUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="IRS Mileage Calculator 2025" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      
      {/* Schema.org structured data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
      
      {/* Page-specific structured data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": fullTitle,
          "description": description,
          "url": currentUrl,
          "isPartOf": {
            "@type": "WebSite",
            "name": "IRS Mileage Calculator 2025",
            "url": siteUrl
          }
        })}
      </script>
    </Helmet>
  );
}