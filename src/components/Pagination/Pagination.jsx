/* eslint-disable react/prop-types */
import './Pagination.scss';

import { DOTS, usePagination } from 'Hooks/UsePagination';
import React from 'react';

const Pagination = (props) => {
  const { onPageChange, totalCount, currentPage, pageSize } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const lastPage = paginationRange[paginationRange.length - 1];

  const onNext = () => {
    if (currentPage !== lastPage) {
      onPageChange(currentPage + 1);
    }
  };

  const onPrevious = () => {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <div className="pagination-wrapper">
      <ul className="pagination-container">
        <li className="pagination-item" onClick={onPrevious} role="none">
          <div
            className={`arrow left ${
              currentPage === 1 ? 'arrow-disabled' : ' '
            }`}
          />
        </li>
        {paginationRange.map((pageNumber) => {
          if (pageNumber === DOTS) {
            return <li className="pagination-item dots ">&#8230;</li>;
          }

          return (
            <li
              className={`pagination-item pagination-number ${
                pageNumber === currentPage ? 'selected-page ' : ''
              }`}
              onClick={() => onPageChange(pageNumber)}
              role="none"
            >
              {pageNumber}
            </li>
          );
        })}

        <li className="pagination-item " onClick={onNext} role="none">
          <div
            className={`arrow right ${
              currentPage === lastPage ? 'arrow-disabled' : ''
            }`}
          />
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
