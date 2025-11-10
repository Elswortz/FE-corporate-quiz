import { useState } from 'react';
import { changePasswordSchema } from '../../../../utils/schemas';
import { useDispatch } from 'react-redux';
import { showNotification } from '../../../notifications/store/notificationsSlice';
import { changePassword } from '../../api/profileApi';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

const ChangePassModal = ({ open, onClose }) => {
  const [form, setForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await changePasswordSchema.validate(form, { abortEarly: false });
      setErrors({});

      const { oldPassword, newPassword } = form;
      await changePassword({ old_password: oldPassword, new_password: newPassword });
      dispatch(showNotification({ message: 'Password changed successfuly', severity: 'success' }));

      setForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      if (error.name === 'ValidationError') {
        const newErrors = {};
        error.inner.forEach(err => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      } else {
        dispatch(
          showNotification({ message: error.response?.data?.message || 'Failed to change password', severity: 'error' })
        );
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Change Password</DialogTitle>
      <DialogContent>
        <TextField
          label="Old Password"
          name="oldPassword"
          type="password"
          value={form.oldPassword}
          onChange={handleChange}
          error={!!errors.oldPassword}
          helperText={errors.oldPassword}
          fullWidth
          sx={{ mt: 1 }}
        />
        <TextField
          label="New Password"
          name="newPassword"
          type="password"
          value={form.newPassword}
          onChange={handleChange}
          error={!!errors.newPassword}
          helperText={errors.newPassword}
          fullWidth
          sx={{ mt: 2 }}
        />
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          fullWidth
          sx={{ mt: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangePassModal;
