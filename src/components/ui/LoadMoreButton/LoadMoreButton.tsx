import { Button, Stack } from '@mui/material';

type LoadMoreButtonProps = {
  hasMore: boolean | undefined;
  isLoading: boolean;
  onClick: () => void;
};

const LoadMoreButton = ({ hasMore, isLoading, onClick }: LoadMoreButtonProps) => {
  if (!hasMore) return null;

  return (
    <Stack alignItems="center" mt={2}>
      <Button variant="contained" onClick={onClick} loading={isLoading}>
        Show more
      </Button>
    </Stack>
  );
};

export default LoadMoreButton;
