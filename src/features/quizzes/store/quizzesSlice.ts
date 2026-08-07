import { createSlice } from '@reduxjs/toolkit';
import quizzesState from './quizzesState';
import {
  attemptQuizz,
  createQuizz,
  deleteQuizz,
  getCompanyQuizzes,
  getQuizz,
  getQuizzAnswers,
  getQuizzForAdmin,
  updateQuizz,
} from './quizzesThunks';

const quizzesSlice = createSlice({
  name: 'quizzes',
  initialState: quizzesState,
  reducers: {
    clearCurrentQuizz: state => {
      state.selected.quiz.data = null;
      state.selected.quiz.error = null;
      state.selected.quiz.isLoading = false;
    },
  },
  extraReducers: builder =>
    builder
      // --- getCompanyQuizzes ---
      .addCase(getCompanyQuizzes.pending, state => {
        state.list.isLoading = true;
        state.list.error = null;
      })
      .addCase(getCompanyQuizzes.fulfilled, (state, { payload, meta }) => {
        const offset = meta.arg.params.offset;
        if (offset === 0) {
          state.list.data = payload.items;
        } else {
          state.list.data = [...state.list.data, ...payload.items];
        }
        state.list.meta = payload.meta;
        state.list.isLoading = false;
      })
      .addCase(getCompanyQuizzes.rejected, (state, { payload }) => {
        state.list.isLoading = false;
        state.list.error = payload ?? null;
      })
      // --- getQuizz ---
      .addCase(getQuizz.pending, state => {
        state.selected.quiz.isLoading = true;
        state.selected.quiz.error = null;
      })
      .addCase(getQuizz.fulfilled, (state, { payload }) => {
        state.selected.quiz.isLoading = false;
        state.selected.quiz.data = payload;
      })
      .addCase(getQuizz.rejected, (state, { payload }) => {
        state.selected.quiz.isLoading = false;
        state.selected.quiz.error = payload ?? null;
      })
      // --- getQuizzForAdmin ---
      .addCase(getQuizzForAdmin.pending, state => {
        state.selected.quiz.isLoading = true;
        state.selected.quiz.error = null;
      })
      .addCase(getQuizzForAdmin.fulfilled, (state, { payload }) => {
        state.selected.quiz.isLoading = false;
        state.selected.quiz.data = payload;
      })
      .addCase(getQuizzForAdmin.rejected, (state, { payload }) => {
        state.selected.quiz.isLoading = false;
        state.selected.quiz.error = payload ?? null;
      })
      // --- createQuizz ---
      .addCase(createQuizz.pending, state => {
        state.mutations.create.isLoading = true;
        state.mutations.create.error = null;
      })
      .addCase(createQuizz.fulfilled, (state, { payload }) => {
        state.list.data.unshift(payload);
        state.mutations.create.isLoading = false;
      })
      .addCase(createQuizz.rejected, (state, { payload }) => {
        state.mutations.create.isLoading = false;
        state.mutations.create.error = payload ?? null;
      })
      // --- updateQuizz ---
      .addCase(updateQuizz.pending, state => {
        state.mutations.update.isLoading = true;
        state.mutations.update.error = null;
      })
      .addCase(updateQuizz.fulfilled, (state, { payload }) => {
        state.list.data = state.list.data.map(quizz => (quizz.id === payload.id ? payload : quizz));
        state.mutations.update.isLoading = false;
      })
      .addCase(updateQuizz.rejected, (state, { payload }) => {
        state.mutations.update.isLoading = false;
        state.mutations.update.error = payload ?? null;
      })
      // --- deleteQuizz ---
      .addCase(deleteQuizz.pending, state => {
        state.mutations.delete.isLoading = true;
        state.mutations.delete.error = null;
      })
      .addCase(deleteQuizz.fulfilled, (state, { payload }) => {
        state.list.data = state.list.data.filter(quizz => quizz.id !== payload.quizzId);
        state.mutations.delete.isLoading = false;
      })
      .addCase(deleteQuizz.rejected, (state, { payload }) => {
        state.mutations.delete.isLoading = false;
        state.mutations.delete.error = payload ?? null;
      })
      // --- attemptQuizz ---
      .addCase(attemptQuizz.pending, state => {
        state.selected.results.isLoading = true;
        state.selected.results.error = null;
      })
      .addCase(attemptQuizz.fulfilled, (state, { payload }) => {
        state.selected.results.data = payload;
        state.selected.results.isLoading = false;
      })
      .addCase(attemptQuizz.rejected, (state, { payload }) => {
        state.selected.results.isLoading = false;
        state.selected.results.error = payload ?? null;
      })
      // --- getQuizzAnswers ---
      .addCase(getQuizzAnswers.pending, state => {
        state.selected.answers.isLoading = true;
        state.selected.answers.error = null;
      })
      .addCase(getQuizzAnswers.fulfilled, (state, { payload }) => {
        state.selected.answers.data = payload;
        state.selected.answers.isLoading = false;
      })
      .addCase(getQuizzAnswers.rejected, (state, { payload }) => {
        state.selected.answers.isLoading = false;
        state.selected.answers.error = payload ?? null;
      }),
});

export const { clearCurrentQuizz } = quizzesSlice.actions;
export const quizzesReducer = quizzesSlice.reducer;
