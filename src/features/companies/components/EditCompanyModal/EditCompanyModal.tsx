import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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

import { updateCompany } from '../../store/companiesThunks';
import { selectSelectedCompany, selectUpdateCompanyLoading } from '../../store/companiesSelectors';
import { editCompanySchema, EditCompanyFormData } from '../../schemas/companiesSchemas';

type Props = {
  open: boolean;
  onClose: () => void;
};

const EditCompanyModal = ({ open, onClose }: Props) => {
  const dispatch = useAppDispatch();
  const company = useAppSelector(selectSelectedCompany);
  const isLoading = useAppSelector(selectUpdateCompanyLoading);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditCompanyFormData>({
    resolver: zodResolver(editCompanySchema),
    defaultValues: {
      company_name: '',
      company_address: '',
      company_phone: '',
      company_website: '',
      company_description: '',
    },
  });

  useEffect(() => {
    if (!company || !open) return;

    reset({
      company_name: company.company_name || '',
      company_address: company.company_address || '',
      company_phone: company.company_phone || '',
      company_website: company.company_website || '',
      company_description: company.company_description || '',
    });
  }, [company, open, reset]);

  const onSubmit = async (formData: EditCompanyFormData) => {
    if (!company) return;

    try {
      await dispatch(
        updateCompany({
          companyId: company.id,
          data: formData,
        })
      ).unwrap();

      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" disableRestoreFocus>
      <DialogTitle>Edit Company</DialogTitle>

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <TextField
            label="Company name"
            fullWidth
            required
            {...register('company_name')}
            error={!!errors.company_name}
            helperText={errors.company_name?.message}
          />

          <TextField
            label="Address"
            fullWidth
            {...register('company_address')}
            error={!!errors.company_address}
            helperText={errors.company_address?.message}
          />

          <TextField
            label="Phone"
            fullWidth
            {...register('company_phone')}
            error={!!errors.company_phone}
            helperText={errors.company_phone?.message}
          />

          <TextField
            label="Website"
            fullWidth
            {...register('company_website')}
            error={!!errors.company_website}
            helperText={errors.company_website?.message}
          />

          <TextField
            label="Description"
            fullWidth
            multiline
            minRows={3}
            {...register('company_description')}
            error={!!errors.company_description}
            helperText={errors.company_description?.message}
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
