import { useState } from 'react';

interface UsePaginationProps {
  limit?: number;
}

export const usePagination = ({ limit = 8 }: UsePaginationProps) => {
  const [offset, setOffset] = useState(0);

  const loadMore = () => {
    setOffset(prev => prev + limit);
  };

  const resetPagination = () => {
    setOffset(0);
  };

  return {
    limit,
    offset,
    loadMore,
    resetPagination,
  };
};
