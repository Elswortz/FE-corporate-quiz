import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../store/user/operations';

const Users = () => {
  const dispatch = useDispatch();
  const { list, isLoading, pagination } = useSelector(state => state.users);
  const page = Math.floor(pagination.offset / pagination.limit) + 1;

  useEffect(() => {
    dispatch(fetchUsers({ page }));
  }, [dispatch, page]);

  const handleNext = () => {
    const nextPage = page + 1;
    dispatch(fetchUsers({ page: nextPage, limit }));
  };

  const handlePrev = () => {
    const prevPage = page - 1;
    dispatch(fetchUsers({ page: prevPage, limit }));
  };

  return (
    <div>
      {isLoading && <p>Loading...</p>}

      <ul>
        {list.map(user => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>

      <div style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
        <button onClick={handlePrev} disabled={!pagination.hasPrevious}>
          Prev
        </button>
        <span>
          Page {page} ({list.length} of {pagination.total})
        </span>
        <button onClick={handleNext} disabled={!pagination.hasNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Users;
