import productsTypes from 'redux/constants/productsTypes';
import request from 'service/request';

const fetchProductsSuccess = (products) => ({
  type: productsTypes.FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

const fetchProductsPending = () => ({
  type: productsTypes.FETCH_PRODUCTS_PENDING,
});
const fetchProductsFailure = (error) => ({
  type: productsTypes.FETCH_PRODUCTS_FAILURE,
  payload: error,
});

const fetchProducts = () => async (dispatch) => {
  dispatch(fetchProductsPending());

  return request
    .get('/product/all')
    .then((res) => dispatch(fetchProductsSuccess(res.data)))
    .catch((err) => dispatch(fetchProductsFailure(err)));
};

export default fetchProducts;
