import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

import config from '../config';
import LoadingIndicator from '../components/LoadingIndicator';

import './Router.scss';

const Router = ({ history }) => {
  history.listen(() => {
    // closing all toasters if opened on route chnages
    toast.dismiss();
  });

  const HomeModule = (React.lazy(() => (import('../containers/HomePage/Loadable'))));
  const SettingsModule = (React.lazy(() => (import('../containers/SettingsPage/Loadable'))));
  const NotFoundModule = (React.lazy(() => (import('../containers/NotFoundPage/Loadable'))));

  return (
    <Suspense fallback={<LoadingIndicator />}>
      <Switch>
        <Route exact path={config.HOME_PAGE} render={(props) => <HomeModule {...props} />} />
        <Route path={config.SETTINGS_PAGE} render={(props) => <SettingsModule {...props} />} />
        <Route path="" render={(props) => <NotFoundModule {...props} />} />
      </Switch>
    </Suspense>
  );
};

Router.propTypes = {
  history: PropTypes.object
};

export default withRouter(Router);
