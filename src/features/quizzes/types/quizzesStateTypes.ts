import { AsyncState, OperationState, PaginatedAsyncState } from '@/types/globalTypes';
import { Quizz } from './quizzesTypes';

export interface QuizzesState {
  list: PaginatedAsyncState<Quizz[]>;
  selected: AsyncState<any>;
  mutations: {
    create: OperationState;
    update: OperationState;
    delete: OperationState;
    attempt: OperationState;
    getAnswers: OperationState;
  };
}
