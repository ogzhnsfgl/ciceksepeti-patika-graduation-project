import './productsContainer.scss';

import Pagination from 'components/Pagination/Pagination';
import ProductCard from 'components/ProductCard/ProductCard';
import useQuery from 'Hooks/UseQuery';
import propTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Item count per page
const PageSize = 15;

const ProductsContainer = ({ data }) => {
  const query = useQuery();

  const [currentPage, setCurrentPage] = useState(
    parseInt(query.get('pages'), 10) || 1
  );

  useEffect(() => {
    const lastPage = Math.ceil(data.length / PageSize);
    let queryPage = parseInt(query.get('pages'), 10);

    /* Check upper bound of pagination, if request higher than page count set last page */
    if (queryPage > lastPage) {
      query.set('pages', lastPage);
      queryPage = lastPage;
    }

    setCurrentPage(queryPage || 1);
  }, [data, query]);

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
