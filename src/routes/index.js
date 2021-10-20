/* eslint-disable react/no-children-prop */
import LoadingContainer from 'components/LoadingContainer/LoadingContainer';
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';

/* Required pages are imported with lazy */
const Home = lazy(() => import('pages/Home'));
const LoginRegister = lazy(() => import('pages/LoginRegister'));
const Account = lazy(() => import('pages/Account'));
const ProductDetail = lazy(() => import('pages/ProductDetail'));
const AddProduct = lazy(() => import('pages/AddProduct/'));
const NotFound404 = lazy(() => import('pages/NotFound404/'));

/* Created paths array */
const protectedRouterPaths = [
  {
    path: '/signup',
    name: 'registerSignup',
    component: LoginRegister,
    exact: false,
  },
  {
    path: '/signin',
    name: 'registerSignin',
    component: LoginRegister,
    exact: false,
  },
  {
    path: '/account',
    name: 'account',
    component: Account,
    exact: false,
  },
  {
    path: '/addproduct',
    name: 'addProduct',
    component: AddProduct,
    exact: false,
  },
];

/* Created routes constant to manage all routes */
const Routes = (
  <Router>
    <Suspense fallback={<LoadingContainer />}>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/productdetail/:id" exact>
          <ProductDetail />
        </Route>
        {protectedRouterPaths.map(({ path, name, component }) => (
          <ProtectedRoute key={name} path={path} component={component} />
        ))}
        <Route path="*">
          <NotFound404 />
        </Route>
      </Switch>
    </Suspense>
  </Router>
);

export default Routes;
