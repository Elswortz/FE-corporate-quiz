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
  selected: {
    data: null,
    isLoading: false,
    error: null,
    invitations: { data: [], isLoading: false, error: null },
  },
  operations: {
    create: { isLoading: false, error: null },
    update: { isLoading: false, error: null },
    delete: { isLoading: false, error: null },
    changeStatus: { isLoading: false, error: null },
    changeLogo: { isLoading: false, error: null },
    removeMember: { isLoading: false, error: null },
  },
  isGlobalLoading: false,
};

export default companiesState;
