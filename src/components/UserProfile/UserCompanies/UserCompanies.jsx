import { Box, Typography, Button } from '@mui/material';
import { useState } from 'react';
import CreateCompanyModal from './CreateCompanyModal';
import UserCompaniesList from './UserCompaniesList';
const UserCompanies = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleCreate = () => setModalOpen(true);

  return (
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
      <Typography variant="h4" mb={3}>
        My Companies
      </Typography>
      <Button sx={{ marginBottom: 4 }} variant="contained" color="primary" onClick={handleCreate}>
        Create company
      </Button>
      <UserCompaniesList />

      <CreateCompanyModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </Box>
  );
};

export default UserCompanies;
