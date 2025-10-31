import { Box, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function NavMenu() {
  const { t } = useTranslation('header');

  return (
    <Box display="flex" gap={2}>
      <Button component={NavLink} to="/" color="inherit">
        {t('navigation.nav1')}
      </Button>
      <Button component={NavLink} to="/users" color="inherit">
        {t('navigation.nav2')}
      </Button>
      <Button component={NavLink} to="/companies" color="inherit">
        {t('navigation.nav3')}
      </Button>
    </Box>
  );
}

export default NavMenu;
