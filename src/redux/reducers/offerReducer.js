import offerTypes from 'redux/constants/offerTypes';

const initialState = {
  offer: null,
  isPending: true,
  error: null,
};

const offerReducer = (state = initialState, action) => {
  switch (action.type) {
    case offerTypes.POST_OFFER_PENDING:
      return { ...state, isPending: true, offer: null, error: false };
    case offerTypes.POST_OFFER_SUCCESS:
      return {
        ...state,
        isPending: false,
        offer: action.payload,
        error: false,
      };
    case offerTypes.POST_OFFER_FAILURE:
      return {
        ...state,
        isPending: false,
        offer: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default offerReducer;
