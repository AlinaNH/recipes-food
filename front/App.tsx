import * as React from 'react';
import './App.css';
import { AnimatePresence } from 'framer-motion';
import { Route, Switch, RouteComponentProps } from 'react-router-dom';
import { Header } from './Header/Header';
import { Authentication } from './Header/Authentication/Authentication';
import { HomePage } from './HomePage/HomePage';
import { Footer } from './Footer/Footer';
import { ResultsPage } from './ResultsPage/ResultsPage';

export const App: React.FunctionComponent = () =>{
  return (
    <div className="app-container">
      <Header />
      <Switch>
        <Route
          exact
          path="/signin"
          render={(props: RouteComponentProps) => (
            <Authentication {...props} operation="Sign In" />
          )}
        />
        <Route
          exact
          path="/signup"
          render={(props: RouteComponentProps) => (
            <Authentication {...props} operation="Sign Up" />
          )}
        />
      </Switch>
      <div className="body-container">
        <AnimatePresence exitBeforeEnter>
          <Switch>
            <Route exact path="/(|signin|signup)" component={HomePage} />
            <Route path="/searchResults" component={ResultsPage} />
          </Switch>
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
};
