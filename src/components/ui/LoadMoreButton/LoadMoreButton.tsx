import { Button, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';

type LoadMoreButtonProps = {
  hasMore: boolean | undefined;
  isLoading: boolean;
  onClick: () => void;
};

const LoadMoreButton = ({ hasMore, isLoading, onClick }: LoadMoreButtonProps) => {
  if (!hasMore) return null;
  const { t } = useTranslation('users');

  return (
    <Stack alignItems="center" mt={2}>
      <Button variant="contained" onClick={onClick} loading={isLoading}>
        {t('showMoreButtonText')}
      </Button>
    </Stack>
  );
};

export default LoadMoreButton;
