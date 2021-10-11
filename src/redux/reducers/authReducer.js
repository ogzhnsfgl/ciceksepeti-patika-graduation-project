import authTypes from 'redux/constants/authTypes';

const initialState = {
  user: null,
  isPending: false,
  error: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authTypes.FETCH_AUTH_PENDING:
      return { ...state, isPending: true, user: null, error: false };
    case authTypes.FETCH_AUTH_SUCCESS:
      return { ...state, isPending: false, user: action.payload, error: false };
    case authTypes.FETCH_AUTH_FAILURE:
      return { ...state, isPending: false, user: null, error: action.payload };
    default:
      return state;
  }
};

export default authReducer;
