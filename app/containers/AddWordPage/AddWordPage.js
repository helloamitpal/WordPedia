import React from 'react';
import { Helmet } from 'react-helmet';
import './AddWordPage.scss';

const FeaturePage = () => (
  <div className="add-word-page">
    <Helmet>
      <title>Add/Edit</title>
      <meta
        name="description"
        content="Add/Edit page"
      />
    </Helmet>
    <h1>Features</h1>
  </div>
);

export default FeaturePage;
