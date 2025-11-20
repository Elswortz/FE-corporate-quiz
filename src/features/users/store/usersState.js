const usersState = {
  profile: {
    data: null,
    isLoading: false,
    error: null,
    invitations: {
      data: [],
      isLoading: false,
      error: null,
      operations: {
        accept: { isLoading: false, error: null },
        reject: { isLoading: false, error: null },
        cancel: { isLoading: false, error: null },
      },
    },
    operations: {
      update: { isLoading: false, error: null },
      remove: { isLoading: false, error: null },
      updateAvatar: { isLoading: false, error: null },
    },
  },
  all: {
    data: [],
    isLoading: false,
    error: null,
    meta: { total: 0, limit: 10, offset: 0, has_next: false, has_previous: false },
  },
  selected: { data: null, isLoading: false, error: null },
};

export default usersState;
