import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCompanies } from '../../../store/companies/operations';
import { setPage } from '../../../store/companies/slice';
import { Grid, Typography, CircularProgress, Box } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';

import CompaniesItem from '../CompaniesItem/CompaniesItem';
import Pagination from '../../Pagination/Pagination';

const CompaniesList = () => {
  const dispatch = useDispatch();
  const { allCompanies, isLoading, pagination } = useSelector(state => state.companies);
  const location = useLocation();

  useEffect(() => {
    if (!allCompanies.length) {
      dispatch(fetchAllCompanies({ page: pagination.page }));
    }
  }, [dispatch, pagination.page, allCompanies.length]);

  const handlePageChange = newPage => {
    dispatch(setPage(newPage));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        List of all companies
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
          {allCompanies.length === 0 ? (
            <Typography variant="body1">No companies found.</Typography>
          ) : (
            <Grid container spacing={2}>
              {allCompanies.map(company => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={company.id}>
                  <NavLink to={company.id.toString()} state={{ from: location }}>
                    <CompaniesItem company={company} />
                  </NavLink>
                </Grid>
              ))}
            </Grid>
          )}

          {allCompanies.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Pagination
                page={pagination.page}
                total={pagination.total}
                limit={pagination.limit}
                onPageChange={handlePageChange}
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default CompaniesList;
