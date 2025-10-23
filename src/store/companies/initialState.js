const initialState = {
  myCompanies: [],
  allCompanies: [],
  pagination: { total: 0, limit: 20, offset: 0, page: 1, hasNext: false, hasPrevious: false },
  selectedCompany: null,
  isLoading: false,
  error: null,
};

export default initialState;
