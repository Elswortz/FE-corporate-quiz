const initialState = {
  id: null,
  firstName: '',
  lastName: '',
  email: '',
  avatarURL: '',
};

export default initialState;

// export const getUserProfile = createAsyncThunk('auth/profile', async (_, thunkAPI) => {
//   try {
//     const response = await userAPI.getUserProfile();
//     return response.data;
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to load user');
//   }
// });

// .addCase(getUserProfile.pending, state => {
//   state.isLoading = true;
//   state.error = null;
// })
// .addCase(getUserProfile.fulfilled, (state, action) => {
//   state.user = action.payload;
//   state.isLoading = false;
// })
// .addCase(getUserProfile.rejected, state => {
//   state.isAuthenticated = false;
//   state.user = null;
//   state.isLoading = false;
// }),
