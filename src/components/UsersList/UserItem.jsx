import { Card, CardHeader, Avatar, Typography } from '@mui/material';
import { deepPurple } from '@mui/material/colors';

const UserItem = ({ user }) => {
  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 2,
        borderRadius: 3,
        boxShadow: 2,
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        cursor: 'pointer',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: 4,
        },
      }}
    >
      <Avatar
        src={user.avatar_url || ''}
        alt={`${user.first_name} ${user.last_name}`}
        sx={{
          width: 56,
          height: 56,
          bgcolor: deepPurple[500],
          mr: 2,
        }}
      >
        {!user.avatar && (user.first_name?.[0] || '?')}
      </Avatar>

      <CardHeader
        title={
          <Typography variant="h6" fontWeight="500">
            {user.first_name} {user.last_name}
          </Typography>
        }
        subheader={
          <Typography variant="body2" color="text.secondary">
            {user.email}
          </Typography>
        }
        sx={{ p: 0 }}
      />
    </Card>
  );
};

export default UserItem;
