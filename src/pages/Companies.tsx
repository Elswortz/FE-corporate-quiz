import { useState, useEffect, useMemo } from 'react';
import { Button, Container, Box, TextField, Typography } from '@mui/material';
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
import LoadMoreButton from '@/components/ui/LoadMoreButton/LoadMoreButton';

const Companies = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState('');

  const handleCreate = () => setModalOpen(true);
  const dispatch = useAppDispatch();
  const allCompanies = useAppSelector(selectAllCompanies);
  const allCompaniesLoading = useAppSelector(selectAllCompaniesLoading);
  const allCompaniesError = useAppSelector(selectAllCompaniesError);
  const allCompaniesMeta = useAppSelector(selectAllCompaniesMeta);
  const { limit, offset, loadMore } = usePagination({});

  useEffect(() => {
    dispatch(fetchAllCompanies({ limit, offset }));
  }, [dispatch, limit, offset]);

  const filteredCompanies = useMemo(() => {
    return allCompanies.filter(company => company.company_name.toLowerCase().includes(search.toLowerCase()));
  }, [allCompanies, search]);

  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mb: 4,
          }}
        >
          <TextField fullWidth label="Search companies" value={search} onChange={e => setSearch(e.target.value)} />

          <Button
            variant="contained"
            color="primary"
            onClick={handleCreate}
            sx={{
              height: 56,
              flexShrink: 0,
            }}
          >
            Create company
          </Button>
        </Box>
        <CompaniesList companies={filteredCompanies} isLoading={allCompaniesLoading} error={allCompaniesError} />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Total companies: {allCompaniesMeta?.total ?? 0}
        </Typography>
        <LoadMoreButton hasMore={allCompaniesMeta?.has_next} isLoading={allCompaniesLoading} onClick={loadMore} />
        <CreateCompanyModal open={modalOpen} onClose={() => setModalOpen(false)} />
      </Container>
    </Box>
  );
};

export default Companies;
