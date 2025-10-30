import { useState } from 'react';
import * as Yup from 'yup';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createCompany } from '../../../store/companies/operations';

const schema = Yup.object().shape({
  company_name: Yup.string().required('Введите название компании'),
  company_address: Yup.string().nullable(),
  company_email: Yup.string().email('Некорректный e-mail').nullable(),
  company_phone: Yup.string().nullable(),
  company_website: Yup.string().url('Некорректный URL').nullable(),
  company_logo_url: Yup.string().url('Некорректный URL').nullable(),
  company_description: Yup.string().nullable(),
  company_status: Yup.string().oneOf(['visible', 'hidden']).required(),
});

const emptyForm = {
  company_name: '',
  company_address: '',
  company_email: '',
  company_phone: '',
  company_website: '',
  company_logo_url: '',
  company_description: '',
  company_status: 'visible',
};

const CreateCompanyModal = ({ open, onClose }) => {
  const { isLoading } = useSelector(state => state.companies.create);
  const dispatch = useDispatch();
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(s => ({ ...s, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await schema.validate(form, { abortEarly: false });
      setErrors({});

      dispatch(createCompany(form));

      setForm(emptyForm);
      if (onClose) onClose();
    } catch (err) {
      if (err.name === 'ValidationError' && err.inner) {
        const newErrors = {};
        err.inner.forEach(e => {
          newErrors[e.path] = e.message;
        });
        setErrors(newErrors);
      } else {
        console.log(err.message);
      }
    }
  };

  const handleClose = () => {
    setForm(emptyForm);
    setErrors({});
    if (onClose) onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Create Company</DialogTitle>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Company name"
            name="company_name"
            value={form.company_name}
            onChange={handleChange}
            required
            error={!!errors.company_name}
            helperText={errors.company_name}
            fullWidth
          />
          <TextField
            label="Address"
            name="company_address"
            value={form.company_address}
            onChange={handleChange}
            error={!!errors.company_address}
            helperText={errors.company_address}
            fullWidth
          />
          <TextField
            label="Email"
            name="company_email"
            type="email"
            value={form.company_email}
            onChange={handleChange}
            error={!!errors.company_email}
            helperText={errors.company_email}
            fullWidth
          />
          <TextField
            label="Phone"
            name="company_phone"
            value={form.company_phone}
            onChange={handleChange}
            error={!!errors.company_phone}
            helperText={errors.company_phone}
            fullWidth
          />
          <TextField
            label="Website"
            name="company_website"
            value={form.company_website}
            onChange={handleChange}
            error={!!errors.company_website}
            helperText={errors.company_website}
            fullWidth
          />
          <TextField
            label="Logo URL"
            name="company_logo_url"
            value={form.company_logo_url}
            onChange={handleChange}
            error={!!errors.company_logo_url}
            helperText={errors.company_logo_url}
            fullWidth
          />
          <TextField
            label="Description"
            name="company_description"
            value={form.company_description}
            onChange={handleChange}
            error={!!errors.company_description}
            helperText={errors.company_description}
            fullWidth
            multiline
            minRows={3}
          />

          <FormControl fullWidth error={!!errors.company_status}>
            <InputLabel id="company-status-label">Status</InputLabel>
            <Select
              labelId="company-status-label"
              id="company-status"
              name="company_status"
              value={form.company_status}
              label="Status"
              onChange={handleChange}
            >
              <MenuItem value="visible">Visible</MenuItem>
              <MenuItem value="hidden">Hidden</MenuItem>
            </Select>
            {errors.company_status && (
              <Box component="span" sx={{ color: 'error.main', fontSize: '0.75rem', mt: 0.5 }}>
                {errors.company_status}
              </Box>
            )}
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={isLoading}>
            {isLoading ? <CircularProgress size={20} /> : 'Create'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default CreateCompanyModal;
