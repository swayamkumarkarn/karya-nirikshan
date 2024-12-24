import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const MetaTagsHelmet = ({ meta = {} }) => {
  const location = useLocation();

  // Default values in case some meta properties are missing
  const defaultMeta = {
    title: "Default Title",
    description: "Default description",
    keywords: "default, keywords",
    author: "Default Author",
    og: {},
    canonical: ""
  };

  // Merge provided meta with default values
  const metaData = { ...defaultMeta, ...meta };

  return (
    <Helmet>
      {/* Set the document title */}
      <title>{metaData.title}</title>

      {/* Meta description */}
      <meta name="description" content={metaData.description} />

      {/* Meta keywords */}
      <meta name="keywords" content={metaData.keywords} />

      {/* Meta author */}
      <meta name="author" content={metaData.author} />

      {/* Open Graph meta tags for better social sharing */}
      {metaData.og && Object.entries(metaData.og).map(([property, content]) => (
        <meta key={property} property={`og:${property}`} content={content} />
      ))}

      {/* Canonical URL for duplicate content handling */}
      {metaData.canonical && <link rel="canonical" href={metaData.canonical} />}
    </Helmet>
  );
};

export default MetaTagsHelmet;
