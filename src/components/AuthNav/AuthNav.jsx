import { Box, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AuthNav = () => {
  const { t } = useTranslation();
  return (
    <Box>
      <Button component={NavLink} to="/login" color="inherit">
        {t('authButtons.loginBtn')}
      </Button>
      <Button component={NavLink} to="/registration" variant="outlined" color="inherit">
        {t('authButtons.registerBtn')}
      </Button>
    </Box>
  );
};

export default AuthNav;
