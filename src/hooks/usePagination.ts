import { getOffsetFromPage } from '@/utils/paginationHelpers';
import { useState } from 'react';

interface UsePaginationProps {
  initialPage?: number;
  limit?: number;
}

export const usePagination = ({ initialPage = 1, limit = 8 }: UsePaginationProps) => {
  const [page, setPage] = useState(initialPage);

  const offset = getOffsetFromPage(page, limit);

  return {
    page,
    limit,
    offset,
    setPage,
  };
};
