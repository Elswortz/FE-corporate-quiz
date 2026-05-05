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
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateCompany } from '../../store/companiesThunks';

const editCompanySchema = Yup.object().shape({
  company_name: Yup.string().required('Введите название компании'),
  company_address: Yup.string().nullable(),
  company_phone: Yup.string().nullable(),
  company_website: Yup.string().url('Некорректный URL').nullable(),
  company_description: Yup.string().nullable(),
});

const EditCompanyModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector(state => state.companies.selected);
  const [form, setForm] = useState({
    company_name: data.company_name || '',
    company_address: data.company_address || '',
    company_phone: data.company_phone || '',
    company_website: data.company_website || '',
    company_description: data.company_description || '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(s => ({ ...s, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await editCompanySchema.validate(form, { abortEarly: false });
      setErrors({});
      dispatch(updateCompany({ companyId: data.id, data: form }));

      onClose();
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
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Company</DialogTitle>
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
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={isLoading}>
            {isLoading ? <CircularProgress size={20} /> : 'Save'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default EditCompanyModal;
