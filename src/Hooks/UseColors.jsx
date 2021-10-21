import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchcolor from 'redux/actions/colorActions';

const UseColors = () => {
  const colorState = useSelector((state) => state.color);
  const dispatch = useDispatch();

  useEffect(() => {
    let mounted = false;
    if (!mounted) {
      dispatch(fetchcolor());
    }
    return () => {
      mounted = true;
    };
  }, [dispatch]);

  return colorState;
};

export default UseColors;
