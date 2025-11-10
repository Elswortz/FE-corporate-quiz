import { useState } from 'react';
import { forgotPasswordSchema } from '../../../../utils/schemas';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../api/profileApi';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, TextField, Button } from '@mui/material';
import { showNotification } from '../../../notifications/store/notificationsSlice';

const ForgotPassModal = ({ open, onClose }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await forgotPasswordSchema.validate({ email });
      setError('');
      await resetPassword(email);
      dispatch(
        showNotification({ message: `The reset email has been successfully sent to ${email}`, severity: 'success' })
      );
      setEmail('');
    } catch (err) {
      setError(err.response?.data?.message);
      dispatch(showNotification({ message: err.response?.data?.message, severity: 'error' }));
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Reset your password</DialogTitle>
      <DialogContent>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Enter your email and we will send you a password reset email.
        </Typography>
        <TextField
          fullWidth
          label="E-mail"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          error={!!error}
          helperText={error}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={handleSubmit} variant="contained">
          Отправить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ForgotPassModal;
