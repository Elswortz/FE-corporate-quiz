const initialState = {
  list: [],
  pagination: { total: 0, limit: 10, offset: 0, hasNext: false, hasPrevious: false },
  current: null,
  selected: null,
  isLoading: false,
  error: null,
};

export default initialState;
