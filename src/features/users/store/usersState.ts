import { UsersState } from '../types/usersStateTypes';
import { User } from '../types/userTypes';
import { initialAsyncState, initialOperationState, initialPaginatedAsyncState } from '@/utils/initialStateHelpers';

const usersState: UsersState = {
  profile: initialAsyncState<User | null>(null),
  list: initialPaginatedAsyncState<User[]>([]),
  selected: initialAsyncState<User | null>(null),
  mutations: {
    update: initialOperationState,
    remove: initialOperationState,
    updateAvatar: initialOperationState,
  },
};

export default usersState;
