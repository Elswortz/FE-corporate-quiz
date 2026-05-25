import { AsyncState, OperationState } from '@/types/globalTypes';
import { InvitationsState } from '../types/invitationsStateTypes';
import { Invitation } from '../types/invitationsTypes';

const initialAsyncState = <T>(data: T): AsyncState<T> => ({
  data,
  isLoading: false,
  error: null,
});

const initialOperationState: OperationState = {
  isLoading: false,
  error: null,
};

const invitationsState: InvitationsState = {
  lists: {
    userInvitations: initialAsyncState<Invitation[]>([]),
    companyInvitations: initialAsyncState<Invitation[]>([]),
  },
  actions: {
    user: {
      sendRequest: initialOperationState,
      cancelRequest: initialOperationState,
      acceptInvitation: initialOperationState,
      rejectInvitation: initialOperationState,
    },
    company: {
      sendInvitation: initialOperationState,
      cancelInvitation: initialOperationState,
      acceptRequest: initialOperationState,
      rejectRequest: initialOperationState,
    },
  },
};

export default invitationsState;
