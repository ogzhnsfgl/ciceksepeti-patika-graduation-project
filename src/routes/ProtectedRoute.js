import PropTypes from 'prop-types';
import { Redirect, Route, withRouter } from 'react-router-dom';

/* Control route is protected or not */
const unprotectedRouteConditions = ['/login', '/register', '/'];
// TODO: Refoctor condition
const isUnProtectedRoute = (path) => unprotectedRouteConditions.includes(path);

const ProtectedRoute = ({ component: Component, ...rest }) => {
  /* Check the route is protected or not? */
  if (isUnProtectedRoute(rest.path)) {
    return (
      <Route
        {...rest}
        render={(props) =>
          /* If user already logged in go Home */
          localStorage.getItem('user') ? (
            <Redirect to={{ pathname: '/', state: { from: rest.location } }} />
          ) : (
            /* Else go Login or Register */
            <Component {...props} />
          )
        }
      />
    );
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem('user') ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: rest.location } }} />
        )
      }
    />
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

export default withRouter(ProtectedRoute);
