/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */
import './productsContainer.scss';

import Pagination from 'components/Pagination/Pagination';
import ProductCard from 'components/ProductCard/ProductCard';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PageSize = 10;

const ProductsContainer = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  const firstPageIndex = (currentPage - 1) * PageSize;
  console.log(`firstPageIndex`, firstPageIndex);
  const lastPageIndex = firstPageIndex + PageSize;
  const currentData = data.slice(firstPageIndex, lastPageIndex);
  console.log(`data`, data);
  console.log(`currentData`, currentData);

  return (
    <>
      <div className="products-container">
        {currentData?.map((product) => (
          <Link to={`/productdetail/${product.id}`} key={product.id}>
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalCount={data.length}
        pageSize={PageSize}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default ProductsContainer;
