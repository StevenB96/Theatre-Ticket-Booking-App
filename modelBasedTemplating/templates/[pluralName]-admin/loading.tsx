const loadingPageTemplate = `// src/app/admin/<%= pluralName %>/loading.tsx
import React from 'react';

export default function <%= PluralName %> Loading(): JSX.Element {
  return <p>Loading <%= pluralName %>…</p>;
};`

module.exports = loadingPageTemplate;
