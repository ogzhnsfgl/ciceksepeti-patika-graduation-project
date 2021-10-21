import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchReceivedOffers from 'redux/actions/receivedOffersAction';

const UseReceivedOffers = () => {
  const receivedOffersState = useSelector((state) => state.receivedOffers);
  const dispatch = useDispatch();

  useEffect(() => {
    let mounted = false;
    if (!mounted) {
      dispatch(fetchReceivedOffers());
    }

    return () => {
      mounted = true;
    };
  }, [dispatch]);

  return receivedOffersState;
};

export default UseReceivedOffers;
