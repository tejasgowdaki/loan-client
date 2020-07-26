/* eslint-disable import/first */

import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Loading from './loading';
import PageNotFound from './pageNotFound';
import ErrorBoundary from './errorBoundary';
import Layout from '../features/layout';

const Stats = lazy(() => import(/* webpackChunkName: 'Home' */ '../features/stats'));

const Members = lazy(() => import(/* webpackChunkName: 'Members' */ '../features/members/containers'));
const MemberShow = lazy(() => import(/* webpackChunkName: 'Members' */ '../features/members/containers/show.js'));

export const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route
              path="/"
              exact
              render={matchProps => (
                <Layout {...matchProps}>
                  <Members {...matchProps} />
                </Layout>
              )}
            />

            <Route
              path="/members/:memberId"
              exact
              render={matchProps => (
                <Layout {...matchProps}>
                  <MemberShow {...matchProps} />
                </Layout>
              )}
            />

            <Route
              path="/stats"
              exact
              render={matchProps => (
                <Layout {...matchProps}>
                  <Stats {...matchProps} />
                </Layout>
              )}
            />

            <Route render={matchProps => <PageNotFound {...matchProps} />} />
          </Switch>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
};
