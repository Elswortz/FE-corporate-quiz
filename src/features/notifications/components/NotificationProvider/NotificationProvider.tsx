import { Snackbar, Alert } from '@mui/material';
import { closeNotification } from '../../store/notificationsSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { SyntheticEvent } from 'react';

const NotificationProvider = () => {
  const dispatch = useAppDispatch();
  const { open, message, severity } = useAppSelector(state => state.notification);

  const handleClose = (_: Event | SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') return;
    dispatch(closeNotification());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert onClose={handleClose} severity={severity} variant="filled" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default NotificationProvider;
