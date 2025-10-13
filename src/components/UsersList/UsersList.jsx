import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../store/user/operations';
import Pagination from '../Pagination/Pagination';

const UsersList = () => {
  const dispatch = useDispatch();
  const { list, isLoading, pagination } = useSelector(state => state.users);

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchUsers({ page }));
  }, [dispatch, page]);

  return (
    <div>
      <h1>Users</h1>
      {isLoading && <p>Loading...</p>}

      <ul>
        {list.map(user => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>

      <Pagination
        page={page}
        total={pagination.total}
        limit={pagination.limit}
        onPageChange={setPage}
      />
    </div>
  );
};

export default UsersList;
