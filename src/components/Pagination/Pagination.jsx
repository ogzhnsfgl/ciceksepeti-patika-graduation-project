import './Pagination.scss';

import { DOTS, usePagination } from 'Hooks/UsePagination';
import useQuery from 'Hooks/UseQuery';
import propTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { v4 } from 'uuid';

const Pagination = (props) => {
  const { onPageChange, totalCount, currentPage, pageSize } = props;
  const query = useQuery();
  const currentCat = query.get('category') || 'hepsi';
  const history = useHistory();

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const lastPage = paginationRange[paginationRange.length - 1];

  const handleNext = () => {
    history.push(
      `/?category=${currentCat}&pages=${
        currentPage !== lastPage ? currentPage + 1 : currentPage
      } `
    );
  };
  const handlePrev = () => {
    history.push(
      `/?category=${currentCat}&pages=${
        currentPage !== 1 ? currentPage - 1 : currentPage
      } `
    );
  };

  const handleClick = (page) => {
    onPageChange(page);
    history.push(`/?category=${currentCat}&pages=${page}`);
  };

  return (
    <div className="pagination-wrapper">
      <div className="pagination-container">
        <div
          className="pagination-arrow"
          role="none"
          onClick={handlePrev}
          key={v4()}
        >
          <div
            className={`arrow left ${
              currentPage === 1 ? 'arrow-disabled' : ' '
            }`}
          />
        </div>
        {paginationRange.map((pageNumber) => {
          if (pageNumber === DOTS) {
            return (
              <li className="pagination-item dots " key={v4()} role="none">
                &#8230;
              </li>
            );
          }

          return (
            <div
              className={`pagination-item pagination-number ${
                pageNumber === currentPage ? 'selected-page ' : ''
              }`}
              onClick={() => handleClick(pageNumber)}
              role="none"
              key={v4()}
            >
              <span role="none">{pageNumber}</span>
            </div>
          );
        })}
        <div
          className="pagination-arrow "
          role="none"
          onClick={handleNext}
          key={v4()}
        >
          <div
            className={`arrow right ${
              currentPage === lastPage ? 'arrow-disabled' : ''
            }`}
          />
        </div>
      </div>
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
