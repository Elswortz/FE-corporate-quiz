import { AsyncState, OperationState } from '@/types/globalTypes';
import { User } from './userTypes';

export interface UsersState {
  profile: AsyncState<User | null>;
  list: AsyncState<User[]>;
  selected: AsyncState<User | null>;
  mutations: {
    update: OperationState;
    remove: OperationState;
    updateAvatar: OperationState;
  };
}
