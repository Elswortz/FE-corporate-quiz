import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useForm, Controller } from 'react-hook-form';
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';

import { createCompany } from '../../store/companiesThunks';
import { createCompanySchema, CreateCompanyFormData } from '../../schemas/companiesSchemas';
import { selectCreateCompanyLoading } from '../../store/companiesSelectors';
import { showNotification } from '@/features/notifications/store/notificationsSlice';
import { useTranslation } from 'react-i18next';

type Props = {
  open: boolean;
  onClose?: () => void;
};

const defaultValues: CreateCompanyFormData = {
  company_name: '',
  company_address: '',
  company_email: '',
  company_phone: '',
  company_website: '',
  company_logo_url: '',
  company_description: '',
  company_status: 'visible',
};

const CreateCompanyModal = ({ open, onClose }: Props) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('companies');
  const isLoading = useAppSelector(selectCreateCompanyLoading);
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateCompanyFormData>({
    resolver: zodResolver(createCompanySchema),
    defaultValues,
  });

  useEffect(() => {
    if (!open) {
      reset(defaultValues);
    }
  }, [open, reset]);

  const onSubmit = async (data: CreateCompanyFormData) => {
    try {
      await dispatch(createCompany(data)).unwrap();
      reset(defaultValues);
      onClose?.();
      dispatch(showNotification({ message: `${data.company_name} company successfuly created`, severity: 'success' }));
    } catch (err: any) {
      dispatch(
        showNotification({ message: err.response?.data?.message || 'Failed to create a company', severity: 'error' })
      );
    }
  };

  const handleClose = () => {
    reset(defaultValues);
    onClose?.();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>{t('createModal.title')}</DialogTitle>

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <TextField
            label={t('createModal.companyName')}
            fullWidth
            {...register('company_name')}
            error={!!errors.company_name}
            helperText={errors.company_name?.message}
          />

          <TextField
            label={t('createModal.adress')}
            fullWidth
            {...register('company_address')}
            error={!!errors.company_address}
            helperText={errors.company_address?.message}
          />

          <TextField
            label={t('createModal.email')}
            type="email"
            fullWidth
            {...register('company_email')}
            error={!!errors.company_email}
            helperText={errors.company_email?.message}
          />

          <TextField
            label={t('createModal.phone')}
            fullWidth
            {...register('company_phone')}
            error={!!errors.company_phone}
            helperText={errors.company_phone?.message}
          />

          <TextField
            label={t('createModal.website')}
            fullWidth
            {...register('company_website')}
            error={!!errors.company_website}
            helperText={errors.company_website?.message}
          />

          <TextField
            label={t('createModal.logo')}
            fullWidth
            {...register('company_logo_url')}
            error={!!errors.company_logo_url}
            helperText={errors.company_logo_url?.message}
          />

          <TextField
            label={t('createModal.description')}
            fullWidth
            multiline
            minRows={3}
            {...register('company_description')}
            error={!!errors.company_description}
            helperText={errors.company_description?.message}
          />

          <FormControl fullWidth error={!!errors.company_status}>
            <InputLabel>{t('createModal.status.label')}</InputLabel>

            <Controller
              name="company_status"
              control={control}
              render={({ field }) => (
                <Select {...field} label="Status">
                  <MenuItem value="visible">{t('createModal.status.visible')}</MenuItem>

                  <MenuItem value="hidden">{t('createModal.status.hidden')}</MenuItem>
                </Select>
              )}
            />

            <FormHelperText>{errors.company_status?.message}</FormHelperText>
          </FormControl>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleClose} disabled={isLoading}>
            {t('createModal.cancelBtn')}
          </Button>

          <Button type="submit" variant="contained" disabled={isLoading}>
            {isLoading ? <CircularProgress size={20} /> : t('createModal.createBtn')}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default CreateCompanyModal;
