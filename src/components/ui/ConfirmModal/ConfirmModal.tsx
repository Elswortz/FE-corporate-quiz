import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button } from '@mui/material';

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
  return (
    <Dialog open={isOpen} onClose={onCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>{description}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button color={confirmColor} onClick={onConfirm} loading={isLoading}>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmModal;
