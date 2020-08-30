/* eslint-disable import/first */

import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Loading from './loading';
import PageNotFound from './pageNotFound';
import ErrorBoundary from './errorBoundary';
import Layout from '../features/layout/auth';

const Account = lazy(() => import(/* webpackChunkName: 'Account' */ '../features/account/containers'));

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
                  <Account {...matchProps} />
                </Layout>
              )}
            />

            <Route render={(matchProps) => <PageNotFound {...matchProps} />} />
          </Switch>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
};
