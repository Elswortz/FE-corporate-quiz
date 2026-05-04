import { useState, ChangeEvent, FormEvent } from 'react';
import { changePasswordSchema } from '../../../../utils/schemas';
import { useDispatch } from 'react-redux';
import { showNotification } from '../../../notifications/store/notificationsSlice';
import { changePassword } from '../../api/authApi';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

type FormState = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

type Props = {
  open: boolean;
  onClose: () => void;
};

// type ValidationError = {
//   name: string;
//   inner?: { path: keyof FormState; message: string }[];
// };

const ChangePassModal = ({ open, onClose }: Props) => {
  const [form, setForm] = useState<FormState>({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await changePasswordSchema.validate(form, { abortEarly: false });
      setErrors({});

      const { oldPassword, newPassword } = form;
      await changePassword({ old_password: oldPassword, new_password: newPassword });
      dispatch(showNotification({ message: 'Password changed successfuly', severity: 'success' }));

      setForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error: any) {
      if (error.name === 'ValidationError') {
        const newErrors: FormErrors = {};
        error.inner.forEach((err: any) => {
          newErrors[err.path as keyof FormState] = err.message;
        });
        setErrors(newErrors);
      } else {
        dispatch(
          showNotification({ message: error.response?.data?.message || 'Failed to change password', severity: 'error' })
        );
      }
    } finally {
      setIsLoading(false);
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
        <Button variant="contained" onClick={handleSubmit} loading={isLoading}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangePassModal;
