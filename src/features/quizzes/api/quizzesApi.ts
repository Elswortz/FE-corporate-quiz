import { api } from '@/api/apiClient';
import {
  AttemptQuizzDto,
  CreateQuizzDto,
  GetCompanyQuizzesDto,
  UpdateQuizzDto,
  QuizzParamsDto,
} from '../types/quizzesTypes';

export const createQuizz = ({ companyId, payload }: CreateQuizzDto) => api.post(`quizzes/${companyId}`, payload);

export const getCompanyQuizzes = ({ companyId, params }: GetCompanyQuizzesDto) =>
  api.get(`quizzes/${companyId}`, { params });

export const getQuizz = ({ companyId, quizzId }: QuizzParamsDto) => api.get(`quizzes/${companyId}/${quizzId}`);

export const getQuizzForAdmin = ({ companyId, quizzId }: QuizzParamsDto) =>
  api.get(`quizzes/admin/${companyId}/${quizzId}`);

export const updateQuizz = ({ companyId, quizzId, payload }: UpdateQuizzDto) =>
  api.put(`quizzes/admin/${companyId}/${quizzId}`, payload);

export const deleteQuizz = ({ companyId, quizzId }: QuizzParamsDto) =>
  api.delete(`quizzes/admin/${companyId}/${quizzId}`);

export const attemptQuizz = ({ companyId, quizzId, payload }: AttemptQuizzDto) =>
  api.post(`quizzes/${companyId}/${quizzId}/attempts`, payload);

export const getQuizzAnswers = ({ companyId, quizzId }: QuizzParamsDto) =>
  api.get(`quizzes/${companyId}/${quizzId}/attempts`);
