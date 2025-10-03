import { Divider, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

const AlterLogin = () => {
  const { t } = useTranslation('auth');
  const handleGoogleLogin = () => {};

  const handleAzureLogin = () => {};

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
