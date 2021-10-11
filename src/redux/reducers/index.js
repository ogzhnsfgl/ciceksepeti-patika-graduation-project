import { combineReducers } from 'redux';

import authReducer from './authReducer';
import categoryReducer from './categoryReducer';
import productDetailReducer from './productDetailReducer';
import productsReducer from './productsReducer';

export default combineReducers({
  auth: authReducer,
  category: categoryReducer,
  products: productsReducer,
  productDetail: productDetailReducer,
});
