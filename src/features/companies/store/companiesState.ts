import { Company } from '../types/companiesTypes';
import { Invitation } from '../types/invitationsTypes';

type AsyncState<T> = {
  data: T;
  isLoading: boolean;
  error: string | null;
};

type OperationState = {
  isLoading: boolean;
  error: string | null;
};

export interface CompaniesState {
  owned: AsyncState<Company[]>;
  joined: AsyncState<Company[]>;
  all: AsyncState<Company[]>;

  selected: {
    data: Company | null;
    isLoading: boolean;
    error: string | null;
  };

  invitations: {
    data: Invitation[];
    isLoading: boolean;
    error: string | null;

    actions: {
      invite: OperationState;
      accept: OperationState;
      reject: OperationState;
      cancel: OperationState;
    };
  };

  operations: {
    create: OperationState;
    update: OperationState;
    delete: OperationState;
    changeStatus: OperationState;
    changeLogo: OperationState;
    removeMember: OperationState;
    leave: OperationState;
  };
}

const companiesState: CompaniesState = {
  all: {
    data: [],
    isLoading: false,
    error: null,
  },
  owned: {
    data: [],
    isLoading: false,
    error: null,
  },
  joined: {
    data: [],
    isLoading: false,
    error: null,
  },
  selected: {
    data: null,
    isLoading: false,
    error: null,
  },
  invitations: {
    data: [],
    isLoading: false,
    error: null,
    actions: {
      invite: { isLoading: false, error: null },
      accept: { isLoading: false, error: null },
      reject: { isLoading: false, error: null },
      cancel: { isLoading: false, error: null },
    },
  },
  operations: {
    create: { isLoading: false, error: null },
    update: { isLoading: false, error: null },
    delete: { isLoading: false, error: null },
    changeStatus: { isLoading: false, error: null },
    changeLogo: { isLoading: false, error: null },
    removeMember: { isLoading: false, error: null },
    leave: { isLoading: false, error: null },
  },
};

export default companiesState;
