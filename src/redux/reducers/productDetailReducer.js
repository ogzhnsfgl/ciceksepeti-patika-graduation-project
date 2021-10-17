import productDetailTypes from 'redux/constants/productDetailTypes';

const initialState = {
  product: null,
  isPending: true,
  error: null,
};

const productDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case productDetailTypes.FETCH_PRODUCT_DETAIL_PENDING:
      return { ...state, isPending: true, product: null, error: false };
    case productDetailTypes.FETCH_PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        isPending: false,
        product: action.payload,
        error: false,
      };
    case productDetailTypes.FETCH_PRODUCT_DETAIL_FAILURE:
      return {
        ...state,
        isPending: false,
        product: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default productDetailReducer;