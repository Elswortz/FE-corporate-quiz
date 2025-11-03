const usersState = {
  all: {
    data: [],
    isLoading: false,
    error: null,
    meta: { total: 0, limit: 10, offset: 0, has_next: false, has_previous: false },
  },
  selected: { data: null, isLoading: false, error: null },
};

export default usersState;
