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
const NotFound404 = lazy(() => import('components/NotFound404/'));

/* Created paths array */
const protectedRouterPaths = [
  {
    path: '/signup',
    name: 'registerSignup',
    component: LoginRegister,
    exact: false,
    props: {},
  },
  {
    path: '/signin',
    name: 'registerSignin',
    component: LoginRegister,
    exact: false,
    props: {},
  },
  {
    path: '/account',
    name: 'account',
    component: Account,
    exact: false,
    props: {},
  },
  {
    path: '/addproduct',
    name: 'addProduct',
    component: AddProduct,
    exact: false,
    props: {},
  },
];

const definedRoutes = [
  '/addproduct',
  '/account',
  '/signin',
  '/signup',
  '/home',
  '/productdetail/:id',
  '/404',
  '/',
];

/* Created routes constant to manage all routes */
const Routes = (
  <Router>
    <Switch>
      <Suspense fallback={<LoadingContainer />}>
        <Route path="/" exact component={Home} />
        <Route path="/productdetail/:id" exact component={ProductDetail} />
        {protectedRouterPaths.map(({ path, name, component, props }) => (
          <ProtectedRoute
            key={name}
            path={path}
            component={component}
            props={props}
          />
        ))}
        {/* <Route component={NotFound404} /> */}
        <Route
          path="*"
          children={({ match }) => {
            const condition = definedRoutes.includes(match.url);
            if (match.url.split('/').includes('productdetail')) {
              if (match.url.split('/')[2].length < 2) {
                return <NotFound404 />;
              }
              return null;
            }
            return !condition && <NotFound404 />;
          }}
        />
      </Suspense>
    </Switch>
  </Router>
);

export default Routes;
