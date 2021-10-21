import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchProductDetail, {
  fetchProductDetailReset,
} from 'redux/actions/productDetailAction';

const UseProductDetail = (id) => {
  const productDetailState = useSelector((state) => state.productDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    let mounted = false;
    if (!mounted) {
      dispatch(fetchProductDetail(id));
    }
    return () => {
      dispatch(fetchProductDetailReset());
      mounted = true;
    };
  }, [dispatch, id]);

  return productDetailState;
};

export default UseProductDetail;
