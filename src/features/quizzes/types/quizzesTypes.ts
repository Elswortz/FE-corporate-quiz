import { CompanyId } from '@/features/companies/types/companiesTypes';
import { UserId } from '@/features/users/types/userTypes';
import { Pagination } from '@/types/globalTypes';

export type QuizzId = string;

// GET QUIZZES

export interface Quizz {
  id: QuizzId;
  company_id: CompanyId;
  title: string;
  description: string;
  counter: number;
}

export interface QuizzDetails<TAnswer = Answer> extends Quizz {
  questions: Question<TAnswer>[];
}

export type Question<TAnswer = Answer> = {
  id: string;
  quiz_id: string;
  question_text: string;
  answers: TAnswer[];
};

// export type AnswerForUser = {
//   id: string;
//   answer_text: string;
// };

// export type AnswerForAdmin = {
//   id: string;
//   answer_text: string;
//   is_correct: boolean;
// };

export type Answer = {
  id: string;
  answer_text: string;
  is_correct?: boolean;
};

// CREATE, UPDATE

export type AnswerForForm = Omit<Answer, 'id'>;

export type QuestionForForm = {
  question_text: string;
  answers: AnswerForForm[];
};

export type QuizzPayload = Pick<Quizz, 'title' | 'description'> & {
  questions: QuestionForForm[];
};

export type CreateQuizzPayload = QuizzPayload;
export type UpdateQuizzPayload = QuizzPayload;

// ATTEMPT

export type QuestionForAttempt = {
  question_id: string;
  selected_answer_id: string;
};

export type AttemptQuizzPayload = {
  questions: QuestionForAttempt[];
};

export type AttemptQuizzResponse = {
  score: number;
  total_questions: number;
  correct_answers_count: number;
  quiz_id: QuizzId;
  user_id: UserId;
  company_id: CompanyId;
  last_attempt_time: Date;
};

// GET ANSWERS

export type AnswerForDetails = {
  question_id: string;
  question_text: string;
  selected_answer_id: string;
  selected_answer_text: string;
  is_correct: boolean;
};

export type GetQuizzAnswersResponse = Omit<AttemptQuizzResponse, 'last_attempt_time'> & {
  answers_detail: AnswerForDetails[];
};

// DTO

export type QuizzParamsDto = {
  companyId: CompanyId;
  quizzId: QuizzId;
};

export type GetCompanyQuizzesDto = {
  companyId: CompanyId;
  params: Pagination;
};

export type CreateQuizzDto = {
  companyId: CompanyId;
  payload: CreateQuizzPayload;
};

export type UpdateQuizzDto = {
  companyId: CompanyId;
  quizzId: QuizzId;
  payload: UpdateQuizzPayload;
};

export type AttemptQuizzDto = {
  companyId: CompanyId;
  quizzId: QuizzId;
  payload: AttemptQuizzPayload;
};
