import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from '../containers/HomePage/Loadable';
import FeaturePage from '../containers/FeaturePage/Loadable';
import NotFoundPage from '../containers/NotFoundPage/Loadable';

import './Router.scss';

const Router = () => (
  <div className="app-wrapper">
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/features" component={FeaturePage} />
      <Route path="" component={NotFoundPage} />
    </Switch>
  </div>
);

export default Router;
