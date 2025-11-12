import UserInfo from '../features/users/components/UserInfo/UserInfo';
import CompaniesList from '../features/companies/components/CompaniesList/CompaniesList';
import { Box } from '@mui/material';

const UserProfile = () => {
  return (
    <>
      <UserInfo />
      <Box
        sx={{
          maxWidth: 1000,
          mx: 'auto',
          mt: 5,
          p: 4,
          boxShadow: 3,
          borderRadius: 3,
          backgroundColor: 'background.paper',
        }}
      >
        <CompaniesList type="owned" />
        <CompaniesList type="joined" />
      </Box>
    </>
  );
};

export default UserProfile;
