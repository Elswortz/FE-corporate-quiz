import { useState } from 'react';
import { Button } from '@mui/material';
import CompaniesList from '../features/companies/components/CompaniesList/CompaniesList';
import CreateCompanyModal from '../features/companies/components/CreateCompanyModal/CreateCompanyModal';

const Companies = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleCreate = () => setModalOpen(true);
  return (
    <>
      <Button sx={{ marginBottom: 4 }} variant="contained" color="primary" onClick={handleCreate}>
        Create company
      </Button>
      <CompaniesList type="all" />
      <CreateCompanyModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default Companies;
