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

/* Created paths array */
const routerPaths = [
  {
    path: '/signup',
    name: 'register',
    component: LoginRegister,
    exact: false,
    props: {},
  },
  {
    path: '/signin',
    name: 'register',
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

/* Created routes constant to manage all routes */
const Routes = (
  <Router>
    <Switch>
      <Suspense fallback={<LoadingContainer />}>
        <Route path="/" component={Home} exact />
        <Route path="/productdetail/:id" component={ProductDetail} />
        {routerPaths.map(({ path, name, component, props }) => (
          <ProtectedRoute
            key={name}
            exact
            path={path}
            component={component}
            props={props}
          />
        ))}
      </Suspense>
    </Switch>
  </Router>
);

export default Routes;
