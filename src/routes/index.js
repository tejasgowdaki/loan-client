/* eslint-disable import/first */

import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Loading from './loading';
import PageNotFound from './pageNotFound';
import ErrorBoundary from './errorBoundary';
import Layout from '../features/layout';

const Members = lazy(() => import(/* webpackChunkName: 'Members' */ '../features/members/containers'));

const MemberShow = lazy(() => import(/* webpackChunkName: 'MemberShow' */ '../features/members/containers/show'));

const Loans = lazy(() => import(/* webpackChunkName: 'Loans' */ '../features/loans/containers'));

const Stats = lazy(() => import(/* webpackChunkName: 'Home' */ '../features/stats'));

export const Routes = (props) => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route
              path="/"
              exact
              render={(matchProps) => (
                <Layout {...props} {...matchProps}>
                  <Members {...matchProps} />
                </Layout>
              )}
            />

            <Route
              path="/members"
              exact
              render={(matchProps) => (
                <Layout {...props} {...matchProps}>
                  <Members {...matchProps} />
                </Layout>
              )}
            />

            <Route
              path="/members/:memberId"
              exact
              render={(matchProps) => (
                <Layout {...props} {...matchProps}>
                  <MemberShow {...matchProps} />
                </Layout>
              )}
            />

            <Route
              path="/loans"
              exact
              render={(matchProps) => (
                <Layout {...props} {...matchProps}>
                  <Loans {...matchProps} />
                </Layout>
              )}
            />

            <Route
              path="/stats"
              exact
              render={(matchProps) => (
                <Layout {...props} {...matchProps}>
                  <Stats {...matchProps} />
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
