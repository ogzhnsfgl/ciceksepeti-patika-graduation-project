import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchStatus from 'redux/actions/statusActions';

const UseStatus = () => {
  const statusState = useSelector((state) => state.status);

  const dispatch = useDispatch();

  useEffect(() => {
    let mounted = false;
    if (!mounted) {
      dispatch(fetchStatus());
    }
    return () => {
      mounted = true;
    };
  }, [dispatch]);

  return statusState;
};

export default UseStatus;
