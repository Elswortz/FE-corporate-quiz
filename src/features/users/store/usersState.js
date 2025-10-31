const usersState = {
  list: [],
  pagination: { total: 0, limit: 20, offset: 0, page: 1, hasNext: false, hasPrevious: false },
  selected: null,
  isLoading: false,
  error: null,
};

export default usersState;
