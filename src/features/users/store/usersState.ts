import { AsyncState, OperationState } from '@/types/globalTypes';
import { UsersState } from '../types/usersStateTypes';
import { User } from '../types/userTypes';

const initialAsyncState = <T>(data: T): AsyncState<T> => ({
  data,
  isLoading: false,
  error: null,
});

const initialOperationState: OperationState = {
  isLoading: false,
  error: null,
};

const usersState: UsersState = {
  profile: initialAsyncState<User | null>(null),
  list: initialAsyncState<User[]>([]),
  selected: initialAsyncState<User | null>(null),
  mutations: {
    update: initialOperationState,
    remove: initialOperationState,
    updateAvatar: initialOperationState,
  },
};

export default usersState;
