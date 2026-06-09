import { Grid, CircularProgress, Box, Alert } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';

import UsersItem from '../UsersItem/UsersItem';
import { User } from '../../types/userTypes';

type UsersListProps = {
  users: User[];
  isLoading: boolean;
  error: string | null;
};

const UsersList = ({ users, isLoading, error }: UsersListProps) => {
  const location = useLocation();

  if (isLoading)
    return (
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
    );

  if (!users.length) {
    return <Alert severity="info">No users found</Alert>;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box>
      <Grid container spacing={2}>
        {users.map(user => (
          <Grid
            key={user.id}
            size={{
              xs: 12,
              sm: 6,
              md: 4,
              lg: 3,
            }}
          >
            <NavLink
              to={user.id.toString()}
              state={{ from: location }}
              style={{
                textDecoration: 'none',
                color: 'inherit',
                display: 'block',
                height: '100%',
              }}
            >
              <UsersItem user={user} />
            </NavLink>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UsersList;
