import statusTypes from 'redux/constants/statusTypes';

const initialState = {
  statusList: null,
  isPending: false,
  error: false,
};

const statusReducer = (state = initialState, action) => {
  switch (action.type) {
    case statusTypes.FETCH_STATUS_PENDING:
      return { ...state, isPending: true, statusList: null, error: false };
    case statusTypes.FETCH_STATUS_SUCCESS:
      return {
        ...state,
        isPending: false,
        statusList: action.payload,
        error: false,
      };
    case statusTypes.FETCH_STATUS_FAILURE:
      return {
        ...state,
        isPending: false,
        statusList: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default statusReducer;
