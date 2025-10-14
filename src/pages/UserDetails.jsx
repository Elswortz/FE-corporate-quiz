import { NavLink, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchUserById } from '../store/user/operations';
import {
  Box,
  Card,
  CardContent,
  Avatar,
  Typography,
  CircularProgress,
  Divider,
  Paper,
} from '@mui/material';
import { deepPurple } from '@mui/material/colors';

const UserDetails = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { selected, isLoading, error } = useSelector(state => state.users);
  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/users';

  useEffect(() => {
    dispatch(fetchUserById(userId));
  }, [dispatch, userId]);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" textAlign="center" mt={4}>
        {error}
      </Typography>
    );
  }

  if (!selected) {
    return (
      <Typography textAlign="center" mt={4}>
        User not found
      </Typography>
    );
  }

  const { id, avatar_url, first_name, last_name, email } = selected;
  return (
    <>
      <NavLink to={backLinkHref}>← Go back</NavLink>
      <Box display="flex" justifyContent="center" alignItems="center" mt={6}>
        <Card
          sx={{
            width: 400,
            p: 3,
            borderRadius: 4,
            boxShadow: 4,
            textAlign: 'center',
          }}
        >
          <Avatar
            src={avatar_url || ''}
            alt={`${first_name} ${last_name}`}
            sx={{
              width: 96,
              height: 96,
              margin: '0 auto 16px',
              bgcolor: avatar_url ? 'transparent' : deepPurple[500],
              fontSize: 32,
            }}
          >
            {!avatar_url && (first_name?.[0] || '?')}
          </Avatar>

          <CardContent>
            <Typography variant="h5" fontWeight="600">
              {first_name} {last_name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {email}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Paper
              variant="outlined"
              sx={{
                p: 1.5,
                borderRadius: 2,
                bgcolor: 'background.default',
                textAlign: 'left',
              }}
            >
              <Typography variant="body2" color="text.secondary">
                <strong>ID:</strong> {id}
              </Typography>
            </Paper>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default UserDetails;
