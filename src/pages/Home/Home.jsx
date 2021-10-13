import './home.scss';

import banner from 'assets/images/home-banner.png';
import Navbar from 'components/Navbar';
import ProductCard from 'components/ProductCard/ProductCard';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import fetchCategory from 'redux/actions/categoryAction';
import fetchProducts from 'redux/actions/productsAction';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const query = useQuery();

  const [selectedCategory, setselectedCategory] = useState(
    query.get('category')
  );

  const productsStore = useSelector((state) => state.products);
  const categoryStore = useSelector((state) => state.category);

  const {
    products,
    isPending: isPendingProducts,
    error: errorProducts,
  } = productsStore;

  const {
    categoryList,
    isPending: isPendingCategory,
    error: errorCategory,
  } = categoryStore;

  const dispatch = useDispatch();

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

  console.log(`products`, products);
  let filteredProducts = products;

  if (
    query.get('category') !== null &&
    query.get('category') !== 'hepsi' &&
    !isPendingProducts &&
    products
  ) {
    filteredProducts = products.filter(
      (product) => product.category.title.trim() === selectedCategory.trim()
    );
  }
  if (query.get('category') === 'hepsi' && !isPendingProducts && products) {
    filteredProducts = products;
  }

  return (
    <>
      <Navbar />
      {(isPendingProducts || isPendingCategory) && <div>Loading</div>}
      {(errorProducts || errorCategory) && (
        <div>Error:{errorProducts.message}</div>
      )}
      {categoryList && products && (
        <main className="section">
          <div className="container">
            <div className="section-banner">
              <img src={banner} alt="home-banner" />
            </div>
            <div className="category-container">
              <ul className="category-list">
                <Link
                  to="?category=hepsi"
                  onClick={() => setselectedCategory('hepsi')}
                >
                  <li
                    className={
                      selectedCategory === 'hepsi' || selectedCategory === null
                        ? 'category-list-item item-active'
                        : 'category-list-item'
                    }
                  >
                    Hepsi
                  </li>
                </Link>
                {categoryList.map((category) => (
                  <Link
                    to={`?category=${category.title} `}
                    key={category.id}
                    onClick={() => setselectedCategory(category.title)}
                  >
                    <li
                      className={
                        selectedCategory?.trim() === category.title.trim()
                          ? 'category-list-item item-active'
                          : 'category-list-item'
                      }
                    >
                      {category.title}
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
            <div className="products-container">
              {filteredProducts.map((product) => (
                <Link to={`/productdetail/${product.id}`}>
                  <ProductCard product={product} key={product.id} />
                </Link>
              ))}
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default Home;
