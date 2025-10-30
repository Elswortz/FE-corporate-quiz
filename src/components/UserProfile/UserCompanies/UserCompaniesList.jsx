import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOwnedCompanies } from '../../../store/companies/operations';
import { setPage } from '../../../store/companies/slice';
import { Grid, Typography, CircularProgress, Box } from '@mui/material';
import Pagination from '../../Pagination/Pagination';
// import UserCompaniesItem from './UserCompaniesItem';
import CompaniesItem from '../../Companies/CompaniesItem/CompaniesItem';

const UserCompaniesList = () => {
  const dispatch = useDispatch();
  const {
    data,
    isLoading,
    meta: { limit, offset, total },
  } = useSelector(state => state.companies.owned);

  const currentPage = Math.floor(offset / limit) + 1;
  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    if (!data.length) {
      dispatch(fetchOwnedCompanies({ limit, offset: 0 }));
    }
  }, [dispatch, limit, data.length]);

  const handlePageChange = newPage => {
    const newOffset = (newPage - 1) * limit;
    dispatch(fetchOwnedCompanies({ limit, offset: newOffset }));
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
    </>
  );
};

export default UserCompaniesList;
