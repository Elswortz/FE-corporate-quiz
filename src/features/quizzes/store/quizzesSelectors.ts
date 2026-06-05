import { RootState } from '@/store/store';

export const selectCompanyQuizzes = (state: RootState) => state.quizzes.list.data;
export const selectCompanyQuizzesLoading = (state: RootState) => state.quizzes.list.isLoading;
export const selectCompanyQuizzesError = (state: RootState) => state.quizzes.list.error;
export const selectCompanyQuizzesMeta = (state: RootState) => state.quizzes.list.meta;

export const selectSelectedQuizz = (state: RootState) => state.quizzes.selected.quiz.data;
export const selectSelectedQuizzLoading = (state: RootState) => state.quizzes.selected.quiz.isLoading;
export const selectSelectedQuizzError = (state: RootState) => state.quizzes.selected.quiz.error;

export const selectQuizzResults = (state: RootState) => state.quizzes.selected.results.data;
export const selectQuizzResultsLoading = (state: RootState) => state.quizzes.selected.results.isLoading;
export const selectQuizzResultsError = (state: RootState) => state.quizzes.selected.results.error;

export const selectQuizzAnswers = (state: RootState) => state.quizzes.selected.answers.data;
export const selectQuizzAnswersLoading = (state: RootState) => state.quizzes.selected.answers.isLoading;
export const selectQuizzAnswersError = (state: RootState) => state.quizzes.selected.answers.error;

export const selectCreateQuizzLoading = (state: RootState) => state.quizzes.mutations.create.isLoading;
export const selectCreateQuizzError = (state: RootState) => state.quizzes.mutations.create.error;

export const selectUpdateQuizzLoading = (state: RootState) => state.quizzes.mutations.update.isLoading;
export const selectUpdateQuizzError = (state: RootState) => state.quizzes.mutations.update.error;

export const selectDeleteQuizzLoading = (state: RootState) => state.quizzes.mutations.delete.isLoading;
export const selectDeleteQuizzError = (state: RootState) => state.quizzes.mutations.delete.error;
