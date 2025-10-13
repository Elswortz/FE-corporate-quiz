import { Divider, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { googleLogIn, azureLogIn } from '../../store/auth/operations';

const AlterLogin = () => {
  const { t } = useTranslation('auth');
  const dispatch = useDispatch();

  const handleGoogleLogin = () => {
    dispatch(googleLogIn());
  };

  const handleAzureLogin = () => {
    dispatch(azureLogIn());
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
      <a href="http://localhost:8000/auth/google/login">Войти через Google</a>
    </>
  );
};

export default AlterLogin;
