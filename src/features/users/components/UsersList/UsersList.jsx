import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../store/usersThunks';
import { setPage } from '../../store/usersSlice';
import { Grid, Typography, CircularProgress, Box } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';

import UsersItem from '../UsersItem/UsersItem';
import Pagination from '../../../../components/ui/Pagination/Pagination';

const UsersList = () => {
  const dispatch = useDispatch();
  const { list, isLoading, pagination } = useSelector(state => state.users);
  const location = useLocation();

  useEffect(() => {
    if (!list.length) {
      dispatch(fetchUsers({ page: pagination.page }));
    }
  }, [dispatch, pagination.page, list.length]);

  const handlePageChange = newPage => {
    dispatch(setPage(newPage));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        List of all users
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
          {list.length === 0 ? (
            <Typography variant="body1">No users found.</Typography>
          ) : (
            <Grid container spacing={2}>
              {list.map(user => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
                  <NavLink to={user.id.toString()} state={{ from: location }}>
                    <UsersItem user={user} />
                  </NavLink>
                </Grid>
              ))}
            </Grid>
          )}

          {list.length > 0 && (
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

export default UsersList;
