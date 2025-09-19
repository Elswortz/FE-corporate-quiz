import { Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

const AuthNav = () => {
  const { t } = useTranslation();
  return (
    <Box>
      <Button color="inherit">{t('loginBtn')}</Button>
      <Button variant="outlined" color="inherit">
        {t('registerBtn')}
      </Button>
    </Box>
  );
};

export default AuthNav;
