import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyCompanies } from '../../../store/companies/operations';
import { setPage } from '../../../store/companies/slice';
import { Grid, Typography, CircularProgress, Box } from '@mui/material';
import Pagination from '../../Pagination/Pagination';
import UserCompaniesItem from './UserCompaniesItem';

const UserCompaniesList = () => {
  const dispatch = useDispatch();
  const { myCompanies, isLoading, pagination } = useSelector(state => state.companies);

  useEffect(() => {
    if (!myCompanies.length) {
      dispatch(fetchMyCompanies({ page: pagination.page }));
    }
  }, [dispatch, pagination.page, myCompanies.length]);

  const handlePageChange = newPage => {
    dispatch(setPage(newPage));
  };

  return (
    <>
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
          {myCompanies.length === 0 ? (
            <Typography variant="body1">No companies found.</Typography>
          ) : (
            <Grid container spacing={2}>
              {myCompanies.map(company => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={company.id}>
                  <UserCompaniesItem company={company} />
                </Grid>
              ))}
            </Grid>
          )}

          {myCompanies.length > 0 && (
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
    </>
  );
};

export default UserCompaniesList;
