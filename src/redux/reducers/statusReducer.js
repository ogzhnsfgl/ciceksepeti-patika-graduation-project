import statusTypes from 'redux/constants/statusTypes';

const initialState = {
  status: null,
  isPending: false,
  error: false,
};

const statusReducer = (state = initialState, action) => {
  switch (action.type) {
    case statusTypes.FETCH_AUTH_PENDING:
      return { ...state, isPending: true, status: null, error: false };
    case statusTypes.FETCH_AUTH_SUCCESS:
      return {
        ...state,
        isPending: false,
        status: action.payload,
        error: false,
      };
    case statusTypes.FETCH_AUTH_FAILURE:
      return {
        ...state,
        isPending: false,
        status: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default statusReducer;
