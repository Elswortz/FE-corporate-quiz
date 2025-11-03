const authState = {
  user: {
    data: null,
    isLoading: false,
    error: null,
    operations: {
      updateUser: { isLoading: false, error: null },
      removeUser: { isLoading: false, error: null },
      updateUserAvatar: { isLoading: false, error: null },
    },
  },
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export default authState;
