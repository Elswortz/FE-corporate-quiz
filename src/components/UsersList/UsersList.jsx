import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../store/user/operations';
import { Grid, Typography, CircularProgress, Box } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';

import UserItem from './UserItem';
import Pagination from '../Pagination/Pagination';

const UsersList = () => {
  const dispatch = useDispatch();
  const { list, isLoading, pagination } = useSelector(state => state.users);
  const location = useLocation();

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchUsers({ page }));
  }, [dispatch, page]);

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
                    <UserItem user={user} />
                  </NavLink>
                </Grid>
              ))}
            </Grid>
          )}

          {list.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Pagination
                page={page}
                total={pagination.total}
                limit={pagination.limit}
                onPageChange={setPage}
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default UsersList;
