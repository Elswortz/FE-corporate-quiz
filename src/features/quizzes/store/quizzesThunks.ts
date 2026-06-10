import * as quizzesApi from '../api/quizzesApi';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { PaginatedResponse } from '@/types/globalTypes';
import {
  AnswerForDetails,
  AttemptQuizzDto,
  AttemptQuizzResponse,
  CreateQuizzDto,
  GetCompanyQuizzesDto,
  QuizzParamsDto,
  Quizz,
  QuizzDetails,
  UpdateQuizzDto,
  Answer,
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

export const getQuizz = createAsyncThunk<QuizzDetails<Answer>, QuizzParamsDto, { rejectValue: RejectValue }>(
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

export const getQuizzForAdmin = createAsyncThunk<QuizzDetails<Answer>, QuizzParamsDto, { rejectValue: RejectValue }>(
  'quizzes/fetchByIdForAdmin',
  async ({ companyId, quizzId }, { rejectWithValue }) => {
    try {
      const res = await quizzesApi.getQuizzForAdmin({ companyId, quizzId });
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

export const deleteQuizz = createAsyncThunk<QuizzParamsDto, QuizzParamsDto, { rejectValue: RejectValue }>(
  'quizzes/delete',
  async ({ companyId, quizzId }, { rejectWithValue }) => {
    try {
      await quizzesApi.deleteQuizz({ companyId, quizzId });
      return { companyId, quizzId };
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete company quizz');
    }
  }
);

export const attemptQuizz = createAsyncThunk<AttemptQuizzResponse, AttemptQuizzDto, { rejectValue: RejectValue }>(
  'quizzes/attempt',
  async ({ companyId, quizzId, payload }, { rejectWithValue }) => {
    try {
      const res = await quizzesApi.attemptQuizz({ companyId, quizzId, payload });
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to attempt company quizz');
    }
  }
);

export const getQuizzAnswers = createAsyncThunk<AnswerForDetails[], QuizzParamsDto, { rejectValue: RejectValue }>(
  'quizzes/getAnswers',
  async ({ companyId, quizzId }, { rejectWithValue }) => {
    try {
      const res = await quizzesApi.getQuizzAnswers({ companyId, quizzId });
      return res.data.answers_detail;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to load answers');
    }
  }
);
