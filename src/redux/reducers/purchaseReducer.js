import purchaseTypes from 'redux/constants/purchaseTypes';

const initialState = {
  purchase: null,
  isPending: true,
  error: null,
};

const purchaseReducer = (state = initialState, action) => {
  switch (action.type) {
    case purchaseTypes.PUT_PURCHASE_PENDING:
      return { ...state, isPending: true, purchase: null, error: false };
    case purchaseTypes.PUT_PURCHASE_SUCCESS:
      return {
        ...state,
        isPending: false,
        purchase: action.payload,
        error: false,
      };
    case purchaseTypes.PUT_PURCHASE_FAILURE:
      return {
        ...state,
        isPending: false,
        purchase: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default purchaseReducer;
