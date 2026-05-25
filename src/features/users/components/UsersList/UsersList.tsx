import { useEffect } from 'react';
import { fetchUsers } from '../../store/usersThunks';
import { Grid, Typography, CircularProgress, Box } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';

import UsersItem from '../UsersItem/UsersItem';
import Pagination from '../../../../components/ui/Pagination/AppPagination';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectUsersList, selectUsersListLoading } from '../../store/usersSelectors';

const UsersList = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsersList);
  const isLoading = useAppSelector(selectUsersListLoading);
  const location = useLocation();

  useEffect(() => {
    if (!users.length) {
      dispatch(fetchUsers({ limit: 10, offset: 0 }));
    }
  }, [dispatch, users.length]);

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
          {users.length === 0 ? (
            <Typography variant="body1">No users found.</Typography>
          ) : (
            <Grid container spacing={2}>
              {users.map(user => (
                <Grid sx={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={user.id}>
                  <NavLink to={user.id.toString()} state={{ from: location }}>
                    <UsersItem user={user} />
                  </NavLink>
                </Grid>
              ))}
            </Grid>
          )}

          {users.length > 0 && (
            <Box sx={{ mt: 3 }}>
              {/* <Pagination page={currentPage} total={totalPages} limit={limit} onPageChange={handlePageChange} /> */}
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default UsersList;
