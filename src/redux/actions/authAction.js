import authTypes from 'redux/constants/authTypes';
import request from 'service/request';

const fetchAuthSuccess = (user) => ({
  type: authTypes.FETCH_AUTH_SUCCESS,
  payload: user,
});
const fetchAuthFailure = (error) => ({
  type: authTypes.FETCH_AUTH_FAILURE,
  payload: error,
});
const fetchAuthPending = () => ({
  type: authTypes.FETCH_AUTH_PENDING,
});

const fetchAuth = (user, signType) => async (dispatch) => {
  // eslint-disable-next-line no-debugger
  debugger;
  dispatch(fetchAuthPending());
  return request
    .post(`/authorization/${signType}`, user)
    .then((res) => {
      console.log('res.data :>> ', res.data);
      if (res.data.status === 409) {
        dispatch(fetchAuthFailure(res.data));
      } else {
        dispatch(fetchAuthSuccess(res.data));
        localStorage.setItem('isAuthenticated', res.data.access_token);
        localStorage.setItem('email', user.email);
      }
    })
    .catch((err) => dispatch(fetchAuthFailure(err)));
};

export default fetchAuth;
