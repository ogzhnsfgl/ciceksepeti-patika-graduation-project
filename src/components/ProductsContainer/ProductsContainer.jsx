import './productsContainer.scss';

import Pagination from 'components/Pagination/Pagination';
import ProductCard from 'components/ProductCard/ProductCard';
import propTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PageSize = 10;

const ProductsContainer = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  const firstPageIndex = (currentPage - 1) * PageSize;
  const lastPageIndex = firstPageIndex + PageSize;
  const currentData = data.slice(firstPageIndex, lastPageIndex);

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

ProductsContainer.propTypes = {
  data: propTypes.array.isRequired,
};

export default ProductsContainer;
