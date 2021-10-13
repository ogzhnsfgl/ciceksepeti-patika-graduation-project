import colorTypes from 'redux/constants/colorTypes';

const initialState = {
  color: null,
  isPending: false,
  error: false,
};

const colorReducer = (state = initialState, action) => {
  switch (action.type) {
    case colorTypes.FETCH_COLOR_PENDING:
      return { ...state, isPending: true, color: null, error: false };
    case colorTypes.FETCH_COLOR_SUCCESS:
      return {
        ...state,
        isPending: false,
        color: action.payload,
        error: false,
      };
    case colorTypes.FETCH_COLOR_FAILURE:
      return {
        ...state,
        isPending: false,
        color: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default colorReducer;
