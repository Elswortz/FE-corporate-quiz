const initialState = {
  list: [],
  pagination: { total: 0, limit: 1, offset: 0, hasNext: false, hasPrevious: false },
  selected: null,
  isLoading: false,
  error: null,
};

export default initialState;
