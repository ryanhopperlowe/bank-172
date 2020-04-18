import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import DashboardPage from '../pages/dashboard/DashboardPage';
import AppContext from '../context/AppContext';
import Header from '../common/Header';
import LoginPage from '../pages/login/LoginPage';
import SignupPage from '../pages/signup/SignupPage';
import OpenAccount from '../pages/user-accounts/OpenAccount';

const AppRouter = () => {

  const { app } = useContext(AppContext);

  return (
    <BrowserRouter basename="/">
      <div>
        <Header />
        {!!app.isReady && (
          <Switch>
            <Route exact path="/" component={DashboardPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={SignupPage} />
            <Route path="/open" component={OpenAccount} />
            <Route path="/*" component={DashboardPage} />
          </Switch>
        )}
      </div>
    </BrowserRouter>
  )
};

export default AppRouter;