import productDetailTypes from 'redux/constants/productDetailTypes';
import request from 'service/request';

const fetchProductDetailSuccess = (product) => ({
  type: productDetailTypes.FETCH_PRODUCT_DETAIL_SUCCESS,
  payload: product,
});

const fetchProductDetailPending = () => ({
  type: productDetailTypes.FETCH_PRODUCT_DETAIL_PENDING,
});
const fetchProductDetailFailure = (error) => ({
  type: productDetailTypes.FETCH_PRODUCT_DETAIL_FAILURE,
  payload: error,
});
export const fetchProductDetailReset = () => ({
  type: productDetailTypes.FETCH_PRODUCT_DETAIL_RESET,
});

const fetchProductDetail = (id) => async (dispatch) => {
  dispatch(fetchProductDetailPending());

  return request
    .get(`/product/${id}`)
    .then((res) => dispatch(fetchProductDetailSuccess(res.data)))
    .catch((err) => dispatch(fetchProductDetailFailure(err)));
};

export default fetchProductDetail;
