import { createSlice } from '@reduxjs/toolkit';
import initialState from './initialState';

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    changeString: (state, action) => {
      state.test = action.payload;
    },
  },
});

export const testReducer = testSlice.reducer;
export const { changeString } = testSlice.actions;
