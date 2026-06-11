import { useAppDispatch, useAppSelector } from '@/store/hooks';
import UsersList from '../features/users/components/UsersList/UsersList';
import { Container, Typography } from '@mui/material';
import {
  selectUsersList,
  selectUsersListError,
  selectUsersListLoading,
  selectUsersListMeta,
} from '@/features/users/store/usersSelectors';
import { useEffect, useState } from 'react';
import { fetchUsers } from '@/features/users/store/usersThunks';
import { LoadMoreButton } from '@/components/ui';

const Users = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsersList);
  const isLoading = useAppSelector(selectUsersListLoading);
  const error = useAppSelector(selectUsersListError);
  const meta = useAppSelector(selectUsersListMeta);
  const isInitialLoading = isLoading && users.length === 0;
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const USERS_LIMIT = 20;

  useEffect(() => {
    if (!users.length && !isLoading) {
      dispatch(
        fetchUsers({
          limit: USERS_LIMIT,
          offset: 0,
        })
      );
    }
  }, [dispatch, users.length, isLoading]);

  const handleLoadMore = async () => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);

    await dispatch(
      fetchUsers({
        limit: USERS_LIMIT,
        offset: users.length,
      })
    );
    setIsLoadingMore(false);
  };

  return (
    <>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom>
          List of all users
        </Typography>
        <UsersList users={users} isLoading={isInitialLoading} error={error} />
        {!isInitialLoading && (
          <LoadMoreButton hasMore={meta?.has_next} isLoading={isLoadingMore} onClick={handleLoadMore} />
        )}
      </Container>
    </>
  );
};

export default Users;
