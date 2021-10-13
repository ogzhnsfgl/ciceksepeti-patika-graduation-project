import brandTypes from 'redux/constants/brandTypes';
import request from 'service/request';

const fetchStatusSuccess = (brand) => ({
  type: brandTypes.FETCH_BRAND_SUCCESS,
  payload: brand,
});
const fetchStatusFailure = (error) => ({
  type: brandTypes.FETCH_BRAND_FAILURE,
  payload: error,
});
const fetchStatusPending = () => ({
  type: brandTypes.FETCH_BRAND_PENDING,
});

const fetchBrand =
  (id = 'all') =>
  async (dispatch) => {
    dispatch(fetchStatusPending());
    return request
      .get(`/detail/brand/${id}`)
      .then((res) => {
        dispatch(fetchStatusSuccess(res.data));
      })
      .catch((err) => dispatch(fetchStatusFailure(err)));
  };

export default fetchBrand;
