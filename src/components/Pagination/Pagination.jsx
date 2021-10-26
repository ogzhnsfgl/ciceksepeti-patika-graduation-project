import './Pagination.scss';

import { DOTS, usePagination } from 'Hooks/UsePagination';
import useQuery from 'Hooks/UseQuery';
import propTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { v4 } from 'uuid';

const Pagination = (props) => {
  const { onPageChange, totalCount, currentPage, pageSize } = props;
  const query = useQuery();
  const currentCat = query.get('category') || 'hepsi';

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <div className="pagination-wrapper">
      <ul className="pagination-container">
        <Link
          to={`?category=${currentCat}&pages=${
            currentPage !== 1 ? currentPage - 1 : currentPage
          } `}
          key={v4()}
        >
          <li className="pagination-arrow" role="none">
            <div
              className={`arrow left ${
                currentPage === 1 ? 'arrow-disabled' : ' '
              }`}
            />
          </li>
        </Link>
        {paginationRange.map((pageNumber) => {
          if (pageNumber === DOTS) {
            return (
              <li className="pagination-item dots " key={v4()}>
                &#8230;
              </li>
            );
          }

          return (
            <Link
              to={`?category=${currentCat}&pages=${pageNumber} `}
              key={v4()}
            >
              <li
                className={`pagination-item pagination-number ${
                  pageNumber === currentPage ? 'selected-page ' : ''
                }`}
                onClick={() => onPageChange(pageNumber)}
                role="none"
              >
                {pageNumber}
              </li>
            </Link>
          );
        })}
        <Link
          to={`?category=${currentCat}&pages=${
            currentPage !== lastPage ? currentPage + 1 : currentPage
          } `}
          key={v4()}
        >
          <li className="pagination-arrow " role="none">
            <div
              className={`arrow right ${
                currentPage === lastPage ? 'arrow-disabled' : ''
              }`}
            />
          </li>
        </Link>
      </ul>
    </div>
  );
};

Pagination.propTypes = {
  totalCount: propTypes.number.isRequired,
  currentPage: propTypes.number.isRequired,
  pageSize: propTypes.number.isRequired,
  onPageChange: propTypes.func.isRequired,
};

export default Pagination;
