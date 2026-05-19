import { useEffect } from 'react';
import { fetchAllCompanies } from '../../store/companiesThunks';

import { Grid, Typography, CircularProgress, Box } from '@mui/material';

import CompaniesItem from '../CompaniesItem/CompaniesItem';
import Pagination from '../../../../components/ui/Pagination/Pagination';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectAllCompanies, selectAllCompaniesError, selectAllCompaniesLoading } from '../../store/companiesSelectors';

const CompaniesList = () => {
  const dispatch = useAppDispatch();
  const allCompanies = useAppSelector(selectAllCompanies);
  const allCompaniesLoading = useAppSelector(selectAllCompaniesLoading);
  const allCompaniesError = useAppSelector(selectAllCompaniesError);

  useEffect(() => {
    if (!allCompanies.length) dispatch(fetchAllCompanies({ limit: 10, offset: 0 }));
  }, [dispatch, allCompanies.length]);

  return (
    <Box sx={{ p: 3 }}>
      {allCompaniesLoading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh',
          }}
        >
          <CircularProgress size={60} />
        </Box>
      ) : (
        <>
          {allCompanies.length === 0 ? (
            <Typography variant="body1">No companies found.</Typography>
          ) : (
            <Grid container spacing={2}>
              {allCompanies.map(company => (
                <Grid sx={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={company.id}>
                  <CompaniesItem company={company} />
                </Grid>
              ))}
            </Grid>
          )}

          {allCompanies.length > 0 && (
            <Box sx={{ mt: 3 }}>
              {/* <Pagination page={currentPage} total={totalPages} limit={limit} onPageChange={handlePageChange} /> */}
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default CompaniesList;
