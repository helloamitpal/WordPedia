import React from 'react';
import { Helmet } from 'react-helmet';
import './SettingsPage.scss';

const FeaturePage = () => (
  <div className="settings-page">
    <Helmet>
      <title>Settings</title>
      <meta
        name="description"
        content="Settings page"
      />
    </Helmet>
    <h1>Features</h1>
  </div>
);

export default FeaturePage;
