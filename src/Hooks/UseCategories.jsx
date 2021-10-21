import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchCategory from 'redux/actions/categoryAction';

const UseCategories = () => {
  const categoryState = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    let mounted = false;
    if (!mounted && !categoryState.categoryList) {
      dispatch(fetchCategory());
    }
    return () => {
      mounted = true;
    };
  }, [categoryState.categoryList, dispatch]);

  return categoryState;
};

export default UseCategories;
