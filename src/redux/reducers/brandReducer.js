import brandTypes from 'redux/constants/brandTypes';

const initialState = {
  brandList: null,
  isPending: false,
  error: false,
};

const brandReducer = (state = initialState, action) => {
  switch (action.type) {
    case brandTypes.FETCH_BRAND_PENDING:
      return { ...state, isPending: true, brandList: null, error: false };
    case brandTypes.FETCH_BRAND_SUCCESS:
      return {
        ...state,
        isPending: false,
        brandList: action.payload,
        error: false,
      };
    case brandTypes.FETCH_BRAND_FAILURE:
      return {
        ...state,
        isPending: false,
        brandList: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default brandReducer;
