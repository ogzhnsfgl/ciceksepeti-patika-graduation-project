import checkAuth from 'helpers/checkAuth';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchGivenOffers, {
  fetchGivenOffersReset,
} from 'redux/actions/givenOffersActions';

const UseGivenOffers = (isProductDetail) => {
  const productDetailState = useSelector((state) => state.productDetail);
  const givenOffersState = useSelector((state) => state.givenOffers);
  const dispatch = useDispatch();

  const { product } = productDetailState;

  useEffect(() => {
    let mounted = false;
    if (!mounted && !isProductDetail) {
      dispatch(fetchGivenOffers());
    }
    return () => {
      mounted = true;
    };
  }, [dispatch, isProductDetail]);

  useEffect(() => {
    let mounted = false;

    const conditions =
      !mounted &&
      isProductDetail &&
      !product?.isSold &&
      product?.isOfferable &&
      checkAuth();

    if (conditions) {
      dispatch(fetchGivenOffers());
    }
    return () => {
      mounted = true;
    };
  }, [dispatch, isProductDetail, product?.isOfferable, product?.isSold]);

  useEffect(
    () => () => {
      dispatch(fetchGivenOffersReset());
    },
    [dispatch]
  );

  return givenOffersState;
};

export default UseGivenOffers;
