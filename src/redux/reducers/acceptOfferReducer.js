import acceptOfferTypes from 'redux/constants/acceptOfferTypes';

const initialState = {
  acceptMessage: null,
  isPending: true,
  error: null,
};

const acceptOfferReducer = (state = initialState, action) => {
  switch (action.type) {
    case acceptOfferTypes.PUT_ACCEPT_OFFER_PENDING:
      return { ...state, isPending: true, acceptMessage: null, error: false };
    case acceptOfferTypes.PUT_ACCEPT_OFFER_SUCCESS:
      return {
        ...state,
        isPending: false,
        acceptMessage: action.payload,
        error: false,
      };
    case acceptOfferTypes.PUT_ACCEPT_OFFER_FAILURE:
      return {
        ...state,
        isPending: false,
        acceptMessage: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default acceptOfferReducer;
