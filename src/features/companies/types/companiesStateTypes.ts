import { Company, CompanyDetails } from './companiesTypes';
import { AsyncState, PaginatedAsyncState, OperationState } from '@/types/globalTypes';

export interface CompaniesState {
  lists: {
    all: PaginatedAsyncState<Company[]>;
    joined: PaginatedAsyncState<Company[]>;
    owned: PaginatedAsyncState<Company[]>;
  };

  selected: AsyncState<CompanyDetails | null>;

  mutations: {
    create: OperationState;
    update: OperationState;
    delete: OperationState;
    changeStatus: OperationState;
    changeLogo: OperationState;
    changeRole: OperationState;
    removeMember: OperationState;
    leave: OperationState;
  };
}
