import { Card, Avatar, Typography, Stack } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { User } from '../../types/userTypes';

type Props = {
  user: User;
};

const UsersItem = ({ user }: Props) => {
  return (
    <Card
      sx={{
        height: '100%',
        p: 2,
        borderRadius: 3,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        transition: 'all 0.2s ease',
        boxShadow: 1,
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 4,
        },
      }}
    >
      <Avatar
        src={user.avatar_url || ''}
        alt={`${user.first_name} ${user.last_name}`}
        sx={{
          width: 64,
          height: 64,
          bgcolor: deepPurple[500],
          flexShrink: 0,
        }}
      >
        {!user.avatar_url && user.first_name?.[0]}
      </Avatar>

      <Stack
        spacing={0.5}
        sx={{
          minWidth: 0,
          flex: 1,
        }}
      >
        <Typography variant="subtitle1" fontWeight={600} noWrap>
          {user.first_name} {user.last_name}
        </Typography>

        <Typography variant="body2" color="text.secondary" noWrap>
          {user.email}
        </Typography>
      </Stack>
    </Card>
  );
};

export default UsersItem;
