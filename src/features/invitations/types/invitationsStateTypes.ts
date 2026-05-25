import { AsyncState, OperationState } from '@/types/globalTypes';
import { Invitation } from './invitationsTypes';

export interface InvitationsState {
  lists: {
    userInvitations: AsyncState<Invitation[]>;
    companyInvitations: AsyncState<Invitation[]>;
  };
  actions: {
    user: {
      sendRequest: OperationState;
      cancelRequest: OperationState;
      acceptInvitation: OperationState;
      rejectInvitation: OperationState;
    };
    company: {
      sendInvitation: OperationState;
      cancelInvitation: OperationState;
      acceptRequest: OperationState;
      rejectRequest: OperationState;
    };
  };
}
