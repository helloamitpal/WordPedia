import React from 'react';
import { Helmet } from 'react-helmet';
import './BookmarksPage.scss';

const FeaturePage = () => (
  <div className="bookmarks-page">
    <Helmet>
      <title>Bookmarks</title>
      <meta
        name="description"
        content="Bookmarks page"
      />
    </Helmet>
    <h1>Features</h1>
  </div>
);

export default FeaturePage;
