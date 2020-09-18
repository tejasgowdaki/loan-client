/* eslint-disable import/first */

import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Loading from './loading';
import ErrorBoundary from './errorBoundary';
import Layout from '../features/layout/auth';

const LandingPage = lazy(() => import(/* webpackChunkName: 'LandingPage' */ '../features/auth/containers'));

export const AuthRoutes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route
              path="/"
              exact
              render={(matchProps) => (
                <Layout {...matchProps}>
                  <LandingPage {...matchProps} />
                </Layout>
              )}
            />

            <Redirect to="/" />
          </Switch>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
};
