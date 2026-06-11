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
import LoadMoreButton from '@/components/ui/LoadMoreButton/LoadMoreButton';

const Companies = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const dispatch = useAppDispatch();
  const allCompanies = useAppSelector(selectAllCompanies);
  const allCompaniesLoading = useAppSelector(selectAllCompaniesLoading);
  const allCompaniesError = useAppSelector(selectAllCompaniesError);
  const allCompaniesMeta = useAppSelector(selectAllCompaniesMeta);
  const isInitialLoading = allCompaniesLoading && allCompanies.length === 0;

  const COMPANIES_LIMIT = 8;

  useEffect(() => {
    if (!allCompanies.length && !allCompaniesLoading) {
      dispatch(fetchAllCompanies({ limit: COMPANIES_LIMIT, offset: 0 }));
    }
  }, [dispatch, allCompanies.length, allCompaniesLoading]);

  const handleLoadMore = async () => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);

    await dispatch(
      fetchAllCompanies({
        limit: COMPANIES_LIMIT,
        offset: allCompanies.length,
      })
    );
    setIsLoadingMore(false);
  };

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
            onClick={() => setModalOpen(true)}
            sx={{
              height: 56,
              flexShrink: 0,
            }}
          >
            Create company
          </Button>
        </Box>
        <CompaniesList companies={filteredCompanies} isLoading={isInitialLoading} error={allCompaniesError} />
        {!isInitialLoading && (
          <>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Total companies: {allCompaniesMeta?.total ?? 0}
            </Typography>
            <LoadMoreButton hasMore={allCompaniesMeta?.has_next} isLoading={isLoadingMore} onClick={handleLoadMore} />
          </>
        )}
        <CreateCompanyModal open={modalOpen} onClose={() => setModalOpen(false)} />
      </Container>
    </Box>
  );
};

export default Companies;
