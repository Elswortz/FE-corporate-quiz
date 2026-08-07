import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

type ConfirmModalProps = {
  isOpen: boolean;
  title: string;
  description: string;
  confirmText: string;
  confirmColor?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
};

const ConfirmModal = ({
  isOpen,
  title,
  description,
  confirmText,
  confirmColor,
  onConfirm,
  onCancel,
  isLoading,
}: ConfirmModalProps) => {
  const { t } = useTranslation('companiesDetails');
  return (
    <Dialog open={isOpen} onClose={onCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>{description}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>{t('modals.cancel')}</Button>
        <Button color={confirmColor} onClick={onConfirm} loading={isLoading}>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmModal;
