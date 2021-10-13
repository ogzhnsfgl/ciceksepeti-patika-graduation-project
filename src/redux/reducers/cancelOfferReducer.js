import cancelOfferTypes from 'redux/constants/cancelOfferTypes';

const initialState = {
  cancelMessage: null,
  isPending: true,
  error: null,
};

const cancelOfferReducer = (state = initialState, action) => {
  switch (action.type) {
    case cancelOfferTypes.DELETE_CANCEL_OFFER_PENDING:
      return { ...state, isPending: true, cancelMessage: null, error: false };
    case cancelOfferTypes.DELETE_CANCEL_OFFER_SUCCESS:
      return {
        ...state,
        isPending: false,
        cancelMessage: action.payload,
        error: false,
      };
    case cancelOfferTypes.DELETE_CANCEL_OFFER_FAILURE:
      return {
        ...state,
        isPending: false,
        cancelMessage: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default cancelOfferReducer;
