import categoryTypes from 'redux/constants/categoryTypes';

const initialState = {
  categoryList: null,
  isPending: false,
  error: false,
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case categoryTypes.FETCH_CATEGORY_PENDING:
      return { ...state, isPending: true, categoryList: null, error: false };
    case categoryTypes.FETCH_CATEGORY_SUCCESS:
      return {
        ...state,
        isPending: false,
        categoryList: action.payload,
        error: false,
      };
    case categoryTypes.FETCH_CATEGORY_FAILURE:
      return {
        ...state,
        isPending: false,
        categoryList: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default categoryReducer;
