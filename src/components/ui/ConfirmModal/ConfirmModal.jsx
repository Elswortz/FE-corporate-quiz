import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button } from '@mui/material';

const ConfirmModal = ({ isOpen, title, description, confirmText, confirmColor, onConfirm, onCancel }) => {
  return (
    <Dialog open={isOpen} onClose={onCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>{description}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button color={confirmColor} onClick={onConfirm}>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmModal;
