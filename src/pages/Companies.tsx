import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import CompaniesList from '../features/companies/components/CompaniesList/CompaniesList';
import CreateCompanyModal from '../features/companies/components/CreateCompanyModal/CreateCompanyModal';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectAllCompanies,
  selectAllCompaniesLoading,
  selectAllCompaniesError,
} from '@/features/companies/store/companiesSelectors';
import { fetchAllCompanies } from '@/features/companies/store/companiesThunks';

const Companies = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleCreate = () => setModalOpen(true);
  const dispatch = useAppDispatch();
  const allCompanies = useAppSelector(selectAllCompanies);
  const allCompaniesLoading = useAppSelector(selectAllCompaniesLoading);
  const allCompaniesError = useAppSelector(selectAllCompaniesError);

  useEffect(() => {
    dispatch(fetchAllCompanies({ limit: 10, offset: 0 }));
  }, [dispatch]);

  return (
    <>
      <Button sx={{ marginBottom: 4 }} variant="contained" color="primary" onClick={handleCreate}>
        Create company
      </Button>
      <CompaniesList companies={allCompanies} isLoading={allCompaniesLoading} error={allCompaniesError} />
      <CreateCompanyModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default Companies;
