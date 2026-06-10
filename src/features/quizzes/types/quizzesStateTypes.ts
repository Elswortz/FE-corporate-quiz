import { AsyncState, OperationState, PaginatedAsyncState } from '@/types/globalTypes';
import { Answer, AnswerForDetails, AttemptQuizzResponse, Quizz, QuizzDetails } from './quizzesTypes';

export interface QuizzesState {
  list: PaginatedAsyncState<Quizz[]>;
  selected: {
    quiz: AsyncState<QuizzDetails<Answer> | null>;
    results: AsyncState<AttemptQuizzResponse | null>;
    answers: AsyncState<AnswerForDetails[] | null>;
  };
  mutations: {
    create: OperationState;
    update: OperationState;
    delete: OperationState;
  };
}
