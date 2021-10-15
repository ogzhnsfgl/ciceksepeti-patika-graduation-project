import brandTypes from 'redux/constants/brandTypes';
import request from 'service/request';

const fetchBrandSuccess = (brand) => ({
  type: brandTypes.FETCH_BRAND_SUCCESS,
  payload: brand,
});
const fetchBrandFailure = (error) => ({
  type: brandTypes.FETCH_BRAND_FAILURE,
  payload: error,
});
const fetchBrandPending = () => ({
  type: brandTypes.FETCH_BRAND_PENDING,
});

const fetchBrand =
  (id = 'all') =>
  async (dispatch) => {
    dispatch(fetchBrandPending());
    return request
      .get(`/detail/brand/${id}`)
      .then((res) => {
        dispatch(fetchBrandSuccess(res.data));
      })
      .catch((err) => dispatch(fetchBrandFailure(err)));
  };

export default fetchBrand;
