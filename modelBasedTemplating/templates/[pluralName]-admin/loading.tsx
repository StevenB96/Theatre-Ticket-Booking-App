// templates/loadingPageTemplate.js

const loadingPageTemplate = `// src/app/admin/<%= pluralName %>/loading.tsx

import React from 'react';

export default function Loading() {
  return (
    <p>Loading <%= pluralName %>...</p>
  );
}
`;

module.exports = loadingPageTemplate;
