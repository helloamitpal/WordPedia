import React from 'react';
import { Helmet } from 'react-helmet';
import './style.scss';

const FeaturePage = () => (
  <div className="feature-page">
    <Helmet>
      <title>Feature Page</title>
      <meta
        name="description"
        content="Feature page of React.js Boilerplate application"
      />
    </Helmet>
    <h1>Features</h1>
  </div>
);

export default FeaturePage;
