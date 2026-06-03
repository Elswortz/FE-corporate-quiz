import { QuizzesState } from '../types/quizzesStateTypes';
import { initialAsyncState, initialPaginatedAsyncState, initialOperationState } from '@/utils/initialStateHelpers';
import { Quizz } from '../types/quizzesTypes';

const quizzesState: QuizzesState = {
  list: initialPaginatedAsyncState<Quizz[]>([]),
  selected: initialAsyncState<any | null>(null),
  mutations: {
    create: initialOperationState,
    update: initialOperationState,
    delete: initialOperationState,
    attempt: initialOperationState,
    getAnswers: initialOperationState,
  },
};

export default quizzesState;
