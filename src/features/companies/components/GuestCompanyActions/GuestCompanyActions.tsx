import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

type Props = {
  hasPendingRequest: boolean;
  sendRequestLoading: boolean;
  cancelRequestLoading: boolean;

  onRequest: () => Promise<void>;
  onCancelRequest: () => Promise<void>;
};

const GuestCompanyActions = ({
  hasPendingRequest,
  sendRequestLoading,
  cancelRequestLoading,
  onRequest,
  onCancelRequest,
}: Props) => {
  const { t } = useTranslation('companiesDetails');

  if (hasPendingRequest) {
    return (
      <Button onClick={onCancelRequest} size="small" variant="outlined" color="warning" loading={cancelRequestLoading}>
        {t('buttons.cancelRequest')}
      </Button>
    );
  }

  return (
    <Button onClick={onRequest} size="small" variant="contained" loading={sendRequestLoading}>
      {t('buttons.request')}
    </Button>
  );
};

export default GuestCompanyActions;
