import { CompanyId } from '@/features/companies/types/companiesTypes';
import { UserId } from '@/features/users/types/userTypes';
import { Pagination } from '@/types/globalTypes';

export interface Quizz {
  id: QuizzId;
  company_id: CompanyId;
  title: string;
  description: string;
  counter: number;
  questions: Question[];
}

export type QuizzResponse = {
  user_id: UserId;
  company_id: CompanyId;
  quizz_id: QuizzId;
  score: number;
  total_questions: number;
  correct_answers_count: number;
  answers_detail: Answer[];
};

export type QuizzId = string;

export type Question = {
  question_text: string;
  answers: Answer[];
};
export type Answer = {
  answer_text: string;
  is_correct: boolean;
};

export type CreateQuizzDto = {
  companyId: CompanyId;
  payload: Pick<Quizz, 'title' | 'description' | 'questions'>;
};

export type GetCompanyQuizzesDto = {
  companyId: CompanyId;
  params: Pagination;
};
export type UpdateQuizzDto = {
  quizzId: QuizzId;
  companyId: CompanyId;
  payload: CreateQuizzDto;
};

export type DeleteQuizzDto = {
  quizzId: QuizzId;
  companyId: CompanyId;
};

export type AttemptQuizzDto = {
  quizzId: QuizzId;
  companyId: CompanyId;
  payload: Pick<Quizz, 'questions'>;
};

export type GetQuizzAnswersDto = DeleteQuizzDto;
