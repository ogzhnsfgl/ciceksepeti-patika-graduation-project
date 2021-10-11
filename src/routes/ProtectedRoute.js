import PropTypes from 'prop-types';
import { Redirect, Route, withRouter } from 'react-router-dom';

// TODO: Refactor condition

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');

  if (rest.path === '/login' || rest.path === '/register') {
    return (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? (
            <Redirect to={{ pathname: '/', state: { from: rest.location } }} />
          ) : (
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
        !isAuthenticated ? (
          <Redirect to={{ pathname: '/', state: { from: rest.location } }} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

export default withRouter(ProtectedRoute);
