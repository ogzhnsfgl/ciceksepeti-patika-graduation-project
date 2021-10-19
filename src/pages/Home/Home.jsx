import './home.scss';

import banner from 'assets/images/home-banner.webp';
import CategoryTabs from 'components/CategoryTabs/CategoryTabs';
import Error from 'components/Error/Error';
import LoadingContainer from 'components/LoadingContainer/LoadingContainer';
import Navbar from 'components/Navbar';
import ProductsContainer from 'components/ProductsContainer';
import filterProducts from 'helpers/filterProducts';
import useQuery from 'Hooks/UseQuery';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchCategory from 'redux/actions/categoryAction';
import fetchProducts from 'redux/actions/productsAction';

const Home = () => {
  const query = useQuery();
  const productsState = useSelector((state) => state.products);
  const categoryState = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const {
    products,
    isPending: isPendingProducts,
    error: errorProducts,
  } = productsState;

  const { isPending: isPendingCategory, error: errorCategory } = categoryState;

  useEffect(() => {
    let mounted = false;
    if (!mounted) {
      dispatch(fetchProducts());
      dispatch(fetchCategory());
    }
    return () => {
      mounted = true;
    };
  }, [dispatch]);

  if (errorProducts || errorCategory) {
    return <Error errorMsg={errorProducts.message || errorCategory.message} />;
  }
  if (isPendingProducts || isPendingCategory) {
    return <LoadingContainer />;
  }

  const filteredProducts = filterProducts(
    products,
    query.get('category'),
    isPendingProducts
  );
  return (
    <>
      <Navbar />
      <main className="section">
        <div className="container">
          <div className="section-banner">
            <img src={banner} alt="home-banner" />
          </div>
          <CategoryTabs />
          <ProductsContainer data={filteredProducts} />
        </div>
      </main>
    </>
  );
};

export default Home;
