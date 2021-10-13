import rejectOfferTypes from 'redux/constants/rejectOfferTypes';

const initialState = {
  rejectOffer: null,
  isPending: true,
  error: null,
};

const rejectOfferReducer = (state = initialState, action) => {
  switch (action.type) {
    case rejectOfferTypes.POST_REJECT_OFFER_PENDING:
      return { ...state, isPending: true, rejectOffer: null, error: false };
    case rejectOfferTypes.POST_REJECT_OFFER_SUCCESS:
      return {
        ...state,
        isPending: false,
        rejectOffer: action.payload,
        error: false,
      };
    case rejectOfferTypes.POST_REJECT_OFFER_FAILURE:
      return {
        ...state,
        isPending: false,
        rejectOffer: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default rejectOfferReducer;
