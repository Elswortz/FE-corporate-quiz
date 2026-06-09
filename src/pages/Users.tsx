import { useAppDispatch, useAppSelector } from '@/store/hooks';
import UsersList from '../features/users/components/UsersList/UsersList';
import { Container, Typography } from '@mui/material';
import {
  selectUsersList,
  selectUsersListError,
  selectUsersListLoading,
  selectUsersListMeta,
} from '@/features/users/store/usersSelectors';
import { useEffect } from 'react';
import { fetchUsers } from '@/features/users/store/usersThunks';
import { usePagination } from '@/hooks/usePagination';
import { LoadMoreButton } from '@/components/ui';

const Users = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsersList);
  const isLoading = useAppSelector(selectUsersListLoading);
  const error = useAppSelector(selectUsersListError);
  const meta = useAppSelector(selectUsersListMeta);

  const { limit, offset, loadMore } = usePagination({});

  useEffect(() => {
    dispatch(fetchUsers({ limit: 20, offset }));
  }, [dispatch, limit, offset]);

  return (
    <>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom>
          List of all users
        </Typography>
        <UsersList users={users} isLoading={isLoading} error={error} />
        <LoadMoreButton hasMore={meta?.has_next} isLoading={isLoading} onClick={loadMore} />
      </Container>
    </>
  );
};

export default Users;
