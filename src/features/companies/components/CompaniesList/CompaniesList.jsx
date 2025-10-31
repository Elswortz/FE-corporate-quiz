import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCompanies, fetchOwnedCompanies, fetchJoinedCompanies } from '../../store/companiesThunks';

import { Grid, Typography, CircularProgress, Box } from '@mui/material';

import CompaniesItem from '../CompaniesItem/CompaniesItem';
import Pagination from '../../../../components/ui/Pagination/Pagination';

const fetchMap = {
  all: fetchAllCompanies,
  owned: fetchOwnedCompanies,
  joined: fetchJoinedCompanies,
};

const CompaniesList = ({ type = 'all' }) => {
  const dispatch = useDispatch();

  const selector = state => state.companies[type];
  const { data, isLoading, meta } = useSelector(selector);
  const { limit, offset, total } = meta;

  const currentPage = Math.floor(offset / limit) + 1;
  const totalPages = Math.ceil(total / limit);

  const fetchAction = fetchMap[type];

  useEffect(() => {
    if (!data.length) {
      dispatch(fetchAction({ limit, offset: 0 }));
    }
  }, [dispatch, data.length, limit, fetchAction]);

  const handlePageChange = newPage => {
    const newOffset = (newPage - 1) * limit;
    dispatch(fetchAction({ limit, offset: newOffset }));
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
