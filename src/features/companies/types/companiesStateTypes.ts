import { Company, CompanyDetails } from './companiesTypes';
import { AsyncState, OperationState } from '@/shared/types/globalTypes';

export interface CompaniesState {
  lists: {
    all: AsyncState<Company[]>;
    joined: AsyncState<Company[]>;
    owned: AsyncState<Company[]>;
  };

  selected: AsyncState<CompanyDetails | null>;

  mutations: {
    create: OperationState;
    update: OperationState;
    delete: OperationState;
    changeStatus: OperationState;
    changeLogo: OperationState;
    removeMember: OperationState;
    leave: OperationState;
  };
}
