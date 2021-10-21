import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchBrand from 'redux/actions/brandActions';

const UseBrands = () => {
  const brandState = useSelector((state) => state.brand);

  const dispatch = useDispatch();

  useEffect(() => {
    let mounted = false;
    if (!mounted) {
      dispatch(fetchBrand());
    }
    return () => {
      mounted = true;
    };
  }, [dispatch]);

  return brandState;
};

export default UseBrands;
