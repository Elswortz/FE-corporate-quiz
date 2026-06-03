import { api } from '@/api/apiClient';
import {
  AttemptQuizzDto,
  CreateQuizzDto,
  DeleteQuizzDto,
  GetCompanyQuizzesDto,
  UpdateQuizzDto,
  GetQuizzAnswersDto,
} from '../types/quizzesTypes';

export const createQuizz = ({ companyId, payload }: CreateQuizzDto) => api.post(`quizzes/${companyId}`, payload);

export const getCompanyQuizzes = ({ companyId, params }: GetCompanyQuizzesDto) =>
  api.get(`quizzes/${companyId}`, { params });

export const updateQuizz = ({ quizzId, companyId, payload }: UpdateQuizzDto) =>
  api.put(`quizzes/${quizzId}/${companyId}`, payload);

export const deleteQuizz = ({ quizzId, companyId }: DeleteQuizzDto) => api.delete(`quizzes/${quizzId}/${companyId}`);

export const attemptQuizz = ({ quizzId, companyId, payload }: AttemptQuizzDto) =>
  api.post(`quizzes/${quizzId}/${companyId}/attempts`, payload);

export const getQuizzAnswers = ({ quizzId, companyId }: GetQuizzAnswersDto) =>
  api.get(`quizzes/${quizzId}/${companyId}/attempts`);
