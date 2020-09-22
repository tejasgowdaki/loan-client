/* eslint-disable import/first */

import React, { lazy, Suspense, useContext } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Loading from './loading';
import PageNotFound from './pageNotFound';
import ErrorBoundary from './errorBoundary';
import Layout from '../features/layout';

import { AccountTypeContext } from '../context';
const Members = lazy(() => import(/* webpackChunkName: 'Members' */ '../features/members/containers'));

const MemberShow = lazy(() => import(/* webpackChunkName: 'MemberShow' */ '../features/members/containers/show'));

const Transactions = lazy(() => import(/* webpackChunkName: 'Transactions' */ '../features/transaction/containers'));

const Stats = lazy(() => import(/* webpackChunkName: 'Stats' */ '../features/stats/containers'));

const Utilities = lazy(() => import(/* webpackChunkName: 'Utilities' */ '../features/utilities/containers'));

const Accounts = lazy(() => import(/* webpackChunkName: 'Accounts' */ '../features/account/containers'));

const Chits = lazy(() => import(/* webpackChunkName: 'Chits' */ '../features/chit/containers'));

export const Routes = (props) => {
  const isAccountTypeLoan = useContext(AccountTypeContext);
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

            {isAccountTypeLoan ? (
              <Route
                path="/active-loans"
                exact
                render={(matchProps) => (
                  <Layout {...props} {...matchProps}>
                    <Members {...matchProps} isActiveLoans />
                  </Layout>
                )}
              />
            ) : null}

            {isAccountTypeLoan ? (
              <Route
                path="/transactions"
                exact
                render={(matchProps) => (
                  <Layout {...props} {...matchProps}>
                    <Transactions {...matchProps} />
                  </Layout>
                )}
              />
            ) : null}

            {!isAccountTypeLoan ? (
              <Route
                path="/chits"
                exact
                render={(matchProps) => (
                  <Layout {...props} {...matchProps}>
                    <Chits {...matchProps} />
                  </Layout>
                )}
              />
            ) : null}

            {isAccountTypeLoan ? (
              <Route
                path="/stats"
                exact
                render={(matchProps) => (
                  <Layout {...props} {...matchProps}>
                    <Stats {...matchProps} />
                  </Layout>
                )}
              />
            ) : null}

            <Route
              path="/utilities"
              exact
              render={(matchProps) => (
                <Layout {...props} {...matchProps}>
                  <Utilities {...matchProps} />
                </Layout>
              )}
            />

            <Route
              path="/accounts"
              exact
              render={(matchProps) => (
                <Layout {...props} {...matchProps}>
                  <Accounts {...matchProps} />
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
