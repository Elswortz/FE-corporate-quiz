import { Snackbar, Alert } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { closeNotification } from '../../store/notification/slice';

const NotificationProvider = () => {
  const dispatch = useDispatch();
  const { open, message, severity } = useSelector(state => state.notification);

  const handleClose = (_, reason) => {
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
