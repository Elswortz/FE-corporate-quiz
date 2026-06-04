import * as quizzesApi from '../api/quizzesApi';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { PaginatedResponse } from '@/types/globalTypes';
import {
  CreateQuizzDto,
  DeleteQuizzDto,
  GetCompanyQuizzesDto,
  GetQuizzDto,
  Quizz,
  QuizzDetails,
  UpdateQuizzDto,
} from '../types/quizzesTypes';

type RejectValue = string;

export const createQuizz = createAsyncThunk<Quizz, CreateQuizzDto, { rejectValue: RejectValue }>(
  'quizzes/create',
  async ({ companyId, payload }, { rejectWithValue }) => {
    try {
      const res = await quizzesApi.createQuizz({ companyId, payload });
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to create company quizz');
    }
  }
);

export const getCompanyQuizzes = createAsyncThunk<
  PaginatedResponse<Quizz[]>,
  GetCompanyQuizzesDto,
  { rejectValue: RejectValue }
>('quizzes/fetchAll', async ({ companyId, params }, { rejectWithValue }) => {
  try {
    const res = await quizzesApi.getCompanyQuizzes({ companyId, params });
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || 'Failed to load company quizzes');
  }
});

export const getQuizz = createAsyncThunk<QuizzDetails, GetQuizzDto, { rejectValue: RejectValue }>(
  'quizzes/fetchById',
  async ({ companyId, quizzId }, { rejectWithValue }) => {
    try {
      const res = await quizzesApi.getQuizz({ companyId, quizzId });
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to load quizz');
    }
  }
);

export const updateQuizz = createAsyncThunk<Quizz, UpdateQuizzDto, { rejectValue: RejectValue }>(
  'quizzes/update',
  async ({ companyId, quizzId, payload }, { rejectWithValue }) => {
    try {
      const res = await quizzesApi.updateQuizz({ companyId, quizzId, payload });
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update company quizz');
    }
  }
);

export const deleteQuizz = createAsyncThunk<DeleteQuizzDto, DeleteQuizzDto, { rejectValue: RejectValue }>(
  'quizzes/delete',
  async ({ companyId, quizzId }, { rejectWithValue }) => {
    try {
      await quizzesApi.deleteQuizz({ companyId, quizzId });
      return { companyId, quizzId };
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update company quizz');
    }
  }
);
