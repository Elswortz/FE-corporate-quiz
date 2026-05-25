import { getPageFromOffset, getTotalPages } from '@/utils/paginationHelpers';
import { Pagination, Stack } from '@mui/material';

type AppPaginationProps = {
  total: number;
  limit: number;
  offset: number;
  onChange: (page: number) => void;
};

const AppPagination = ({ total, limit, offset, onChange }: AppPaginationProps) => {
  const page = getPageFromOffset(offset, limit);
  const totalPages = getTotalPages(total, limit);

  if (totalPages <= 1) return null;

  return (
    <Stack alignItems="center" mt={4}>
      <Pagination page={page} count={totalPages} color="primary" onChange={(_, page) => onChange(page)} />
    </Stack>
  );
};

export default AppPagination;
