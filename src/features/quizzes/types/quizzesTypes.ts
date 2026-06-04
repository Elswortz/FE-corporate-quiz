import { CompanyId } from '@/features/companies/types/companiesTypes';
import { UserId } from '@/features/users/types/userTypes';
import { Pagination } from '@/types/globalTypes';

export type QuizzId = string;

export interface Quizz {
  id: QuizzId;
  company_id: CompanyId;
  title: string;
  description: string;
  counter: number;
}

export interface QuizzDetails extends Quizz {
  questions: Question[];
}

export type Question = {
  id: string;
  quiz_id: string;
  question_text: string;
  answers: Answer[];
};

export type QuestionForCreate = {
  question_text: string;
  answers: CorrectAnswer[];
};

export type AttemptQuestion = {
  question_id: string;
  selected_answer_id: string;
};

export type Answer = {
  id: string;
  answer_text: string;
};

export type CorrectAnswer = {
  answer_text: string;
  is_correct: boolean;
};

export type AnswersDetails = {
  question_id: string;
  question_text: string;
  selected_answer_id: string;
  selected_answer_text: string;
  is_correct: boolean;
};

export type QuizzResponse = {
  user_id: UserId;
  company_id: CompanyId;
  quizz_id: QuizzId;
  score: number;
  total_questions: number;
  correct_answers_count: number;
  answers_detail: AnswersDetails[];
};

// DTO

type CreateQuizzPayload = Pick<Quizz, 'title' | 'description'> & {
  questions: QuestionForCreate[];
};

export type CreateQuizzDto = {
  companyId: CompanyId;
  payload: CreateQuizzPayload;
};

export type GetCompanyQuizzesDto = {
  companyId: CompanyId;
  params: Pagination;
};

export type GetQuizzDto = DeleteQuizzDto;

export type UpdateQuizzDto = {
  companyId: CompanyId;
  quizzId: QuizzId;
  payload: CreateQuizzPayload;
};

export type DeleteQuizzDto = {
  companyId: CompanyId;
  quizzId: QuizzId;
};

export type AttemptQuizzDto = {
  companyId: CompanyId;
  quizzId: QuizzId;
  payload: { questions: AttemptQuestion[] };
};

export type GetQuizzAnswersDto = DeleteQuizzDto;
