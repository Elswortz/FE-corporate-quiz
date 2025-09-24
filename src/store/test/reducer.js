import { combineReducers } from '@reduxjs/toolkit';
import { testReducer } from './testSlice';

export const reducer = combineReducers({
  test: testReducer,
});
