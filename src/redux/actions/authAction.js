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
  dispatch(fetchAuthPending());
  return request
    .post(`/authorization/${signType}`, user)
    .then((res) => dispatch(fetchAuthSuccess(res)))
    .catch((err) => dispatch(fetchAuthFailure(err)));
};

export default fetchAuth;
