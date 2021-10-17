import './home.scss';

import banner from 'assets/images/home-banner.webp';
import CategoryTabs from 'components/CategoryTabs/CategoryTabs';
import LoadingContainer from 'components/LoadingContainer/LoadingContainer';
import Navbar from 'components/Navbar';
import ProductCard from 'components/ProductCard/ProductCard';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import fetchCategory from 'redux/actions/categoryAction';
import fetchProducts from 'redux/actions/productsAction';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
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

  if (isPendingProducts || isPendingCategory) {
    return <LoadingContainer />;
  }

  let filteredProducts = [...products];

  if (
    query.get('category') !== null &&
    query.get('category').trim() !== 'hepsi' &&
    !isPendingProducts &&
    products
  ) {
    filteredProducts = products.filter(
      (product) =>
        product.category.title.trim() === query.get('category').trim()
    );
  }
  if (
    (query.get('category') === 'hepsi' || query.get('category') === null) &&
    !isPendingProducts &&
    products
  ) {
    filteredProducts = products;
  }
  return (
    <>
      <Navbar />
      {(errorProducts || errorCategory) && (
        <div>Error:{errorProducts.message || errorCategory.message}</div>
      )}
      <main className="section">
        <div className="container">
          <div className="section-banner">
            <img src={banner} alt="home-banner" />
          </div>
          <CategoryTabs />
          <div className="products-container">
            {filteredProducts.map((product) => (
              <Link to={`/productdetail/${product.id}`} key={product.id}>
                <ProductCard product={product} />
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
