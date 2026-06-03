import { RootState } from '@/store/store';

export const selectCompanyQuizzes = (state: RootState) => state.quizzes.list.data;
export const selectCompanyQuizzesLoading = (state: RootState) => state.quizzes.list.isLoading;
export const selectCompanyQuizzesError = (state: RootState) => state.quizzes.list.error;
export const selectCompanyQuizzesMeta = (state: RootState) => state.quizzes.list.meta;

export const selectCreateQuizzLoading = (state: RootState) => state.quizzes.mutations.create.isLoading;
export const selectCreateQuizzError = (state: RootState) => state.quizzes.mutations.create.error;

export const selectUpdateQuizzLoading = (state: RootState) => state.quizzes.mutations.update.isLoading;
export const selectUpdateQuizzError = (state: RootState) => state.quizzes.mutations.update.error;

export const selectDeleteQuizzLoading = (state: RootState) => state.quizzes.mutations.delete.isLoading;
export const selectDeleteQuizzError = (state: RootState) => state.quizzes.mutations.delete.error;
