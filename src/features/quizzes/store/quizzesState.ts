import { QuizzesState } from '../types/quizzesStateTypes';
import { initialAsyncState, initialPaginatedAsyncState, initialOperationState } from '@/utils/initialStateHelpers';
import { AnswersDetails, AttemptResponse, Quizz, QuizzDetails } from '../types/quizzesTypes';

const quizzesState: QuizzesState = {
  list: initialPaginatedAsyncState<Quizz[]>([]),
  selected: {
    quiz: initialAsyncState<QuizzDetails | null>(null),
    results: initialAsyncState<AttemptResponse | null>(null),
    answers: initialAsyncState<AnswersDetails[]>([]),
  },
  mutations: {
    create: initialOperationState,
    update: initialOperationState,
    delete: initialOperationState,
  },
};

export default quizzesState;
