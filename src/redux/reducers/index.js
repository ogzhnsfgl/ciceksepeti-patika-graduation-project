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
  acceptOffer: acceptOfferReducer,
  auth: authReducer,
  brand: brandReducer,
  cancelOffer: cancelOfferReducer,
  category: categoryReducer,
  createProduct: createProductReducer,
  color: colorReducer,
  givenOffers: givenOffersReducer,
  offer: offerReducer,
  products: productsReducer,
  purchase: purchaseReducer,
  productDetail: productDetailReducer,
  receivedOffers: receivedOffersReducer,
  rejectOffer: rejectOfferReducer,
  status: statusReducer,
  upload: uploadReducer,
});
