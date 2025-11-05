import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompanies } from '../../store/companiesThunks';

import { Grid, Typography, CircularProgress, Box } from '@mui/material';

import CompaniesItem from '../CompaniesItem/CompaniesItem';
import Pagination from '../../../../components/ui/Pagination/Pagination';

const CompaniesList = ({ type = 'all' }) => {
  const dispatch = useDispatch();

  const selector = state => state.companies[type];
  const { data, isLoading, meta } = useSelector(selector);
  const { limit, offset, total } = meta;

  const currentPage = Math.floor(offset / limit) + 1;
  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    if (!data.length) dispatch(fetchCompanies({ type, limit, offset: 0 }));

    const interval = setInterval(() => {
      dispatch(fetchCompanies({ type, limit, offset: 0 }));
    }, 3 * 60 * 1000);

    const handleFocus = () => dispatch(fetchCompanies({ type, limit, offset: 0 }));
    window.addEventListener('focus', handleFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', handleFocus);
    };
  }, [dispatch, data.length, type, limit]);

  const handlePageChange = newPage => {
    const newOffset = (newPage - 1) * limit;
    dispatch(fetchCompanies({ limit, offset: newOffset }));
  };

  const titles = {
    all: 'List of all companies',
    owned: 'Your owned companies',
    joined: 'Companies you joined',
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {titles[type]}
      </Typography>

      {isLoading ? (
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
          {data.length === 0 ? (
            <Typography variant="body1">No companies found.</Typography>
          ) : (
            <Grid container spacing={2}>
              {data.map(company => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={company.id}>
                  <CompaniesItem company={company} />
                </Grid>
              ))}
            </Grid>
          )}

          {data.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Pagination page={currentPage} total={totalPages} limit={limit} onPageChange={handlePageChange} />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default CompaniesList;
