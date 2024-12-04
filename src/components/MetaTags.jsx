import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const MetaTags = ({ meta = {} }) => {
  const location = useLocation();

  useEffect(() => {
    if (!meta) return;

    // Update the document title
    document.title = meta.title || "Default Title";

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (meta.description) {
      if (metaDescription) {
        metaDescription.setAttribute('content', meta.description);
      } else {
        const newMetaDescription = document.createElement('meta');
        newMetaDescription.setAttribute('name', 'description');
        newMetaDescription.setAttribute('content', meta.description);
        document.head.appendChild(newMetaDescription);
      }
    }

    // Update other meta tags (keywords, author, etc.)
    if (meta.keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', meta.keywords);
      } else {
        const newMetaKeywords = document.createElement('meta');
        newMetaKeywords.setAttribute('name', 'keywords');
        newMetaKeywords.setAttribute('content', meta.keywords);
        document.head.appendChild(newMetaKeywords);
      }
    }

    if (meta.author) {
      let metaAuthor = document.querySelector('meta[name="author"]');
      if (metaAuthor) {
        metaAuthor.setAttribute('content', meta.author);
      } else {
        const newMetaAuthor = document.createElement('meta');
        newMetaAuthor.setAttribute('name', 'author');
        newMetaAuthor.setAttribute('content', meta.author);
        document.head.appendChild(newMetaAuthor);
      }
    }

    // Open Graph meta tags for better social sharing
    if (meta.og) {
      Object.entries(meta.og).forEach(([property, content]) => {
        const ogTag = document.querySelector(`meta[property="og:${property}"]`);
        if (ogTag) {
          ogTag.setAttribute('content', content);
        } else {
          const newOgTag = document.createElement('meta');
          newOgTag.setAttribute('property', `og:${property}`);
          newOgTag.setAttribute('content', content);
          document.head.appendChild(newOgTag);
        }
      });
    }

    // Canonical URL for duplicate content handling
    if (meta.canonical) {
      let linkCanonical = document.querySelector('link[rel="canonical"]');
      if (linkCanonical) {
        linkCanonical.setAttribute('href', meta.canonical);
      } else {
        const newLinkCanonical = document.createElement('link');
        newLinkCanonical.setAttribute('rel', 'canonical');
        newLinkCanonical.setAttribute('href', meta.canonical);
        document.head.appendChild(newLinkCanonical);
      }
    }
  }, [location, meta]);

  return null;
};

export default MetaTags;
