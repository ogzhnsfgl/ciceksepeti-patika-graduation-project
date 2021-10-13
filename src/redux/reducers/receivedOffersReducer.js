import receivedOffersTypes from 'redux/constants/receivedOffersTypes';

const initialState = {
  receivedOffers: null,
  isPending: true,
  error: null,
};

const receivedOffersReducer = (state = initialState, action) => {
  switch (action.type) {
    case receivedOffersTypes.FETCH_RECEIVED_OFFERS_PENDING:
      return { ...state, isPending: true, receivedOffers: null, error: false };
    case receivedOffersTypes.FETCH_RECEIVED_OFFERS_SUCCESS:
      return {
        ...state,
        isPending: false,
        receivedOffers: action.payload,
        error: false,
      };
    case receivedOffersTypes.FETCH_RECEIVED_OFFERS_FAILURE:
      return {
        ...state,
        isPending: false,
        receivedOffers: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default receivedOffersReducer;
