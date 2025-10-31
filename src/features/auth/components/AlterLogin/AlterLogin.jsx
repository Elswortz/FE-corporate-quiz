import { Divider, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

const AlterLogin = () => {
  const { t } = useTranslation('auth');

  const handleGoogleLogin = async () => {
    window.location.href = 'http://localhost:8000/auth/google/login';
  };

  const handleAzureLogin = async () => {
    window.location.href = 'http://localhost:8000/auth/azure/login';
  };

  return (
    <>
      <Divider sx={{ my: 2 }}>{t('text.or')}</Divider>
      <Button variant="outlined" color="primary" onClick={handleGoogleLogin}>
        {t('buttons.googleBtn')}
      </Button>
      <Button variant="outlined" color="secondary" onClick={handleAzureLogin}>
        {t('buttons.azureBtn')}
      </Button>
    </>
  );
};

export default AlterLogin;
