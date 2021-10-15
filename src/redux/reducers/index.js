import { combineReducers } from 'redux';

import acceptOfferReducer from './acceptOfferReducer';
import authReducer from './authReducer';
import brandReducer from './brandReducer';
import cancelOfferReducer from './cancelOfferReducer';
import categoryReducer from './categoryReducer';
import colorReducer from './colorReducer';
import createProductReducer from './createProductReducer';
import givenOffersReducer from './givenOffersReducer';
import offerReducer from './offerReducer';
import productDetailReducer from './productDetailReducer';
import productsReducer from './productsReducer';
import purchaseReducer from './purchaseReducer';
import receivedOffersReducer from './receivedOffersReducer';
import rejectOfferReducer from './rejectOfferReducer';
import statusReducer from './statusReducer';
import uploadReducer from './uploadReducer';

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
  offer: offerReducer,
  upload: uploadReducer,
  createProduct: createProductReducer,
});
