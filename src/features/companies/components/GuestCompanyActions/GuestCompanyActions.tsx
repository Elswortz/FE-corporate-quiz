import { Button } from '@mui/material';

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
  if (hasPendingRequest) {
    return (
      <Button onClick={onCancelRequest} size="small" variant="outlined" color="warning" loading={cancelRequestLoading}>
        Cancel request
      </Button>
    );
  }

  return (
    <Button onClick={onRequest} size="small" variant="contained" loading={sendRequestLoading}>
      Request to join
    </Button>
  );
};

export default GuestCompanyActions;
