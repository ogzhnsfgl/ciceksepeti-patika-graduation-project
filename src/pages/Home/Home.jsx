import './home.scss';

import banner from 'assets/images/home-banner.png';
import Navbar from 'components/Navbar';
import ProductCard from 'components/ProductCard/ProductCard';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const query = useQuery();
  console.log('query :>> ', query.get('category'));

  return (
    <>
      <Navbar />
      <main className="section">
        <div className="container">
          <div className="section-banner">
            <img src={banner} alt="home-banner" />
          </div>
          <div className="category-container">
            <ul className="category-list">
              <Link to="?category=1">
                <li className="category-list-item item-active">Hepsi</li>
              </Link>
              <Link to="?category=2">
                <li className="category-list-item">Pantolon</li>
              </Link>
              <Link to="?category=3">
                <li className="category-list-item">Gömlek</li>
              </Link>
              <Link to="?category=4">
                <li className="category-list-item">Gömlek</li>
              </Link>
              <li className="category-list-item">Şort</li>
              <li className="category-list-item">Sweatshirt</li>
              <li className="category-list-item">Pantolon</li>
              <li className="category-list-item">Gömlek</li>
              <li className="category-list-item">Tişört</li>
              <li className="category-list-item">Şort</li>
              <li className="category-list-item">Sweatshirt</li>
              <li className="category-list-item">Pantolon</li>
              <li className="category-list-item item-active">Gömlek</li>
              <li className="category-list-item">Tişört</li>
              <li className="category-list-item">Şort</li>
              <li className="category-list-item">Sweatshirt</li>
            </ul>
          </div>
          <div className="products-container">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
