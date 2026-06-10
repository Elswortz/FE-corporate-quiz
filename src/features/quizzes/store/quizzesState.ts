import { QuizzesState } from '../types/quizzesStateTypes';
import { initialAsyncState, initialPaginatedAsyncState, initialOperationState } from '@/utils/initialStateHelpers';
import { Answer, AnswerForDetails, AttemptQuizzResponse, Quizz, QuizzDetails } from '../types/quizzesTypes';

const quizzesState: QuizzesState = {
  list: initialPaginatedAsyncState<Quizz[]>([]),
  selected: {
    quiz: initialAsyncState<QuizzDetails<Answer> | null>(null),
    results: initialAsyncState<AttemptQuizzResponse | null>(null),
    answers: initialAsyncState<AnswerForDetails[]>([]),
  },
  mutations: {
    create: initialOperationState,
    update: initialOperationState,
    delete: initialOperationState,
  },
};

export default quizzesState;
