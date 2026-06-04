import { api } from '@/api/apiClient';
import {
  AttemptQuizzDto,
  CreateQuizzDto,
  DeleteQuizzDto,
  GetCompanyQuizzesDto,
  UpdateQuizzDto,
  GetQuizzAnswersDto,
  GetQuizzDto,
} from '../types/quizzesTypes';

export const createQuizz = ({ companyId, payload }: CreateQuizzDto) => api.post(`quizzes/${companyId}`, payload);

export const getCompanyQuizzes = ({ companyId, params }: GetCompanyQuizzesDto) =>
  api.get(`quizzes/${companyId}`, { params });

export const getQuizz = ({ companyId, quizzId }: GetQuizzDto) => api.get(`quizzes/${companyId}/${quizzId}`);

export const updateQuizz = ({ companyId, quizzId, payload }: UpdateQuizzDto) =>
  api.put(`quizzes/${companyId}/${quizzId}`, payload);

export const deleteQuizz = ({ companyId, quizzId }: DeleteQuizzDto) => api.delete(`quizzes/${quizzId}/${companyId}`);

export const attemptQuizz = ({ companyId, quizzId, payload }: AttemptQuizzDto) =>
  api.post(`quizzes/${companyId}/${quizzId}/attempts`, payload);

export const getQuizzAnswers = ({ companyId, quizzId }: GetQuizzAnswersDto) =>
  api.get(`quizzes/${companyId}/${quizzId}/attempts`);
