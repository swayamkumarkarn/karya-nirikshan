import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const MetaTags = ({ meta }) => {
  const location = useLocation();

  useEffect(() => {
    if (meta) {
      document.title = meta.title || 'Default Title';
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', meta.description || 'Default description');
      } else {
        const newMetaDescription = document.createElement('meta');
        newMetaDescription.setAttribute('name', 'description');
        newMetaDescription.setAttribute('content', meta.description || 'Default description');
        document.head.appendChild(newMetaDescription);
      }
    }
  }, [location, meta]);

  return null;
};

export default MetaTags;
