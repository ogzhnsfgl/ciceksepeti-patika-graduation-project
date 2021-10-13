import { combineReducers } from 'redux';

import acceptOfferReducer from './acceptOfferReducer';
import authReducer from './authReducer';
import brandReducer from './brandReducer';
import cancelOfferReducer from './cancelOfferReducer';
import categoryReducer from './categoryReducer';
import colorReducer from './colorReducer';
import givenOffersReducer from './givenOffersReducer';
import productDetailReducer from './productDetailReducer';
import productsReducer from './productsReducer';
import purchaseReducer from './purchaseReducer';
import receivedOffersReducer from './receivedOffersReducer';
import rejectOfferReducer from './rejectOfferReducer';
import statusReducer from './statusReducer';

export default combineReducers({
  auth: authReducer,
  category: categoryReducer,
  products: productsReducer,
  productDetail: productDetailReducer,
  acceptOffer: acceptOfferReducer,
  brand: brandReducer,
  cancelOffer: cancelOfferReducer,
  color: colorReducer,
  givenOffers: givenOffersReducer,
  receivedOffers: receivedOffersReducer,
  rejectOffer: rejectOfferReducer,
  status: statusReducer,
  purchase: purchaseReducer,
});
