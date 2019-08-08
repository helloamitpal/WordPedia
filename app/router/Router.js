import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

import config from '../config';
import HomePage from '../containers/HomePage/Loadable';
import AddWordPage from '../containers/AddWordPage/Loadable';
import SettingsPage from '../containers/SettingsPage/Loadable';
import NotFoundPage from '../containers/NotFoundPage/Loadable';

import './Router.scss';

const Router = ({ history }) => {
  history.listen(() => {
    // closing all toasters if opened on route chnages
    toast.dismiss();
  });

  return (
    <div className="app-wrapper">
      <Switch>
        <Route exact path={config.HOME_PAGE} render={(props) => <HomePage {...props} />} />
        <Route path={config.ADD_WORD_PAGE} render={(props) => <AddWordPage {...props} />} />
        <Route path={config.SETTINGS_PAGE} render={(props) => <SettingsPage {...props} />} />
        <Route path="" component={NotFoundPage} />
      </Switch>
    </div>
  );
};

export default withRouter(Router);
