import { useState, useEffect } from 'react';
import { Button, Container, Box } from '@mui/material';
import CompaniesList from '../features/companies/components/CompaniesList/CompaniesList';
import CreateCompanyModal from '../features/companies/components/CreateCompanyModal/CreateCompanyModal';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectAllCompanies,
  selectAllCompaniesLoading,
  selectAllCompaniesError,
  selectAllCompaniesMeta,
} from '@/features/companies/store/companiesSelectors';
import { fetchAllCompanies } from '@/features/companies/store/companiesThunks';
import { usePagination } from '@/hooks/usePagination';
import AppPagination from '@/components/ui/Pagination/AppPagination';

const Companies = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleCreate = () => setModalOpen(true);
  const dispatch = useAppDispatch();
  const allCompanies = useAppSelector(selectAllCompanies);
  const allCompaniesLoading = useAppSelector(selectAllCompaniesLoading);
  const allCompaniesError = useAppSelector(selectAllCompaniesError);
  const allCompaniesMeta = useAppSelector(selectAllCompaniesMeta);
  const { limit, offset, setPage } = usePagination({});

  useEffect(() => {
    dispatch(fetchAllCompanies({ limit, offset }));
  }, [dispatch, limit, offset]);

  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="lg">
        <Button sx={{ marginBottom: 4 }} variant="contained" color="primary" onClick={handleCreate}>
          Create company
        </Button>
        <CompaniesList companies={allCompanies} isLoading={allCompaniesLoading} error={allCompaniesError} />
        {allCompaniesMeta && (
          <AppPagination total={allCompaniesMeta.total} limit={limit} offset={offset} onChange={setPage} />
        )}
        <CreateCompanyModal open={modalOpen} onClose={() => setModalOpen(false)} />
      </Container>
    </Box>
  );
};

export default Companies;
