import { useMemo } from 'react';

export const DOTS = '...';

const range = (start, end) =>
  Array.from({ length: end - start + 1 }, (v, i) => start + i);

export function usePagination({ totalCount, pageSize, currentPage }) {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);

    /* Total count of items will show at pagination bar */
    const paginationItemsCount = 6;

    /*
    If the number of pages is less than the pagination items count we just show [1..totalPageCount]
    */
    if (paginationItemsCount >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const shouldShowLeftDots = currentPage > 3;
    const shouldShowRightDots = currentPage < totalPageCount - 1;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftRange = range(1, 5);
      return [...leftRange, DOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightRange = range(totalPageCount - 5 + 1, totalPageCount);
      return [1, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(currentPage - 1, currentPage + 1);
      return [1, DOTS, ...middleRange, DOTS, totalPageCount];
    }
    return null;
  }, [totalCount, pageSize, currentPage]);

  return paginationRange;
}
