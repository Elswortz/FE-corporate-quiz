import UsersList from '../features/users/components/UsersList/UsersList';
import { Container } from '@mui/material';

const Users = () => {
  return (
    <>
      <Container maxWidth="lg">
        <UsersList />
      </Container>
    </>
  );
};

export default Users;
