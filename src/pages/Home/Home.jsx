import './home.scss';

import banner from 'assets/images/home-banner.webp';
import CategoryTabs from 'components/CategoryTabs/CategoryTabs';
import ErrorWrapper from 'components/Error/';
import LoadingContainer from 'components/LoadingContainer/LoadingContainer';
import Navbar from 'components/Navbar';
import ProductsContainer from 'components/ProductsContainer';
import filterProducts from 'helpers/filterProducts';
import UseCategories from 'Hooks/UseCategories';
import UseProducts from 'Hooks/UseProducts';
import useQuery from 'Hooks/UseQuery';
import useTitle from 'Hooks/UseTitle';
import React from 'react';

const Home = () => {
  const query = useQuery();
  const productsState = UseProducts();
  const categoryState = UseCategories();
  useTitle('Anasayfa');

  const {
    products,
    isPending: isPendingProducts,
    error: errorProducts,
  } = productsState;

  const { isPending: isPendingCategory, error: errorCategory } = categoryState;

  if (errorProducts || errorCategory) {
    return (
      <ErrorWrapper errorMsg={errorProducts.message || errorCategory.message} />
    );
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
