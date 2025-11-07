import { removeCompanyMember } from './companiesThunks';

const companiesState = {
  all: {
    data: [],
    meta: { total: 0, limit: 10, offset: 0, has_next: false, has_previous: false },
    isLoading: false,
    error: null,
  },
  owned: {
    data: [],
    meta: { total: 0, limit: 10, offset: 0, has_next: false, has_previous: false },
    isLoading: false,
    error: null,
  },
  joined: {
    data: [],
    meta: { total: 0, limit: 10, offset: 0, has_next: false, has_previous: false },
    isLoading: false,
    error: null,
  },
  selected: { data: null, isLoading: false, error: null },
  operations: {
    createCompany: { isLoading: false, error: null },
    updateCompany: { isLoading: false, error: null },
    deleteCompany: { isLoading: false, error: null },
    changeCompanyStatus: { isLoading: false, error: null },
    changeCompanyLogo: { isLoading: false, error: null },
    removeCompanyMember: { isLoading: false, error: null },
  },
};

export default companiesState;
