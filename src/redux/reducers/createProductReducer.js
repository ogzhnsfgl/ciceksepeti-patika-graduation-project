import createProductTypes from 'redux/constants/createProductTypes';

const initialState = {
  product: null,
  isPending: false,
  error: false,
};

const createProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case createProductTypes.POST_CREATE_PRODUCT_PENDING:
      return { ...state, isPending: true, product: null, error: false };
    case createProductTypes.POST_CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        isPending: false,
        product: action.payload,
        error: false,
      };
    case createProductTypes.POST_CREATE_PRODUCT_FAILURE:
      return {
        ...state,
        isPending: false,
        product: null,
        error: action.payload,
      };
    case createProductTypes.POST_CREATE_PRODUCT_RESET:
      return initialState;
    default:
      return state;
  }
};

export default createProductReducer;
