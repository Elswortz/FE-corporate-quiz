import { Pagination as MuiPagination, Stack } from '@mui/material';
import { ChangeEvent } from 'react';

type PaginationProps = {
  page: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ page, total, limit, onPageChange }: PaginationProps) => {
  const totalPages = Math.ceil(total / limit) || 1;

  const handleChange = (_: ChangeEvent<unknown>, value: number) => {
    onPageChange(value);
  };

  return (
    <Stack alignItems="center" mt={2}>
      <MuiPagination count={totalPages} page={page} onChange={handleChange} color="primary" size="medium" />
    </Stack>
  );
};

export default Pagination;
