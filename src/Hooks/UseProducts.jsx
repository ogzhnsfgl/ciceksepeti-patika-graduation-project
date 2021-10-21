import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchProducts, {
  fetchProductsReset,
} from 'redux/actions/productsAction';

const UseProducts = () => {
  const productsState = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    let mounted = false;
    if (!mounted && !productsState.products) {
      dispatch(fetchProducts());
    }
    return () => {
      mounted = true;
    };
  }, [dispatch, productsState.products]);

  useEffect(
    () => () => {
      dispatch(fetchProductsReset());
    },
    [dispatch]
  );
  return productsState;
};

export default UseProducts;
