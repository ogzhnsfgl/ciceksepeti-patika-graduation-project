import productsTypes from 'redux/constants/productsTypes';

const initialState = {
  products: null,
  isPending: false,
  error: false,
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case productsTypes.FETCH_PRODUCTS_PENDINGT:
      return { ...state, isPending: true, products: null, error: false };
    case productsTypes.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        isPending: false,
        products: action.payload,
        error: false,
      };
    case productsTypes.FETCH_PRODUCTS_faılure:
      return {
        ...state,
        isPending: false,
        products: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default productsReducer;
