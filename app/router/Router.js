import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from '../containers/HomePage/Loadable';
import AddWordPage from '../containers/AddWordPage/Loadable';
import SettingsPage from '../containers/SettingsPage/Loadable';
import NotFoundPage from '../containers/NotFoundPage/Loadable';

import './Router.scss';

const Router = () => (
  <div className="app-wrapper">
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/addWord" component={AddWordPage} />
      <Route path="/settings" component={SettingsPage} />
      <Route path="" component={NotFoundPage} />
    </Switch>
  </div>
);

export default Router;
