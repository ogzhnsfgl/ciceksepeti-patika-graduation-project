import givenOffersTypes from 'redux/constants/givenOffersTypes';
import authRequest from 'service/authRequest';

const fetchGivenOffersPending = () => ({
  type: givenOffersTypes.FETCH_GIVEN_OFFERS_PENDING,
});
const fetchGivenOffersSuccess = (givenOffers) => ({
  type: givenOffersTypes.FETCH_GIVEN_OFFERS_SUCCESS,
  payload: givenOffers,
});

const fetchGivenOffersFailure = (error) => ({
  type: givenOffersTypes.FETCH_GIVEN_OFFERS_FAILURE,
  payload: error,
});

const fetchGivenOffers = () => async (dispatch) => {
  dispatch(fetchGivenOffersPending());
  authRequest()
    .get('/account/given-offers')
    .then((res) => dispatch(fetchGivenOffersSuccess(res.data)))
    .catch((err) => dispatch(fetchGivenOffersFailure(err)));
};

export default fetchGivenOffers;
