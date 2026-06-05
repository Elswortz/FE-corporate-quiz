import { AsyncState, OperationState, PaginatedAsyncState } from '@/types/globalTypes';
import { AnswersDetails, AttemptResponse, Quizz, QuizzDetails } from './quizzesTypes';

export interface QuizzesState {
  list: PaginatedAsyncState<Quizz[]>;
  selected: {
    quiz: AsyncState<QuizzDetails | null>;
    results: AsyncState<AttemptResponse | null>;
    answers: AsyncState<AnswersDetails[] | null>;
  };
  mutations: {
    create: OperationState;
    update: OperationState;
    delete: OperationState;
  };
}
