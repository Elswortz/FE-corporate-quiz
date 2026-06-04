import { AsyncState, OperationState, PaginatedAsyncState } from '@/types/globalTypes';
import { Quizz, QuizzDetails } from './quizzesTypes';

export interface QuizzesState {
  list: PaginatedAsyncState<Quizz[]>;
  selected: AsyncState<QuizzDetails | null>;
  mutations: {
    create: OperationState;
    update: OperationState;
    delete: OperationState;
    attempt: OperationState;
    getAnswers: OperationState;
  };
}
