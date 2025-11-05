import { Pagination as MuiPagination, Stack } from '@mui/material';

const Pagination = ({ page, total, limit, onPageChange }) => {
  const totalPages = Math.ceil(total / limit) || 1;

  const handleChange = (_, value) => {
    onPageChange(value);
  };

  return (
    <Stack alignItems="center" mt={2}>
      <MuiPagination
        count={totalPages}
        page={page}
        onChange={handleChange}
        color="primary"
        size="medium"
      />
    </Stack>
  );
};

export default Pagination;
